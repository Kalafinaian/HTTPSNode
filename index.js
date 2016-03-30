var server = require("./server");

var router = require("./router");

var requestHandlers = require("./requestHandlers");


var handle = {};
handle["/v0/"] = requestHandlers.start;
handle["/v0/start"] = requestHandlers.start;
handle["/v0/upload"] = requestHandlers.upload;


server.start(router.route,handle);