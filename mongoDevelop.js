var dbClient = require("./Mongo");  //数据库模块
var mongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/csis';	
var collectionName = "taskInfo";

//更新工单状态
var whereTask = {};
var updateStr = {$set: {approvalPhone:"15520443869"}  };
dbClient.updateMultiFunc( mongoClient, DB_CONN_STR, collectionName, whereTask, updateStr);	