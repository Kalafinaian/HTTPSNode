var querystring = require("querystring"); //post原始数据转JSON对象处理模块
var dbClient = require("./Mongo");  //数据库模块

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



//---------------------开始--登陆处理函数--开始--------------------//
function login(response, postData)
{
	console.log( "Request handler 'login' was called." );
	response.writeHead(200, {"Content-Type": "text/plain,charset=utf-8"});
	var postJSON = querystring.parse(postData);
	var mongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/csis';	
	var collectionName = "userInfo";
	console.log(postJSON);
	if( !postJSON.hasOwnProperty('username') || !postJSON.hasOwnProperty('password') )
	{
			var info = 	{ "error":  
				{  
					"msg": "请输入用户名和密码",  
					"code":"01001"  
				}  };
			response.write( JSON.stringify(info) );
			response.end();
			return false;
	}
	//查询用户名和密码
	dbClient.selectFunc( mongoClient, DB_CONN_STR, collectionName,  postJSON , function(result){
			if( result.length<=0 || result.hasOwnProperty("errmsg") )
			{
				var info = 	{ "error":  
					{  
						"msg": "#err:用户名或密码错误!",  
						"code":"01002"  
					}  };
				response.write( JSON.stringify(info) );
				response.end();
			}else{
				//更新数据库中的动态令牌
				var newAccessToken = Math.random().toString(36).substr(2);
				var newStartTime = parseInt(Date.now()/1000);
				var newEndTime = newStartTime + 24*3600;
				var updateStr = { $set: { "accessToken" : newAccessToken, "tokenStartTime":newStartTime.toString(), "tokenEndTime" : newEndTime.toString() }};
				dbClient.updateFunc( mongoClient, DB_CONN_STR, collectionName,  postJSON , updateStr,  function(result){
				 	console.log(result);
				});
				//再次查询，返回结果
				dbClient.selectFunc( mongoClient, DB_CONN_STR, collectionName,  postJSON , function(result){
					response.write( JSON.stringify(result) );
					response.end();
				});	
			}	
	});		
}
//---------------------结束--登陆处理函数--结束--------------------//



//---------------------开始--用户添加函数--开始--------------------//
function addUser(response, postData)
{
	console.log( "Request handler 'addUser' was called." );
	response.writeHead(200, {"Content-Type": "text/plain,charset=utf-8"});
	var postJSON = querystring.parse(postData);
	var mongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/csis';	
	var collectionName = "userInfo";
	//判断操作者和动态令牌是否存在
	if( judgeUserToken(postJSON,response)==false ){  return;  };

	console.log(postJSON);
	var whereStr = {username:postJSON.operatorName,accessToken:postJSON.accessToken};
	console.log(whereStr);
	//验证用户名和动态令牌
	dbClient.selectFunc( mongoClient, DB_CONN_STR, collectionName,  whereStr , function(result){
			console.log(result);
			if(result.length>0)
			{
				//插入请求数据
				postJSON.username = postJSON.newUsername;
				delete postJSON.newUsername;
				dbClient.insertFunc( mongoClient, DB_CONN_STR, collectionName,  postJSON , function(result){
						if( result.hasOwnProperty("errmsg") )
						{
							var info = 	{ "error":  
								{  
									"msg": "#err:用户或手机号已经存在!",  
									"code":"02001"  
								}  };
							response.write( JSON.stringify(info) );
							response.end();
						}else{
							var info = 	{ "success":  
							{  
								"msg": "用户添加成功!",  
								"code":"02000"  
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
//---------------------结束--用户添加函数--结束--------------------//




//---------------------开始--用户删除函数--开始--------------------//
function deleteUser(response, postData)
{
	console.log( "Request handler 'deleteUser' was called." );
	response.writeHead(200, {"Content-Type": "text/plain,charset=utf-8"});
	var postJSON = querystring.parse(postData);
	var mongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/csis';	
	var collectionName = "userInfo";

	//判断操作者和动态令牌是否存在
	if( judgeUserToken(postJSON,response)==false ){  return;  };

	//验证用户名和动态令牌
	var whereStr = {username:postJSON.operatorName,accessToken:postJSON.accessToken};
	dbClient.selectFunc( mongoClient, DB_CONN_STR, collectionName,  whereStr , function(result){
		console.log(result);
		if(result.length>0)
		{
			var whereStr = {username:postJSON.delUsername};
			dbClient.deleteFunc( mongoClient, DB_CONN_STR, collectionName,  whereStr , function(result){
				console.log("删除信息"+result);
				var info = 	{ "success":  
				{  
					"msg": "用户删除成功!",  
					"code":"03000"  
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
//---------------------结束--用户删除函数--结束--------------------//



//---------------------开始--用户更新函数--开始--------------------//
function updateUser(response, postData)
{
	console.log( "Request handler 'updateUser' was called." );
	response.writeHead(200, {"Content-Type": "text/plain,charset=utf-8"});
	var postJSON = querystring.parse(postData);
	var mongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/csis';	
	var collectionName = "userInfo";

	//判断操作者和动态令牌是否存在
	if( judgeUserToken(postJSON,response)==false ){  return;  };

	//验证用户名和动态令牌
	var whereStr = {username:postJSON.operatorName,accessToken:postJSON.accessToken};
	dbClient.selectFunc( mongoClient, DB_CONN_STR, collectionName,  whereStr , function(result){
		console.log(result);

		if(result.length>0)
		{
			//originalName
			var whereStr = {username:postJSON.originalName};
			var updateStr = {$set: postJSON };
			dbClient.updateFunc( mongoClient, DB_CONN_STR, collectionName, whereStr, updateStr,function(result){
				if( result.hasOwnProperty("errmsg") )
				{
					var info = 	{ "error":  
						{  
							"msg": "#err:用户或手机号已经存在!",  
							"code":"04001"  
						}  };
					response.write( JSON.stringify(info) );
					response.end();
				}else{
					var info = 	{ "success":  
					{  
						"msg": "用户信息编辑成功!",  
						"code":"04000"  
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
//---------------------结束--用户更新函数--结束--------------------//




//---------------------开始--用户查询函数--开始--------------------//
function selectUser(response, postData)
{
	console.log( "Request handler 'selectUser' was called." );
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
			delete postJSON.operatorName; 
			delete postJSON.accessToken; 
			dbClient.selectFunc( mongoClient, DB_CONN_STR, collectionName,  postJSON , 
				function(result){
				if( result.length>0 )
				{
					response.write( JSON.stringify(result) );
					response.end();
				}else{
					var info = 	{ "userInfo":  
					{  
						"msg": "没有查询记录!",  
						"code":"05000"  
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
//---------------------结束--用户查询函数--结束--------------------//



//---------------------开始--函数--开始--------------------//

//---------------------结束--函数--结束--------------------//


//---------------------开始--函数--开始--------------------//

//---------------------结束--函数--结束--------------------//



//---------------------开始--模块导出接口声明--开始--------------------//
exports.login = login;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.selectUser = selectUser;
//---------------------结束--模块导出接口声明--结束--------------------//
