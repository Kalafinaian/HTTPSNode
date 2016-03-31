var querystring = require("querystring");
var dbClient = require("./Mongo")

function login(response, postData)
{
	console.log( "Request handler 'login' was called." );
	response.writeHead(200, {"Content-Type": "text/plain,charset=utf-8"});
	var postJSON = querystring.parse(postData);
	var mongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/csis';	
	var collectionName = "userInfo";
	console.log(postJSON);
	
	dbClient.selectFunc( mongoClient, DB_CONN_STR, collectionName,  postJSON , function(result){
			if(result.length<=0)
			{
				var info = 	{ "error":  
					{  
						"msg": "#err:用户名或密码错误!",  
						"code":"01001"  
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

function addUser(response, postData)
{
	console.log( "Request handler 'addUser' was called." );
	response.writeHead(200, {"Content-Type": "text/plain,charset=utf-8"});
	var postJSON = querystring.parse(postData);
	var MongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/csis';	
	var collectionName = "userInfo";

	response.write( JSON.stringify(postJSON) );
	response.end();
}


exports.login = login;
exports.addUser = addUser;
