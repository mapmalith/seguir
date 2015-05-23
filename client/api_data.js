define({ "api": [  {    "type": "config",    "url": "Options",    "title": "Options",    "name": "ClientOptions",    "group": "Client",    "version": "1.0.0",    "description": "<p>Default configuration</p> ",    "success": {      "examples": [        {          "title": "HTTP/1.1 200 OK",          "content": "HTTP/1.1 200 OK\n{ appid: '12345',\n  appsecret: '12345',\n  host: 'http://seguir.server.com',\n   }",          "type": "json"        }      ]    },    "filename": "client/index.js",    "groupTitle": "Server Side Seguir Client",    "groupDescription": "<p>The Seguir client provides a simple and consistent API for interacting with a seguir server.</p> <p>This can only be used server side, as it uses the appId and appSecret which should never be shared within pure client side code.  This client allows you to provide the 'logged in user' which means that you can effectively create any relationship or item you like (even outside of) an actual true user session - e.g. by system events.</p> "  },  {    "type": "function",    "url": "getFeedForUser(liu,user,start,limit,next)",    "title": "getFeedForUser",    "name": "getFeedForUser",    "group": "Feeds",    "version": "1.0.0",    "description": "<p>Retrieve the aggregated newsfeed for a specific user.</p> ",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "liu",            "description": "<p>the id of the current logged in user</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "user",            "description": "<p>the user to retrieve the feed for</p> "          },          {            "group": "Parameter",            "type": "<p>Number</p> ",            "optional": false,            "field": "start",            "description": "<p>pagination - item to start at</p> "          },          {            "group": "Parameter",            "type": "<p>Number</p> ",            "optional": false,            "field": "limit",            "description": "<p>pagination - number of items to show</p> "          },          {            "group": "Parameter",            "type": "<p>Function</p> ",            "optional": false,            "field": "next",            "description": "<p>callback</p> "          }        ]      }    },    "filename": "client/index.js",    "groupTitle": "Feeds",    "groupDescription": "<p>This is a collection of methods that allow you to retrieve the newsfeed for a specific user.</p> "  },  {    "type": "function",    "url": "getUserFeedForUser(liu,user,start,limit,next)",    "title": "getUserFeedForUser",    "name": "getUserFeedForUser",    "group": "Feeds",    "version": "1.0.0",    "description": "<p>Retrieve the direct newsfeed for a specific user, can be shown on their profile.</p> ",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "liu",            "description": "<p>the id of the current logged in user</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "user",            "description": "<p>the user to retrieve the feed for</p> "          },          {            "group": "Parameter",            "type": "<p>Number</p> ",            "optional": false,            "field": "start",            "description": "<p>pagination - item to start at</p> "          },          {            "group": "Parameter",            "type": "<p>Number</p> ",            "optional": false,            "field": "limit",            "description": "<p>pagination - number of items to show</p> "          },          {            "group": "Parameter",            "type": "<p>Function</p> ",            "optional": false,            "field": "next",            "description": "<p>callback</p> "          }        ]      }    },    "filename": "client/index.js",    "groupTitle": "Feeds",    "groupDescription": "<p>This is a collection of methods that allow you to retrieve the newsfeed for a specific user.</p> "  },  {    "type": "function",    "url": "followUser(liu,user_to_follow,timestamp,isprivate,ispersonal,next)",    "title": "followUser",    "name": "followUser",    "group": "Following",    "version": "1.0.0",    "description": "<p>Follow a user</p> ",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "liu",            "description": "<p>the id of the current logged in user</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "user_to_follow",            "description": "<p>the id of the user to follow</p> "          },          {            "group": "Parameter",            "type": "<p>Timestamp</p> ",            "optional": false,            "field": "timestamp",            "description": "<p>time to leave the request</p> "          },          {            "group": "Parameter",            "type": "<p>Boolean</p> ",            "optional": false,            "field": "isprivate",            "description": "<p>is this visible only to friends</p> "          },          {            "group": "Parameter",            "type": "<p>Boolean</p> ",            "optional": false,            "field": "ispersonal",            "description": "<p>is this visible only to the user</p> "          },          {            "group": "Parameter",            "type": "<p>Function</p> ",            "optional": false,            "field": "next",            "description": "<p>callback</p> "          }        ]      }    },    "filename": "client/index.js",    "groupTitle": "Following",    "groupDescription": "<p>This is a collection of methods that allow you to manage follow relationships.</p> "  },  {    "type": "function",    "url": "getFollow(liu,follow,next)",    "title": "getFollow",    "name": "getFollow",    "group": "Following",    "version": "1.0.0",    "description": "<p>Retrieve details of a specific follow relationship</p> ",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "liu",            "description": "<p>the id of the current logged in user</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "follow",            "description": "<p>the id of the follow relationship</p> "          },          {            "group": "Parameter",            "type": "<p>Function</p> ",            "optional": false,            "field": "next",            "description": "<p>callback</p> "          }        ]      }    },    "filename": "client/index.js",    "groupTitle": "Following",    "groupDescription": "<p>This is a collection of methods that allow you to manage follow relationships.</p> "  },  {    "type": "function",    "url": "getFollowers(liu,user,next)",    "title": "getFollowers",    "name": "getFollowers",    "group": "Following",    "version": "1.0.0",    "description": "<p>Retrieve a list of followers for a user</p> ",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "liu",            "description": "<p>the id of the current logged in user</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "user",            "description": "<p>the id of user to retrieve followers for</p> "          },          {            "group": "Parameter",            "type": "<p>Function</p> ",            "optional": false,            "field": "next",            "description": "<p>callback</p> "          }        ]      }    },    "filename": "client/index.js",    "groupTitle": "Following",    "groupDescription": "<p>This is a collection of methods that allow you to manage follow relationships.</p> "  },  {    "type": "function",    "url": "removeFollower(liu,user_follower,next)",    "title": "removeFollower",    "name": "removeFollower",    "group": "Following",    "version": "1.0.0",    "description": "<p>Stop following a user</p> ",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "liu",            "description": "<p>the id of the current logged in user</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "user_follower",            "description": "<p>the id of user to remove as a follower</p> "          },          {            "group": "Parameter",            "type": "<p>Function</p> ",            "optional": false,            "field": "next",            "description": "<p>callback</p> "          }        ]      }    },    "filename": "client/index.js",    "groupTitle": "Following",    "groupDescription": "<p>This is a collection of methods that allow you to manage follow relationships.</p> "  },  {    "type": "function",    "url": "unFollowUser(liu,user_following,timestamp,next)",    "title": "unFollowUser",    "name": "unFollowUser",    "group": "Following",    "version": "1.0.0",    "description": "<p>Stop following a user</p> ",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "liu",            "description": "<p>the id of the current logged in user</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "user_following",            "description": "<p>the id of follow relationship</p> "          },          {            "group": "Parameter",            "type": "<p>Function</p> ",            "optional": false,            "field": "next",            "description": "<p>callback</p> "          }        ]      }    },    "filename": "client/index.js",    "groupTitle": "Following",    "groupDescription": "<p>This is a collection of methods that allow you to manage follow relationships.</p> "  },  {    "type": "function",    "url": "acceptFriendRequest(liu,friend_request,next)",    "title": "acceptFriendRequest",    "name": "acceptFriendRequest",    "group": "FriendRequests",    "version": "1.0.0",    "description": "<p>Create a friend request with message</p> ",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "liu",            "description": "<p>the id of the current logged in user</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "friend_request",            "description": "<p>the id of friend request to accept</p> "          },          {            "group": "Parameter",            "type": "<p>Function</p> ",            "optional": false,            "field": "next",            "description": "<p>callback</p> "          }        ]      }    },    "filename": "client/index.js",    "groupTitle": "FriendRequests",    "groupDescription": "<p>This is a collection of methods that allow you to manage the friend request process.</p> "  },  {    "type": "function",    "url": "addFriendRequest(liu,user_friend,message,timestamp,next)",    "title": "addFriendRequest",    "name": "addFriendRequest",    "group": "FriendRequests",    "version": "1.0.0",    "description": "<p>Create a friend request with message</p> ",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "liu",            "description": "<p>the id of the current logged in user</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "user_friend",            "description": "<p>the id of the user to send a friend request to</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "message",            "description": "<p>a message to leave with the request</p> "          },          {            "group": "Parameter",            "type": "<p>Timestamp</p> ",            "optional": false,            "field": "timestamp",            "description": "<p>time to leave the request</p> "          },          {            "group": "Parameter",            "type": "<p>Function</p> ",            "optional": false,            "field": "next",            "description": "<p>callback</p> "          }        ]      }    },    "filename": "client/index.js",    "groupTitle": "FriendRequests",    "groupDescription": "<p>This is a collection of methods that allow you to manage the friend request process.</p> "  },  {    "type": "function",    "url": "getFriendRequests(liu,next)",    "title": "getFriendRequests",    "name": "getFriendRequests",    "group": "FriendRequests",    "version": "1.0.0",    "description": "<p>Retrieve pending friend requests for the current logged in user</p> ",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "liu",            "description": "<p>the id of the current logged in user</p> "          },          {            "group": "Parameter",            "type": "<p>Function</p> ",            "optional": false,            "field": "next",            "description": "<p>callback</p> "          }        ]      }    },    "filename": "client/index.js",    "groupTitle": "FriendRequests",    "groupDescription": "<p>This is a collection of methods that allow you to manage the friend request process.</p> "  },  {    "type": "function",    "url": "addFriend(liu,user_friend,timestamp,next)",    "title": "addFriend",    "name": "addFriend",    "group": "Friends",    "version": "1.0.0",    "description": "<p>Add a friend directly</p> ",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "liu",            "description": "<p>the id of the current logged in user</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "user_friend",            "description": "<p>the id of the user to become friends with</p> "          },          {            "group": "Parameter",            "type": "<p>Number</p> ",            "optional": false,            "field": "timestamp",            "description": "<p>when the relationship began - Date.now()</p> "          },          {            "group": "Parameter",            "type": "<p>Function</p> ",            "optional": false,            "field": "next",            "description": "<p>callback</p> "          }        ]      }    },    "filename": "client/index.js",    "groupTitle": "Friends",    "groupDescription": "<p>This is a collection of methods that allow you to manage the friend request process.</p> "  },  {    "type": "function",    "url": "getFriend(liu,friend,next)",    "title": "getFriend",    "name": "getFriend",    "group": "Friends",    "version": "1.0.0",    "description": "<p>Get details of a specific friendship</p> ",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "liu",            "description": "<p>the id of the current logged in user</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "friend",            "description": "<p>the id of the friend relationship</p> "          },          {            "group": "Parameter",            "type": "<p>Function</p> ",            "optional": false,            "field": "next",            "description": "<p>callback</p> "          }        ]      }    },    "filename": "client/index.js",    "groupTitle": "Friends",    "groupDescription": "<p>This is a collection of methods that allow you to manage the friend request process.</p> "  },  {    "type": "function",    "url": "getFriends(liu,user,next)",    "title": "getFriends",    "name": "getFriends",    "group": "Friends",    "version": "1.0.0",    "description": "<p>Retrieve a list of friends for a specific user</p> ",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "liu",            "description": "<p>the id of the current logged in user</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "user",            "description": "<p>the id of the user to get the list of friends for</p> "          },          {            "group": "Parameter",            "type": "<p>Function</p> ",            "optional": false,            "field": "next",            "description": "<p>callback</p> "          }        ]      }    },    "filename": "client/index.js",    "groupTitle": "Friends",    "groupDescription": "<p>This is a collection of methods that allow you to manage the friend request process.</p> "  },  {    "type": "function",    "url": "removeFriend(liu,user_friend,next)",    "title": "removeFriend",    "name": "removeFriend",    "group": "Friends",    "version": "1.0.0",    "description": "<p>End a friendship</p> ",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "liu",            "description": "<p>the id of the current logged in user</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "user_friend",            "description": "<p>the id of the user to stop being friends with</p> "          },          {            "group": "Parameter",            "type": "<p>Function</p> ",            "optional": false,            "field": "next",            "description": "<p>callback</p> "          }        ]      }    },    "filename": "client/index.js",    "groupTitle": "Friends",    "groupDescription": "<p>This is a collection of methods that allow you to manage the friend request process.</p> "  },  {    "type": "function",    "url": "addLike(liu,item,next)",    "title": "addLike",    "name": "addLike",    "group": "Likes",    "version": "1.0.0",    "description": "<p>Signal that you like a specific URL</p> ",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "liu",            "description": "<p>the id of the current logged in user</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "item",            "description": "<p>the url of the page to like</p> "          },          {            "group": "Parameter",            "type": "<p>Function</p> ",            "optional": false,            "field": "next",            "description": "<p>callback</p> "          }        ]      }    },    "filename": "client/index.js",    "groupTitle": "Likes",    "groupDescription": "<p>This is a collection of methods that allow you to signal that you like a specific URL.</p> "  },  {    "type": "function",    "url": "checkLike(liu,item,next)",    "title": "checkLike",    "name": "checkLike",    "group": "Likes",    "version": "1.0.0",    "description": "<p>Check if the user likes a specific URL</p> ",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "liu",            "description": "<p>the id of the current logged in user</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "item",            "description": "<p>the url to check if the user likes</p> "          },          {            "group": "Parameter",            "type": "<p>Function</p> ",            "optional": false,            "field": "next",            "description": "<p>callback</p> "          }        ]      }    },    "filename": "client/index.js",    "groupTitle": "Likes",    "groupDescription": "<p>This is a collection of methods that allow you to signal that you like a specific URL.</p> "  },  {    "type": "function",    "url": "getLike(liu,like,next)",    "title": "getLike",    "name": "getLike",    "group": "Likes",    "version": "1.0.0",    "description": "<p>Retrieve details of a specific like item by id</p> ",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "liu",            "description": "<p>the id of the current logged in user</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "like",            "description": "<p>the id of the like that you want to retrieve details for</p> "          },          {            "group": "Parameter",            "type": "<p>Function</p> ",            "optional": false,            "field": "next",            "description": "<p>callback</p> "          }        ]      }    },    "filename": "client/index.js",    "groupTitle": "Likes",    "groupDescription": "<p>This is a collection of methods that allow you to signal that you like a specific URL.</p> "  },  {    "type": "function",    "url": "removeLike(liu,item,next)",    "title": "removeLike",    "name": "removeLike",    "group": "Likes",    "version": "1.0.0",    "description": "<p>Check if the user likes a specific URL</p> ",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "liu",            "description": "<p>the id of the current logged in user</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "item",            "description": "<p>the url to remove the like for</p> "          },          {            "group": "Parameter",            "type": "<p>Function</p> ",            "optional": false,            "field": "next",            "description": "<p>callback</p> "          }        ]      }    },    "filename": "client/index.js",    "groupTitle": "Likes",    "groupDescription": "<p>This is a collection of methods that allow you to signal that you like a specific URL.</p> "  },  {    "type": "function",    "url": "addPost(liu,content,timestamp,isprivate,ispersonal,next)",    "title": "addPost",    "name": "addPost",    "group": "Posts",    "version": "1.0.0",    "description": "<p>Create a new post on a users news feed</p> ",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "liu",            "description": "<p>the id of the current logged in user</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "content",            "description": "<p>the id of the user to follow</p> "          },          {            "group": "Parameter",            "type": "<p>Timestamp</p> ",            "optional": false,            "field": "timestamp",            "description": "<p>time to leave the request</p> "          },          {            "group": "Parameter",            "type": "<p>Boolean</p> ",            "optional": false,            "field": "isprivate",            "description": "<p>is this visible only to friends</p> "          },          {            "group": "Parameter",            "type": "<p>Boolean</p> ",            "optional": false,            "field": "ispersonal",            "description": "<p>is this visible only to the user</p> "          },          {            "group": "Parameter",            "type": "<p>Function</p> ",            "optional": false,            "field": "next",            "description": "<p>callback</p> "          }        ]      }    },    "filename": "client/index.js",    "groupTitle": "Posts",    "groupDescription": "<p>This is a collection of methods that allow you to create posts on the logged in users feed.</p> "  },  {    "type": "function",    "url": "getPost(liu,post,next)",    "title": "getPost",    "name": "getPost",    "group": "Posts",    "version": "1.0.0",    "description": "<p>Retrieve details of a specific post</p> ",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "liu",            "description": "<p>the id of the current logged in user</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "post",            "description": "<p>the id of the post to retrieve</p> "          },          {            "group": "Parameter",            "type": "<p>Function</p> ",            "optional": false,            "field": "next",            "description": "<p>callback</p> "          }        ]      }    },    "filename": "client/index.js",    "groupTitle": "Posts",    "groupDescription": "<p>This is a collection of methods that allow you to create posts on the logged in users feed.</p> "  },  {    "type": "function",    "url": "removePost(liu,post,next)",    "title": "removePost",    "name": "removePost",    "group": "Posts",    "version": "1.0.0",    "description": "<p>Remove a specific post from your newsfeed</p> ",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "liu",            "description": "<p>the id of the current logged in user</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "post",            "description": "<p>the id of the post to remove</p> "          },          {            "group": "Parameter",            "type": "<p>Function</p> ",            "optional": false,            "field": "next",            "description": "<p>callback</p> "          }        ]      }    },    "filename": "client/index.js",    "groupTitle": "Posts",    "groupDescription": "<p>This is a collection of methods that allow you to create posts on the logged in users feed.</p> "  },  {    "type": "function",    "url": "addUser(liu,username,altid,userdata,next)",    "title": "addUser",    "name": "addUser",    "group": "Users",    "version": "1.0.0",    "description": "<p>Creates a new user.</p> ",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "liu",            "description": "<p>the id of the current logged in user [not used]</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "username",            "description": "<p>the username</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "altid",            "description": "<p>the local / alternate id</p> "          },          {            "group": "Parameter",            "type": "<p>Object</p> ",            "optional": false,            "field": "userdata",            "description": "<p>arbitrary user data (one level of key values only)</p> "          },          {            "group": "Parameter",            "type": "<p>Function</p> ",            "optional": false,            "field": "next",            "description": "<p>callback</p> "          }        ]      }    },    "filename": "client/index.js",    "groupTitle": "Users",    "groupDescription": "<p>This is a collection of methods that allow you to create and retrieve users.</p> "  },  {    "type": "function",    "url": "getUser(liu,user,next)",    "title": "getUser",    "name": "getUser",    "group": "Users",    "version": "1.0.0",    "description": "<p>Retrieve a users details by seguir ID</p> ",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "liu",            "description": "<p>the id of the current logged in user</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "user",            "description": "<p>the id of the user</p> "          },          {            "group": "Parameter",            "type": "<p>Function</p> ",            "optional": false,            "field": "next",            "description": "<p>callback</p> "          }        ]      }    },    "filename": "client/index.js",    "groupTitle": "Users",    "groupDescription": "<p>This is a collection of methods that allow you to create and retrieve users.</p> "  },  {    "type": "function",    "url": "getUserByAltId(liu,altid,next)",    "title": "getUserByAltId",    "name": "getUserByAltId",    "group": "Users",    "version": "1.0.0",    "description": "<p>Retrieve a user details by alternate id</p> ",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "liu",            "description": "<p>the id of the current logged in user</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "altid",            "description": "<p>the altid of the user</p> "          },          {            "group": "Parameter",            "type": "<p>Function</p> ",            "optional": false,            "field": "next",            "description": "<p>callback</p> "          }        ]      }    },    "filename": "client/index.js",    "groupTitle": "Users",    "groupDescription": "<p>This is a collection of methods that allow you to create and retrieve users.</p> "  },  {    "type": "function",    "url": "getUserByName(liu,username,next)",    "title": "getUserByName",    "name": "getUserByName",    "group": "Users",    "version": "1.0.0",    "description": "<p>Retrieve a users details by username</p> ",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "liu",            "description": "<p>the id of the current logged in user</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "username",            "description": "<p>the username of the user</p> "          },          {            "group": "Parameter",            "type": "<p>Function</p> ",            "optional": false,            "field": "next",            "description": "<p>callback</p> "          }        ]      }    },    "filename": "client/index.js",    "groupTitle": "Users",    "groupDescription": "<p>This is a collection of methods that allow you to create and retrieve users.</p> "  },  {    "type": "function",    "url": "getUserRelationship(liu,user,next)",    "title": "getUserRelationship",    "name": "getUserRelationship",    "group": "Users",    "version": "1.0.0",    "description": "<p>Get details of a relationship between two users</p> ",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "liu",            "description": "<p>the id of the current logged in user</p> "          },          {            "group": "Parameter",            "type": "<p>String</p> ",            "optional": false,            "field": "user",            "description": "<p>the id of the user</p> "          },          {            "group": "Parameter",            "type": "<p>Function</p> ",            "optional": false,            "field": "next",            "description": "<p>callback</p> "          }        ]      }    },    "filename": "client/index.js",    "groupTitle": "Users",    "groupDescription": "<p>This is a collection of methods that allow you to create and retrieve users.</p> "  }] });