var querystring = require("querystring"); //post原始数据转JSON对象处理模块
var dbClient = require("./Mongo");  //数据库模块

//封装JSON字段不确定参数判断函数---待完成
function judgeTaskID(postJSON,response)
{
	if( !postJSON.hasOwnProperty("taskID") )
	{
		var info = 	{ "success":  
		{  
			"msg": "请输入任务申请工单ID!",  
			"code":"00002"  
		}  };
		response.write( JSON.stringify(info) );
		response.end();
		return false;
	}
	return true;
}

//---------------------开始--验证动态令牌--开始--------------------//
function judgeUserToken(postJSON,response)
{
	if( !postJSON.hasOwnProperty('operatorName') || !postJSON.hasOwnProperty('accessToken') )
	{
			var info = 	{ "error":  
				{  
					"msg": "请输入用户名和动态令牌",  
					"code":"00001"  
				}  };
			response.write( JSON.stringify(info) );
			response.end();
			return false;
	}
	return true;
}
//---------------------开始--验证动态令牌--开始--------------------//


//---------------------开始--任务申请工单添加函数--开始--------------------//
function addTask(response, postData)
{
	console.log( "Request handler 'addTask' was called." );
	response.writeHead(200, {"Content-Type": "text/plain,charset=utf-8"});
	var postJSON = querystring.parse(postData);
	var mongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/csis';	
	var collectionName = "taskInfo";
	//判断操作者和动态令牌是否存在
	if( judgeUserToken(postJSON,response)==false ){  return;  };
    if( judgeTaskID(postJSON,response)==false ){  return;  };
	console.log(postJSON);
	var whereStr = {username:postJSON.operatorName,accessToken:postJSON.accessToken};
	console.log(whereStr);
	//验证用户名和动态令牌
	dbClient.selectFunc( mongoClient, DB_CONN_STR, "userInfo",  whereStr , function(result){
			console.log(result);
			if(result.length>0)
			{
				//插入请求数据
				dbClient.insertFunc( mongoClient, DB_CONN_STR, collectionName,  postJSON , function(result){
						if( result.hasOwnProperty("errmsg") )
						{
							var info = 	{ "error":  
								{  
									"msg": "任务申请工单ID已存在!",  
									"code":"12001"  
								}  };
							response.write( JSON.stringify(info) );
							response.end();
						}else{
							var info = 	{ "success":  
							{  
								"msg": "任务申请工单添加成功!",  
								"code":"12000"  
							}  };
							response.write( JSON.stringify(info) );
							response.end();
						}
				
				});	
			}else{
				var info = 	{ "error":  
					{  
						"msg": "用户名不存在或动态令牌已过期",  
						"code":"00000"  
					}  };
				response.write( JSON.stringify(info) );
				response.end();
				return;
			}	
	});
}
//---------------------结束--任务申请工单添加函数--结束--------------------//




//---------------------开始--任务申请工单删除函数--开始--------------------//
function deleteTask(response, postData)
{
	console.log( "Request handler 'deleteTask' was called." );
	response.writeHead(200, {"Content-Type": "text/plain,charset=utf-8"});
	var postJSON = querystring.parse(postData);
	var mongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/csis';	
	var collectionName = "taskInfo";

	//判断操作者和动态令牌是否存在
	if( judgeUserToken(postJSON,response)==false ){  return;  };
    if( judgeTaskID(postJSON,response)==false ){  return;  };
	//验证任务申请工单名和动态令牌
	var whereStr = {username:postJSON.operatorName,accessToken:postJSON.accessToken};
	dbClient.selectFunc( mongoClient, DB_CONN_STR, "userInfo",  whereStr , function(result){
		console.log(result);
		if(result.length>0)
		{
			var whereStr = {username:postJSON.TaskID};
			dbClient.deleteFunc( mongoClient, DB_CONN_STR, collectionName,  whereStr , function(result){
				console.log("删除信息"+result);
				var info = 	{ "success":  
				{  
					"msg": "任务申请工单删除成功!",  
					"code":"13000"  
				}  };
				response.write( JSON.stringify(info) );
				response.end();
			});	
		}else{
				var info = 	{ "error":  
				{  
					"msg": "用户名不存在或动态令牌已过期!",  
					"code":"00000"  
				}  };
				response.write( JSON.stringify(info) );
				response.end();	
		}
	});

}
//---------------------结束--任务申请工单删除函数--结束--------------------//



//---------------------开始--任务申请工单更新函数--开始--------------------//
function updateTask(response, postData)
{
	console.log( "Request handler 'updateTask' was called." );
	response.writeHead(200, {"Content-Type": "text/plain,charset=utf-8"});
	var postJSON = querystring.parse(postData);
	var mongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/csis';	
	var collectionName = "taskInfo";

	//判断操作者和动态令牌是否存在
	if( judgeUserToken(postJSON,response)==false ){  return;  };
    if( judgeTaskID(postJSON,response)==false ){  return;  };
	//验证任务申请工单名和动态令牌
	var whereStr = {username:postJSON.operatorName,accessToken:postJSON.accessToken};
	dbClient.selectFunc( mongoClient, DB_CONN_STR, "userInfo",  whereStr , function(result){
		console.log(result);

		if(result.length>0)
		{
			//originalName
			var whereStr = {TaskID:postJSON.originalTaskID};
			var updateStr = {$set: postJSON };
			dbClient.updateFunc( mongoClient, DB_CONN_STR, collectionName, whereStr, updateStr,function(result){
				if( result.hasOwnProperty("errmsg") )
				{
					var info = 	{ "error":  
						{  
							"msg": "任务申请工单ID已存在!",  
							"code":"14001"  
						}  };
					response.write( JSON.stringify(info) );
					response.end();
				}else{
					var info = 	{ "success":  
					{  
						"msg": "任务申请工单信息编辑成功!",  
						"code":"14000"  
					}  };
					response.write( JSON.stringify(info) );
					response.end();
				}
			});	
		}else{
				var info = 	{ "error":  
				{  
					"msg": "用户名不存在或动态令牌已过期!",  
					"code":"00000"  
				}  };
				response.write( JSON.stringify(info) );
				response.end();	
		}
	});

}
//---------------------结束--任务申请工单更新函数--结束--------------------//




//---------------------开始--任务申请工单查询函数--开始--------------------//
function selectTask(response, postData)
{
	console.log( "Request handler 'selectTask' was called." );
	response.writeHead(200, {"Content-Type": "text/plain,charset=utf-8"});
	var postJSON = querystring.parse(postData);
	var mongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/csis';	
	var collectionName = "taskInfo";
	//判断操作者和动态令牌是否存在
	if( judgeUserToken(postJSON,response)==false ){  return;  };
	
	console.log(postJSON);
	//验证任务申请工单名和动态令牌
	var whereStr = {username:postJSON.operatorName,accessToken:postJSON.accessToken};
	console.log(whereStr);

	dbClient.selectFunc( mongoClient, DB_CONN_STR, "userInfo",  whereStr , function(result){
		console.log(result);
		if(result.length>0)
		{
			delete postJSON.operatorName; 
			delete postJSON.accessToken; 
			console.log(postJSON);
			dbClient.selectFunc( mongoClient, DB_CONN_STR, collectionName,  postJSON , 
				function(result){
				if( result.length>0 )
				{
					response.write( JSON.stringify(result) );
					response.end();
				}else{
					var info = 	{ "taskInfo":  
					{  
						"msg": "没有查询记录!",  
						"code":"15001"  
					}  };
					response.write( JSON.stringify(info) );
					response.end();
				}
			
			});	
		}else{
			var info = 	{ "error":  
				{  
					"msg": "用户名不存在或动态令牌已过期",  
					"code":"00000"  
				}  };
			response.write( JSON.stringify(info) );
			response.end();
			return;
		}
	});
}
//---------------------结束--任务申请工单查询函数--结束--------------------//



//---------------------开始--函数--开始--------------------//
//---------------------结束--函数--结束--------------------//
//---------------------开始--函数--开始--------------------//
//---------------------结束--函数--结束--------------------//



//---------------------开始--模块导出接口声明--开始--------------------//
exports.addTask = addTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
exports.selectTask = selectTask;
//---------------------结束--模块导出接口声明--结束--------------------//
