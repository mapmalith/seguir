var _ = require('lodash');
var async = require('async');

/**
 * This is a collection of methods that allow you to create, update and delete social items.
 *
 * These methods all exclude the 'loggedinuser' parameter as they are all carried out only by
 * the currently logged in user and / or system level calls (e.g. adding a user via integration
 * with an SSO flow).
 *
 * TODO: Exception may be creating a post on someone elses feed.
 *
 */
module.exports = function (api) {
  var client = api.client;
  var q = client.queries;

  function addFollower (keyspace, user, user_follower, timestamp, visibility, backfill, next) {
    if (!next) {
      next = backfill;
      backfill = null;
    }
    if (user.toString() === user_follower.toString()) {
      return next({statusCode: 500, message: 'You are not allowed to follow yourself.'});
    }

    var mapFollowResponse = function (follower) {
      api.user.mapUserIdToUser(keyspace, follower, ['user', 'user_follower'], user, function (err, follow) {
        if (err) return next(err);
        return next(null, follow);
      });
    };

    var backfillFeed = function (follow) {
      api.feed.seedFeed(keyspace, user_follower, user, backfill, follow, function (err) {
        if (err) return next(err);
        mapFollowResponse(follow);
      });
    };

    var addBidirectionalFeedItem = function (follow, cb) {
      api.feed.addFeedItem(keyspace, user, follow, 'follow', function (err, result) {
        if (err) { return next(err); }
        api.feed.addFeedItem(keyspace, user_follower, follow, 'follow', function (err, result) {
          if (err) { return next(err); }
          cb(null, result);
        });
      });
    };

    isFollower(keyspace, user, user_follower, function (err, isFollower, followerSince, follow) {
      if (err) { return next(err); }
      if (isFollower) {
        return mapFollowResponse(follow);
      }

      var newFollowId = client.generateId();
      var followerData = [newFollowId, user, user_follower, timestamp, visibility];
      var isPublic = api.visibility.isPublic(visibility);
      var isPersonal = api.visibility.isPersonal(visibility);
      var isPrivate = api.visibility.isPrivate(visibility);
      var followerTimelineData = [newFollowId, user, user_follower, client.generateTimeId(timestamp), timestamp, isPrivate, isPersonal, isPublic];
      var newFollow = _.zipObject(['follow', 'user', 'user_follower', 'since', 'visibility'], followerData);

      client.batch
        .addQuery(q(keyspace, 'upsertFollower'), followerData)
        .addQuery(q(keyspace, 'upsertFollowerTimeline'), followerTimelineData)
        .execute(function (err) {
          /* istanbul ignore if */
          if (err) { return next(err); }
          alterFollowerCount(keyspace, user, 1, function () {
            addBidirectionalFeedItem(newFollow, function (err, result) {
              if (err) { return next(err); }
              client.deleteCacheItem('follow:' + user + ':' + user_follower, function () {
                backfill ? backfillFeed(newFollow) : mapFollowResponse(newFollow);
              });
            });
          });
        });
    });
  }

  function alterFollowerCount (keyspace, user, count, next) {
    next = next || function () {};
    var data = [count, user.toString()];
    client.execute(q(keyspace, 'updateCounter', {TYPE: 'followers'}), data, {cacheKey: 'count:followers:' + user.toString()}, next);
  }

  function followerCount (keyspace, user, next) {
    next = next || function () { };
    var data = [user.toString()];
    var cacheKey = 'count:followers:' + user.toString();
    client.get(q(keyspace, 'selectCount', {
      TYPE: 'followers',
      ITEM: 'user'
    }), data, {cacheKey: cacheKey}, function (err, count) {
      if (err) { return next(err); }
      if (!count) {
        // Manually set the cache as the default won't set a null
        client.setCacheItem(cacheKey, {_: 0}, function () {
          return next(null, 0);
        });
      } else {
        return next(null, count);
      }
    });
  }

  function removeFollower (keyspace, user, user_follower, next) {
    getFollowerTimeline(keyspace, user, user_follower, function (err, followerTimeline) {
      if (err) { return next(err); }
      if (!followerTimeline) { return next({statusCode: 404, message: 'Cant unfollow a user you dont follow'}); }
      var deleteData = [user, user_follower];
      var deleteFollowerTimedata = [user, followerTimeline.time];

      client.batch
        .addQuery(q(keyspace, 'removeFollower'), deleteData, 'follow:' + followerTimeline.follow)
        .addQuery(q(keyspace, 'removeFollowerTimeline'), deleteFollowerTimedata, 'follower_timeline:' + user + ':' + user_follower)
        .execute(function (err) {
          if (err) return next(err);
          alterFollowerCount(keyspace, user, -1, function () {
            api.feed.removeFeedsForItem(keyspace, followerTimeline.follow, function (err) {
              if (err) return next(err);
              client.deleteCacheItem('follow:' + user + ':' + user_follower, function () {
                next(null, {status: 'removed'});
              });
            });
          });
        });
    });
  }

  function getFollowerTimeline (keyspace, user, user_follower, next) {
    if (!user || !user_follower) { return next(null, null); }
    var cacheKey = 'follower_timeline:' + user + ':' + user_follower;
    client.get(q(keyspace, 'selectFollowFromTimeline'), [user, user_follower], {cacheKey: cacheKey}, function (err, followerTimeline) {
      if (err) { return next(err); }
      if (!followerTimeline) {
        // Manually set the cache as the default won't set a null
        client.setCacheItem(cacheKey, {_: 0}, function () {
          return next();
        });
      } else {
        next(null, followerTimeline);
      }
    });
  }

  function isFollower (keyspace, user, user_follower, next) {
    if (!user || !user_follower) { return next(null, false, null, null); }
    if (user.toString() === user_follower.toString()) {
      return next(null, false, null, {});
    }
    var cacheKey = 'follow:' + user + ':' + user_follower;
    client.get(q(keyspace, 'isFollower'), [user, user_follower], {cacheKey: cacheKey}, function (err, follow) {
      if (err) { return next(null, false, null, {}); }
      if (!follow) {
        // Manually set the cache as the default won't set a null
        client.setCacheItem(cacheKey, {_: 0}, function () {
          return next(null, false, null, {});
        });
      } else {
        var isFollower = !!(follow && follow.follow);
        var isFollowerSince = isFollower ? follow.since : null;
        return next(null, isFollower, isFollowerSince, follow || null);
      }
    });
  }

  function getFollowFromObject (keyspace, liu, item, next) {
    var followObject = api.common.expandEmbeddedObject(item, 'follow', 'follow');
    api.friend.userCanSeeItem(keyspace, liu, followObject, ['user', 'user_follower'], function (err) {
      if (err) { return next(err); }
      api.user.mapUserIdToUser(keyspace, item, ['user', 'user_follower'], liu, true, function (err, objectWithUsers) {
        if (err) { return next(err); }
        followObject.user = objectWithUsers.user;
        followObject.user_follower = objectWithUsers.user_follower;
        next(null, followObject);
      });
    });
  }

  function getFollow (keyspace, liu, follow, expandUser, next) {
    if (!next) {
      next = expandUser;
      expandUser = true;
    }
    client.get(q(keyspace, 'selectFollow'), [follow], {cacheKey: 'follow:' + follow}, function (err, follower) {
      /* istanbul ignore if */
      if (err) { return next(err); }
      if (!follower) { return next({statusCode: 404, message: 'Follow not found'}); }
      api.friend.userCanSeeItem(keyspace, liu, follower, ['user', 'user_follower'], function (err) {
        if (err) { return next(err); }
        api.user.mapUserIdToUser(keyspace, follower, ['user', 'user_follower'], liu, expandUser, next);
      });
    });
  }

  /**
   * @callback getFollowersCallback
   * @param {Error} err
   * @param followers list of followers
   * @param pageState pageState for the next page. Should be returned unmodified to fetch the next page.
   */

  /**
   * Get the followers of a user sorted DESC by time.  Uses the relationship between the liu and user
   * to determine what to return.
   * user === liu - return all followers.
   * user is friend of liu - return all public and personal followers.
   * otherwise only return public follows.
   * @param {String} keyspace The keyspace to select from
   * @param {uuid} liu Logged in user.  Can be null to indicate a non-logged in user.
   * @param {uuid} user User to find followers of
   * @param {{ [pageState]: String, [pageSize]: String }} [options]
   *    pageState The next page to be rendered. This will be passed into next(err, followers, pageState). To get the next page you should pass in the pageState unmodified.
   *    pageSize Number of results to return
   * @param {getFollowersCallback} next
   */
  // TODO: erk.  This method needs more async love (or promises)
  function getFollowers (keyspace, liu, user, options, next) {
    if (!next) {
      next = options;
      options = {};
    }

    var pageState = options.pageState;
    var pageSize = options.pageSize || 50;

    var isUser = liu && user && liu.toString() === user.toString();
    api.friend.isFriend(keyspace, liu, user, function (err, isFriend) {
      if (err) { return next(err); }

      var privacyQuery = api.visibility.mapToQuery(isUser, isFriend);
      // note this is only needed for postgres - remove when(if) postgres goes
      var visibility = api.visibility.mapToParameters(isUser, isFriend);
      var selectOptions = {pageState: pageState, pageSize: pageSize};
      client.execute(q(keyspace, 'selectFollowersTimeline', _.merge({PRIVACY: privacyQuery}, visibility)), [user], selectOptions, function (err, followers, nextPageState) {
        if (err) { return next(err); }

        // For each follower, check if the liu is following them if we are logged in
        if (liu) {
          async.map(followers, function (follow, cb) {
            followerCount(keyspace, follow.user_follower, function (err, followerCount) {
              if (err) { return cb(err); }

              follow.followerCount = followerCount && followerCount.count ? +followerCount.count.toString() : 0;
              if (follow.user_follower.toString() === liu.toString()) {
                follow.liuIsFollowing = true;
                follow.liuIsUser = true;
                return cb(null, follow);
              }

              isFollower(keyspace, follow.user_follower, liu, function (err, isFollower) {
                if (err) { return cb(err); }
                follow.liuIsFollowing = isFollower;
                follow.liuIsUser = false;
                cb(null, follow);
              });
            });
          }, function (err) {
            if (err) { return next(err); }
            api.user.mapUserIdToUser(keyspace, followers, ['user_follower'], user, function (err, mappedFollowers) {
              if (err) { return next(err); }
              next(null, mappedFollowers, nextPageState);
            });
          });
        } else {
          async.map(followers, function (follow, cb) {
            followerCount(keyspace, follow.user_follower, function (err, followerCount) {
              if (err) { return cb(err); }
              follow.followerCount = followerCount && followerCount.count ? +followerCount.count.toString() : 0;
              cb(null, follow);
            });
          }, function (err) {
            if (err) { return next(err); }
            api.user.mapUserIdToUser(keyspace, followers, ['user_follower'], user, function (err, mappedFollowers) {
              if (err) { return next(err); }
              next(null, mappedFollowers, nextPageState);
            });
          });
        }
      });
    });
  }

  return {
    addFollower: addFollower,
    removeFollower: removeFollower,
    getFollowers: getFollowers,
    getFollow: getFollow,
    getFollowFromObject: getFollowFromObject,
    isFollower: isFollower,
    followerCount: followerCount
  };
};
