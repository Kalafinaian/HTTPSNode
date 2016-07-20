4674968891,4674968891,4674968891,4674968892,4674968893,4674968894,4674968895,4674968896,4674968897,4674968898
4674968891
删除的id： 4674968891
/usr/share/NodeJS/Node.js/node_modules/mongodb/lib/utils.js:98
    process.nextTick(function() { throw err; });
                                  ^

Error: Invalid ObjectId: 4674968891
    at Id (/usr/share/NodeJS/Node.js/node_modules/objectid/index.js:49:11)
    at /usr/share/NodeJS/Node.js/keyInfoHandlers.js:1197:26
    at /usr/share/NodeJS/Node.js/Mongo.js:139:6
    at handleCallback (/usr/share/NodeJS/Node.js/node_modules/mongodb/lib/utils.js:96:12)
    at /usr/share/NodeJS/Node.js/node_modules/mongodb/lib/cursor.js:839:16
    at handleCallback (/usr/share/NodeJS/Node.js/node_modules/mongodb/node_modules/mongodb-core/lib/cursor.js:159:5)
    at setCursorDeadAndNotified (/usr/share/NodeJS/Node.js/node_modules/mongodb/node_modules/mongodb-core/lib/cursor.js:501:3)
    at nextFunction (/usr/share/NodeJS/Node.js/node_modules/mongodb/node_modules/mongodb-core/lib/cursor.js:652:7)
    at Cursor.next [as _next] (/usr/share/NodeJS/Node.js/node_modules/mongodb/node_modules/mongodb-core/lib/cursor.js:693:3)
    at fetchDocs (/usr/share/NodeJS/Node.js/node_modules/mongodb/lib/cursor.js:835:10)