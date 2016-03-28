var server = require("./server");
//包括一个start函数，开启工作线程 http://192.168.1.155:8000/upload
var router = require("./router");
//包含一个路由处理函数route
var requestHandlers = require("./requestHandlers");
//包含所有的处理函数

//通过require可以将文件中定义的对象封装到一个新的对象中
var handle = {};

handle["/v0/"] = requestHandlers.start;
handle["/v0/start"] = requestHandlers.start;
handle["/v0/upload"] = requestHandlers.upload;
//这里的route是一个函数
server.start(router.route,handle);