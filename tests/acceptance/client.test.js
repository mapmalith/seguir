/**
 * Acceptance test the Cassandra API directly.
 */
'use strict';
var keyspace = 'test_client_seguir';
var client = require('../../db/client')();
var cassandra = require('cassandra-driver');
var expect = require('expect.js');
var Seguir = require('../../client');
var setup = require('../../setup');
var async = require('async');
var _ = require('lodash');
var api = require('../../index')(client, keyspace);
var auth = api.auth;
var startServer = require('../../server');
var credentials = {host: 'http://localhost:3001', appName:'sample-application', appToken: cassandra.types.uuid()};

describe('Seguir Social Client API', function() {

    this.timeout(10000);

    var users = [], liu, postId, privatePostId, followId, notFriendFollowId, likeId, friendId, seguirServer, client;

    before(function(done) {
      this.timeout(20000);
      setup(keyspace, function() {
        auth.addApplication(credentials.appName, credentials.appToken, function(err, result) {
          startServer(null, keyspace, function(err, server) {
              seguirServer = server;
              server.listen(3001, function() {
                client = new Seguir(credentials);
                done();
              });
          });
        })
      });
    });

    after(function() {
      seguirServer.close();
    })

    describe('Users', function () {

      it('can create users', function(done) {
        async.map(['cliftonc','phteven','ted'], function(user, cb) {
          client.addUser(null, user, cb);
        }, function(err, results) {
          users = results;
          liu = users[1].user; // phteven is logged in
          done()
        });
      });

      it('can retrieve a user by id', function(done) {
        client.getUserById(null, users[0].user, function(err, user) {
          expect(user.user).to.be(users[0].user);
          expect(user.username).to.be('cliftonc');
          done();
        });
      });

      it('can retrieve a user by name', function(done) {
        client.getUser(null, 'cliftonc', function(err, user) {
          expect(err).to.be(null);
          expect(user.user).to.be(users[0].user);
          expect(user.username).to.be(users[0].username);
          done();
        });
      });

    });

    describe('friends', function () {

      it('can friend a user', function(done) {
        client.addFriend(users[0].user, users[1].user, Date.now(), function(err, friend) {
          expect(friend.user).to.be(users[0].user);
          expect(friend.user_friend).to.be(users[1].user);
          friendId = friend.friend;
          done();
        });
      });

    //   it('can retrieve a friend by id', function(done) {
    //     query.getFriend(liu, friendId, function(err, friend) {
    //       expect(friend.user).to.be(users[0].user);
    //       expect(friend.user_friend).to.be(users[1].user);
    //       done();
    //     });
    //   });

    //   it('can retrieve a list of friends for a user', function(done) {
    //     query.getFriends(liu, users[0].user, function(err, friends) {
    //       expect(friends[0].user_friend).to.be(users[1].user);
    //       done();
    //     });
    //   });

     });

    // describe('follows', function () {

    //   it('can follow a user who is a friend', function(done) {
    //     manage.addFollower(users[0].user, users[1].user, Date.now(), function(err, follow) {
    //       expect(follow.user).to.be(users[0].user);
    //       expect(follow.user_follower).to.be(users[1].user);
    //       followId = follow.follow;
    //       done();
    //     });
    //   });

    //   it('can follow a user who is not a friend', function(done) {
    //     manage.addFollower(users[0].user, users[2].user, Date.now(), function(err, follow) {
    //       expect(follow.user).to.be(users[0].user);
    //       expect(follow.user_follower).to.be(users[2].user);
    //       notFriendFollowId = follow.follow;
    //       done();
    //     });
    //   });

    //   it('can retrieve a follow by id', function(done) {
    //     query.getFollow(followId, function(err, follow) {
    //       expect(follow.user).to.be(users[0].user);
    //       expect(follow.user_follower).to.be(users[1].user);
    //       done();
    //     });
    //   });

    //    it('can retrieve a list of followers for a user', function(done) {
    //     query.getFollowers(users[0].user, function(err, followers) {
    //       var followerIds = _.pluck(followers, 'user_follower');
    //       expect(followerIds).to.contain(users[1].user);
    //       expect(followerIds).to.contain(users[2].user);
    //       done();
    //     });
    //   });

    // });

    // describe('posts', function () {

    //   it('can post a message from a user', function(done) {
    //     manage.addPost(users[0].user, 'Hello, this is a post', Date.now(), false, function(err, post) {
    //       expect(post.content).to.be('Hello, this is a post');
    //       expect(post.user).to.be(users[0].user);
    //       postId = post.post;
    //       done();
    //     });
    //   });

    //   it('can post a private message from a user', function(done) {
    //     manage.addPost(users[0].user, 'Hello, this is a private post', Date.now(), true, function(err, post) {
    //       expect(post.content).to.be('Hello, this is a private post');
    //       expect(post.user).to.be(users[0].user);
    //       privatePostId = post.post;
    //       done();
    //     });
    //   });

    //   it('anyone can retrieve a public post by id', function(done) {
    //     query.getPost(users[2].user, postId, function(err, post) {
    //       expect(post.content).to.be('Hello, this is a post');
    //       expect(post.user).to.be(users[0].user);
    //       done();
    //     });
    //   });

    //   it('anyone not a friend cant retrieve a private post by id', function(done) {
    //     query.getPost(users[2].user, privatePostId, function(err, post) {
    //       expect(err.statusCode).to.be(403);
    //       done();
    //     });
    //   });

    //   it('anyone who is a friend can retrieve a private post by id', function(done) {
    //     query.getPost(users[1].user, privatePostId, function(err, post) {
    //       expect(post.content).to.be('Hello, this is a private post');
    //       expect(post.user).to.be(users[0].user);
    //       done();
    //     });
    //   });


    // });

    // describe('likes', function () {

    //   it('can like an item from a user', function(done) {
    //     manage.addLike(users[0].user, 'http://github.com', Date.now(), function(err, like) {
    //       expect(like.item).to.be('http://github.com');
    //       likeId = like.like;
    //       done();
    //     });
    //   });

    //   it('can retrieve a like by id', function(done) {
    //     query.getLike(likeId, function(err, like) {
    //       expect(like.item).to.be('http://github.com');
    //       expect(like.user).to.be(users[0].user);
    //       done();
    //     });
    //   });

    //   it('can check if a user likes an item', function(done) {
    //     query.checkLike('cliftonc','http://github.com', function(err, like) {
    //       expect(like.like).to.be(likeId);
    //       expect(like.user).to.be(users[0].user);
    //       done();
    //     });
    //   });

    // });

    // describe('feeds', function () {

    //   it('logged in - can get a feed for yourself that is in the correct order', function(done) {
    //     query.getFeedForUser(users[0].user, 'cliftonc', null, 100, function(err, feed) {
    //       expect(err).to.be(undefined);
    //       expect(feed[0].like).to.be(likeId);
    //       expect(feed[1].post).to.be(privatePostId);
    //       expect(feed[2].post).to.be(postId);
    //       expect(feed[3].follow).to.be(notFriendFollowId);
    //       expect(feed[4].follow).to.be(followId);
    //       expect(feed[5].friend).to.be(friendId);
    //       done();
    //     });
    //   });

    //   it('logged in - can get a feed for a friend that is in the correct order', function(done) {
    //     query.getFeedForUser(users[1].user, 'cliftonc', null, 100, function(err, feed) {
    //       expect(err).to.be(undefined);
    //       expect(feed[0].like).to.be(likeId);
    //       expect(feed[1].post).to.be(privatePostId); //
    //       expect(feed[2].post).to.be(postId);
    //       expect(feed[3].follow).to.be(notFriendFollowId);
    //       expect(feed[4].follow).to.be(followId);
    //       expect(feed[5].friend).to.be(friendId);
    //       done();
    //     });
    //   });

    //   it('logged in - can get a feed for a friend and follower that is in the correct order', function(done) {
    //     query.getFeedForUser(users[0].user, 'phteven', null, 100, function(err, feed) {
    //       expect(err).to.be(undefined);
    //       expect(feed[0].like).to.be(likeId);
    //       expect(feed[1].post).to.be(privatePostId);
    //       expect(feed[2].post).to.be(postId);
    //       expect(feed[3].follow).to.be(notFriendFollowId);
    //       expect(feed[4].follow).to.be(followId);
    //       done();
    //     });
    //   });

    //   it('logged in - can get a feed for a follower that is not a friend in the correct order', function(done) {
    //     query.getFeedForUser(users[0].user, 'ted', null, 100, function(err, feed) {
    //       expect(err).to.be(undefined);
    //       expect(feed[0].like).to.be(likeId);
    //       expect(feed[1].post).to.be(postId);
    //       expect(feed[2].follow).to.be(notFriendFollowId);
    //       done();
    //     });
    //   });

    //   it('anonymous - can get a feed that is in correct order', function(done) {
    //     query.getFeedForUser('anonymous', 'cliftonc', null, 100, function(err, feed) {
    //       expect(err).to.be(undefined);
    //       expect(feed[0].like).to.be(likeId);
    //       expect(feed[1].post).to.be(postId);
    //       expect(feed[2].follow).to.be(notFriendFollowId);
    //       done();
    //     });
    //   });

    // });

});
