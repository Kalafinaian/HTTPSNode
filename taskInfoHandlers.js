var querystring = require("querystring"); //post原始数据转JSON对象处理模块
var dbClient = require("./Mongo");  //数据库模块

//封装JSON字段不确定参数判断函数---待完成
function judgeTaskID(postJSON,response)
{
	if( !postJSON.hasOwnProperty("taskID") )
	{
		var info = 	{ "error":  
		{  
			"msg": "请输入任务申请工单ID!",  
			"code":"00004"  
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

//---------------------开始--验证动态令牌有效期--开始--------------------//
function judgeTokenTime(endTime,response)
{
	var nowTime = parseInt(Date.now()/1000);
	if( nowTime>endTime )
	{
		var info = 	{ "error":  
		{  
			"msg": "动态令牌已过期，请重新登陆",  
			"code":"00006"  
		}  };
		response.write( JSON.stringify(info) );
		response.end();
		return false;
	}
	return true;
}
//---------------------开始--验证动态令牌有效期--开始--------------------//

//---------------------开始--任务申请函数--开始--------------------//
//任务申请和任务函数--需要已经验证没有触发器，直接通过代码绑定到肖良平//
//任务修改和申请工单,内部函数不一，还是分开写，多提供一个接口的好：不能放在一起//
function taskRequest(response, postData)
{
	console.log( "Request handler 'taskRequest' was called." );
	response.writeHead(200, {"Content-Type": "text/plain,charset=utf-8"});
	var postJSON = querystring.parse(postData);
	var mongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/csis';	
	var collectionName = "taskInfo";
	//判断操作者和动态令牌是否存在
	if( judgeUserToken(postJSON,response)==false ){  return;  };
    //if( judgeTaskID(postJSON,response)==false ){  return;  };
	console.log(postJSON);
	var whereStr = {username:postJSON.operatorName,accessToken:postJSON.accessToken};
	console.log(whereStr);
	//验证用户名和动态令牌
	dbClient.selectFunc( mongoClient, DB_CONN_STR, "userInfo",  whereStr , function(result){
			console.log(result);
			if(result.length>0)
			{
				//动态令牌有效性判断
				if( judgeTokenTime(result.tokenEndTime,response)==false ){ return; };
				
				//这里需要根据基站查询审批人
				postJSON.approvalPerson = "肖良平";
				postJSON.approvalPhone = "15520443869";
				postJSON.taskID = parseInt(Date.now()/1000);
				//插入请求数据
				dbClient.insertFunc( mongoClient, DB_CONN_STR, collectionName,  postJSON , function(result){
						console.log(result);
						if( result.hasOwnProperty("errmsg") )
						{
							var info = 	{ "error":  
								{  
									"msg": "任务申请工单ID已存在!",  
									"code":"17001"  
								}  };
							response.write( JSON.stringify(info) );
							response.end();
						}else{
							var info = 	{ "success":  
							{  
								"msg": "任务申请工单申请成功!",  
								"code":"17000"  
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
//---------------------结束--任务申请和任务修改函数--结束--------------------//




//---------------------开始--管理员抓取工单--开始--------------------//
function taskFetch(response, postData)
{
	console.log( "Request handler 'taskFetch' was called." );
	response.writeHead(200, {"Content-Type": "text/plain,charset=utf-8"});
	var postJSON = querystring.parse(postData);
	var mongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/csis';	
	var collectionName = "taskInfo";
	//判断操作者和动态令牌是否存在
	if( judgeUserToken(postJSON,response)==false ){  return;  };
	if( !postJSON.hasOwnProperty('approvalPerson') ){ 
		var info = 	{ "error":  
		{  
			"msg": "请输入审批人名字!",  
			"code":"18002"  
		}  };
		response.write( JSON.stringify(info) );
		response.end();
		return;
	}
	
	console.log(postJSON);
	//验证任务申请工单名和动态令牌
	var whereStr = {username:postJSON.operatorName,accessToken:postJSON.accessToken};
	console.log(whereStr);

	dbClient.selectFunc( mongoClient, DB_CONN_STR, "userInfo",  whereStr , function(result){
		console.log(result);
		if(result.length>0)
		{
			//动态令牌有效性判断
			if( judgeTokenTime(result.tokenEndTime,response)==false ){ return; };
			
			delete postJSON.operatorName; 
			delete postJSON.accessToken; 
			console.log(postJSON);
			dbClient.selectFunc( mongoClient, DB_CONN_STR, collectionName,  postJSON , 
				function(result){
				if( result.length>0 )
				{
					var json = {success:{}};
					for(var i=0;i<result.length;i++)
					{
						json.success[i] = result[i];
					}
					response.write( JSON.stringify(json) );
					response.end();
				}else{
					var info = 	{ "error":  
					{  
						"msg": "暂时没有需要处理的工单!",  
						"code":"18001"  
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
//---------------------结束--管理员抓取工单--结束--------------------//



//---------------------开始--任务工单审批函数--开始--------------------//
//---------------------需要通过触发器生成校验码和参数--------------------//
function taskAuthenticate(response, postData)
{
	console.log( "Request handler 'taskAuthenticate' was called." );
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
			//动态令牌有效性判断
			if( judgeTokenTime(result.tokenEndTime,response)==false ){ return; };
			
			//这里需要根据基站和电子钥匙信息生成授权码，授权时间
			
			if(postJSON.applicationStatus == "approve")
			{
				postJSON.approveCode = "132464688";
				var newStartTime = parseInt(Date.now()/1000);
				var newEndTime = newStartTime + 24*3600;
				postJSON.approveStartTime = newStartTime;
				postJSON.approveEndTime = newEndTime;
				postJSON.approveTimes = 5;
				//originalName
				var whereStr = {taskID:postJSON.taskID};
				var updateStr = {$set: postJSON };
				dbClient.updateFunc( mongoClient, DB_CONN_STR, collectionName, whereStr, updateStr,function(result){
					var info = 	{ "success":  
					{  
						"msg": "任务工单信息授权成功!",  
						"code":"19000"  
					}  };
					response.write( JSON.stringify(info) );
					response.end();
				});	
			}else{
					var info = 	{ "success":  
					{  
						"msg": "任务工单信息:"+postJSON.applicationStatus,  
						"code":"19001"  
					}  };
					response.write( JSON.stringify(info) );
					response.end();
			}


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
//---------------------结束--任务工单审批函数--结束--------------------//



//---------------------开始--任务申请工单授权状态抓取函数--开始--------------------//
function taskAuthFetch(response, postData)
{
	console.log( "Request handler 'taskAuthFetch' was called." );
	response.writeHead(200, {"Content-Type": "text/plain,charset=utf-8"});
	var postJSON = querystring.parse(postData);
	var mongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/csis';	
	var collectionName = "taskInfo";

	//判断操作者和动态令牌是否存在
	if( judgeUserToken(postJSON,response)==false ){  return;  };
   	if( !postJSON.hasOwnProperty('applicantName') ){ 
		var info = 	{ "error":  
		{  
			"msg": "请输入申请人的名字!",  
			"code":"20002"  
		}  };
		response.write( JSON.stringify(info) );
		response.end();
		return;
	}
	//验证任务申请工单名和动态令牌
	var whereStr = {username:postJSON.operatorName,accessToken:postJSON.accessToken};
	dbClient.selectFunc( mongoClient, DB_CONN_STR, "userInfo",  whereStr , function(result){
		console.log(result);

		if(result.length>0)
		{
			//动态令牌有效性判断
			if( judgeTokenTime(result.tokenEndTime,response)==false ){ return; };
			
			//originalName
			var whereStr = {applicantName:postJSON.applicantName};
			dbClient.selectFunc( mongoClient, DB_CONN_STR, collectionName, whereStr,function(result){
				if( result.length > 0 )
				{
					var json = {success:{}};
					for(var i=0;i<result.length;i++)
					{
						json.success[i] = result[i];
					}
					response.write( JSON.stringify(json) );
					response.end();
				}else{
					var info = 	{ "error":  
					{  
						"msg": "您没有申请任务!",  
						"code":"20001"  
					}  };
					response.write( JSON.stringify(result) );
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
//---------------------结束--任务申请工单授权状态抓取函数--结束--------------------//





//---------------------开始--任务申请工单完成后，提交工说明单信息函数--开始--------------------//
function taskCommit(response, postData)
{
	console.log( "Request handler 'taskCommit' was called." );
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
			//动态令牌有效性判断
			if( judgeTokenTime(result.tokenEndTime,response)==false ){ return; };
			
			//originalName
			var whereStr = {taskID:postJSON.originalTaskID};
			var updateStr = {$set: postJSON };
			dbClient.updateFunc( mongoClient, DB_CONN_STR, collectionName, whereStr, updateStr,function(result){
				var info = 	{ "success":  
				{  
					"msg": "任务申请工单信息提交成功!",  
					"code":"21000"  
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
//---------------------结束--任务申请工单完成后，提交工说明单信息函数--结束--------------------//



//---------------------开始--下载工单日志函数--开始--------------------//
function downloadTask(response, postData)
{
	console.log( "Request handler 'downloadTask' was called." );
	response.writeHead(200, {"Content-Type": "text/plain,charset=utf-8"});
	var postJSON = querystring.parse(postData);
	var mongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/csis';	
	var collectionName = "userInfo";
	//判断操作者和动态令牌是否存在
	if( judgeUserToken(postJSON,response)==false ){  return;  };

	console.log(postJSON);
	//验证用户名和动态令牌
	var whereStr = {username:postJSON.operatorName,accessToken:postJSON.accessToken};
	console.log(whereStr);
	dbClient.selectFunc( mongoClient, DB_CONN_STR, collectionName,  whereStr , function(result){
		console.log(result);
		if(result.length>0)
		{
			//动态令牌有效性判断
			if( judgeTokenTime(result.tokenEndTime,response)==false ){ return; };
			
			var fileName = postJSON.operatorName;
			delete postJSON.operatorName; 
			delete postJSON.accessToken; 
			dbClient.selectFunc( mongoClient, DB_CONN_STR, "taskInfo",  postJSON , 
				function(result){
				console.log(result);
				if( result.length>0 )
				{
						var fs = require('fs');
						var nodeExcel = require('excel-export');
						var conf ={};
						conf.name = "mysheet";

						conf.cols = [       
						        {
						            caption:'申请者',
						            type:'string',
						        },
						        {
						            caption:'审批人',
						            type:'string',
						        },
						        {
						            caption:'申请状态',
						            type:'string'
						        }
						];
						conf.rows = [];
						for(var i=0;i<result.length;i++)
						{
							conf.rows[i] = [result[i].applicantName, result[i].approvalPerson,
							result[i].applicationStatus ];
						}

						var result = nodeExcel.execute(conf);
						console.log('export successfully!');
						fs.writeFileSync('/usr/share/nginx/MBS_WebSourceCode/'+fileName+'.xlsx', result, 'binary');
						var info = 	{ "success":  
						{  
							"url": 'https://www.smartlock.top/'+fileName+'.xlsx',  
							"code":"22000"  
						}  };
						response.write( JSON.stringify(info) );
						response.end();
				}else{
					var info = 	{ "error":  
					{  
						"msg": "没有数据记录!",  
						"code":"22001"  
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
//---------------------结束--下载工单日志函数--结束--------------------//



//---------------------开始--任务申请修改--开始--------------------//
function taskChange(response, postData)
{
	console.log( "Request handler 'taskChange' was called." );
	response.writeHead(200, {"Content-Type": "text/plain,charset=utf-8"});
	var postJSON = querystring.parse(postData);
	var mongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/csis';	
	var collectionName = "taskInfo";
	//判断操作者和动态令牌是否存在
	if( judgeUserToken(postJSON,response)==false ){  return;  };
    //if( judgeTaskID(postJSON,response)==false ){  return;  };
	console.log(postJSON);
	var whereStr = {username:postJSON.operatorName,accessToken:postJSON.accessToken};
	console.log(whereStr);
	//验证用户名和动态令牌
	dbClient.selectFunc( mongoClient, DB_CONN_STR, "userInfo",  whereStr , function(result){
			console.log(result);
			if(result.length>0)
			{
				//动态令牌有效性判断
				if( judgeTokenTime(result.tokenEndTime,response)==false ){ return; };
				
				//更新请求数据
				var whereStr = {taskID:postJSON.originalTaskID};
				delete postJSON.originalTaskID;
				delete postJSON.operatorName;
				delete postJSON.accessToken;
				var updateStr = {$set: postJSON };
				dbClient.updateFunc( mongoClient, DB_CONN_STR, collectionName, whereStr, updateStr,function(result){
					var info = 	{ "success":  
					{  
						"msg": "任务工单信息修改成功!",  
						"code":"23000"  
					}  };
					response.write( JSON.stringify(info) );
					response.end();
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
//---------------------结束--任务申请修改--结束--------------------//



//---------------------开始--模块导出接口声明--开始--------------------//
exports.taskRequest = taskRequest; //任务申请和任务修改
exports.taskFetch = taskFetch;
exports.taskAuthenticate = taskAuthenticate;
exports.taskAuthFetch = taskAuthFetch;
exports.taskCommit = taskCommit;
exports.downloadTask = downloadTask;
exports.taskChange = taskChange;
//---------------------结束--模块导出接口声明--结束--------------------//
