var server = require("./server"); //https服务模块

var router = require("./router"); //路由配置模块

var requestHandlers = require("./requestHandlers");  //请求处理模块


//---------------------开始--对象handle：存储处理函数--开始--------------------//
var handle = {};
handle["/v0/"] = requestHandlers.login;
handle["/v0/login"] = requestHandlers.login;
handle["/v0/addUser"] = requestHandlers.addUser;
handle["/v0/selectUser"] = requestHandlers.selectUser;
handle["/v0/deleteUser"] = requestHandlers.deleteUser;
handle["/v0/updateUser"] = requestHandlers.updateUser;
//---------------------结束--对象handle：存储处理函数--结束--------------------//



//---------------------开始--后台启动入口--开始--------------------//
server.start(router.route,handle);
//---------------------结束--后台启动入口--结束--------------------//