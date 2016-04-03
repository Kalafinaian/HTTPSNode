var querystring = require("querystring"); //post原始数据转JSON对象处理模块
var dbClient = require("./Mongo");  //数据库模块

//封装JSON字段不确定参数判断函数---待完成
function judgeStationID(postJSON,response)
{
	if( !postJSON.hasOwnProperty("stationID") )
	{
		var info = 	{ "success":  
		{  
			"msg": "请输入基站ID!",  
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


//---------------------开始--基站添加函数--开始--------------------//
function addStation(response, postData)
{
	console.log( "Request handler 'addStation' was called." );
	response.writeHead(200, {"Content-Type": "text/plain,charset=utf-8"});
	var postJSON = querystring.parse(postData);
	var mongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/csis';	
	var collectionName = "stationInfo";
	//判断操作者和动态令牌是否存在
	if( judgeUserToken(postJSON,response)==false ){  return;  };
    if( judgeStationID(postJSON,response)==false ){  return;  };
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
									"msg": "基站ID已存在!",  
									"code":"07001"  
								}  };
							response.write( JSON.stringify(info) );
							response.end();
						}else{
							var info = 	{ "success":  
							{  
								"msg": "基站添加成功!",  
								"code":"07000"  
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
//---------------------结束--基站添加函数--结束--------------------//




//---------------------开始--基站删除函数--开始--------------------//
function deleteStation(response, postData)
{
	console.log( "Request handler 'deleteStation' was called." );
	response.writeHead(200, {"Content-Type": "text/plain,charset=utf-8"});
	var postJSON = querystring.parse(postData);
	var mongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/csis';	
	var collectionName = "stationInfo";

	//判断操作者和动态令牌是否存在
	if( judgeUserToken(postJSON,response)==false ){  return;  };
    if( judgeStationID(postJSON,response)==false ){  return;  };
	//验证基站名和动态令牌
	var whereStr = {username:postJSON.operatorName,accessToken:postJSON.accessToken};
	dbClient.selectFunc( mongoClient, DB_CONN_STR, "userInfo",  whereStr , function(result){
		console.log(result);
		if(result.length>0)
		{
			var whereStr = {username:postJSON.stationID};
			dbClient.deleteFunc( mongoClient, DB_CONN_STR, collectionName,  whereStr , function(result){
				console.log("删除信息"+result);
				var info = 	{ "success":  
				{  
					"msg": "基站删除成功!",  
					"code":"08000"  
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
//---------------------结束--基站删除函数--结束--------------------//



//---------------------开始--基站更新函数--开始--------------------//
function updateStation(response, postData)
{
	console.log( "Request handler 'updateStation' was called." );
	response.writeHead(200, {"Content-Type": "text/plain,charset=utf-8"});
	var postJSON = querystring.parse(postData);
	var mongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/csis';	
	var collectionName = "stationInfo";

	//判断操作者和动态令牌是否存在
	if( judgeUserToken(postJSON,response)==false ){  return;  };
    if( judgeStationID(postJSON,response)==false ){  return;  };
	//验证基站名和动态令牌
	var whereStr = {username:postJSON.operatorName,accessToken:postJSON.accessToken};
	dbClient.selectFunc( mongoClient, DB_CONN_STR, "userInfo",  whereStr , function(result){
		console.log(result);

		if(result.length>0)
		{
			//originalName
			var whereStr = {username:postJSON.originalStationID};
			var updateStr = {$set: postJSON };
			dbClient.updateFunc( mongoClient, DB_CONN_STR, collectionName, whereStr, updateStr,function(result){
				if( result.hasOwnProperty("errmsg") )
				{
					var info = 	{ "error":  
						{  
							"msg": "基站ID已存在!",  
							"code":"09001"  
						}  };
					response.write( JSON.stringify(info) );
					response.end();
				}else{
					var info = 	{ "success":  
					{  
						"msg": "基站信息编辑成功!",  
						"code":"09000"  
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
//---------------------结束--基站更新函数--结束--------------------//




//---------------------开始--基站查询函数--开始--------------------//
function selectStation(response, postData)
{
	console.log( "Request handler 'selectStation' was called." );
	response.writeHead(200, {"Content-Type": "text/plain,charset=utf-8"});
	var postJSON = querystring.parse(postData);
	var mongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/csis';	
	var collectionName = "stationInfo";
	//判断操作者和动态令牌是否存在
	if( judgeUserToken(postJSON,response)==false ){  return;  };
	
	console.log(postJSON);
	//验证基站名和动态令牌
	var whereStr = {username:postJSON.operatorName,accessToken:postJSON.accessToken};
	console.log(whereStr);
	dbClient.selectFunc( mongoClient, DB_CONN_STR, "userInfo",  whereStr , function(result){
		console.log(result);
		if(result.length>0)
		{
			delete postJSON.operatorName; 
			delete postJSON.accessToken; 
			dbClient.selectFunc( mongoClient, DB_CONN_STR, collectionName,  postJSON , 
				function(result){
				if( result.length>0 )
				{
					response.write( JSON.stringify(result) );
					response.end();
				}else{
					var info = 	{ "stationInfo":  
					{  
						"msg": "没有查询记录!",  
						"code":"10001"  
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
//---------------------结束--基站查询函数--结束--------------------//



//---------------------开始--函数--开始--------------------//
//---------------------结束--函数--结束--------------------//
//---------------------开始--函数--开始--------------------//
//---------------------结束--函数--结束--------------------//



//---------------------开始--模块导出接口声明--开始--------------------//
exports.addStation = addStation;
exports.updateStation = updateStation;
exports.deleteStation = deleteStation;
exports.selectStation = selectStation;
//---------------------结束--模块导出接口声明--结束--------------------//
