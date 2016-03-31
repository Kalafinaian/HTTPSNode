var server = require("./server");

var router = require("./router");

var requestHandlers = require("./requestHandlers");


var handle = {};
handle["/v0/"] = requestHandlers.login;
handle["/v0/login"] = requestHandlers.login;
handle["/v0/addUser"] = requestHandlers.addUser;


server.start(router.route,handle);