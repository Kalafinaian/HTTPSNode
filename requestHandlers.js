var querystring = require("querystring");
var dbClient = require("./Mongo")

function login(response, postData)
{
	console.log( "Request handler 'login' was called." );
	response.writeHead(200, {"Content-Type": "text/plain,charset=utf-8"});
	var postJSON = querystring.parse(postData);
	var MongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/csis';	
	var collectionName = "userInfo";
	console.log(postJSON);
	//var whereStr = JSON.stringify(postJSON);
	//console.log(whereStr);
	if(postJSON!={})
	{
		dbClient.selectFunc( MongoClient, DB_CONN_STR, collectionName,  postJSON , function(result){
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
					response.write( JSON.stringify(result) );
					response.end();
				}	
		});		
	}else{
		var info = 	{ "error":  
		{  
			"msg": "#err:用户名或密码错误!",  
			"code":"01001"  
		}  };
		response.write( JSON.stringify(info) );
		response.end();
	}


}

function addUser(response, postData)
{
	console.log( "Request handler 'upload' was called." );
	response.writeHead(200, {"Content-Type": "text/plain,charset=utf-8"});
	var postJSON = querystring.parse(postData);
	response.write( JSON.stringify(postJSON) );
	response.end();
}


exports.login = login;
exports.addUser = addUser;
