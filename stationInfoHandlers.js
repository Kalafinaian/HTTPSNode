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
				//动态令牌有效性判断
				if( judgeTokenTime(result.tokenEndTime,response)==false ){ return; };
				delete postJSON.accessToken;
				delete postJSON.operatorName;
				//插入请求数据
				dbClient.insertFunc( mongoClient, DB_CONN_STR, collectionName,  postJSON , function(result){
						if( result.hasOwnProperty("errmsg") )
						{
							var info = 	{ "error":  
								{  
									"msg": "基站ID或锁ID已存在!",  
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

	console.log(postJSON);

	if( !postJSON.hasOwnProperty("deleteList") || !postJSON.hasOwnProperty("operatorName") || !postJSON.hasOwnProperty("accessToken"))
	{
		var info = 	{ "error":  
		{  
			"msg": "参数格式错误!",  
			"code":"08001"  
		}  };
		response.write( JSON.stringify(info) );
		response.end();
		return;
	}

	var mongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/csis';	
	var collectionName = "stationInfo";

	//判断操作者和动态令牌是否存在
	if( judgeUserToken(postJSON,response)==false ){  return;  };

	//验证用户名和动态令牌
	var whereStr = {username:postJSON.operatorName,accessToken:postJSON.accessToken};
	dbClient.selectFunc( mongoClient, DB_CONN_STR, "userInfo",  whereStr , function(result){
		console.log(result);
		if(result.length>0)
		{
			//动态令牌有效性判断
			var stationStr = postJSON.deleteList.toString();
			stationStr = stationStr.replace("[","");
			stationStr = stationStr.replace("]","");
			console.log(stationStr);

			var stationList = stationStr.split(",");

			for(var i=0;i<stationList.length;i++)
			{
				console.log(stationList[i]);
				console.log("删除的基站： "+stationList[i]);
				var whereStr = {stationID:stationList[i].toString()};
				dbClient.deleteFunc( mongoClient, DB_CONN_STR, collectionName,  whereStr , function(result){
					console.log("删除信息"+result);
					if(i==stationList.length-1)
					{
						var info = 	{ "success":  
						{  
							"msg": "基站删除成功!",  
							"code":"08000"  
						}  };
						response.write( JSON.stringify(info) );
						response.end();
					}
				});	
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
			//动态令牌有效性判断
			if( judgeTokenTime(result.tokenEndTime,response)==false ){ return; };
			//originalName
			var whereStr = {stationID:postJSON.originalStationID};
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
			//动态令牌有效性判断
			if( judgeTokenTime(result.tokenEndTime,response)==false ){ return; };

			delete postJSON.operatorName; 
			delete postJSON.accessToken; 
			dbClient.selectFunc( mongoClient, DB_CONN_STR, collectionName,  postJSON , 
				function(result){
				if( result.length>0 )
				{
					var json = {success:result};
					response.write( JSON.stringify(json) );
					response.end();
				}else{
					var info = 	{ "error":  
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


//---------------------开始--Excel表格下载接口--开始--------------------//
function downloadStation(response, postData)
{
	console.log( "Request handler 'downloadUser' was called." );
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
			dbClient.selectFunc( mongoClient, DB_CONN_STR, "stationInfo",  postJSON , 
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
						            caption:'基站ID',
						            type:'string',
						        },
						        {
						            caption:'基站地址',
						            type:'string',
						        },
						        {
						            caption:'基站负责人',
						            type:'string'
						        },
						        {
						            caption:'基站负责人电话',
						             type:'string'              
						        }
						];
						conf.rows = [];
						for(var i=0;i<result.length;i++)
						{
							conf.rows[i] = [result[i].stationID, result[i].address,
							result[i].chargePerson, result[i].chargePhone ];
						}

						var result = nodeExcel.execute(conf);
						console.log('export successfully!');
						fs.writeFileSync('/usr/share/nginx/MBS_WebSourceCode/'+fileName+'.xlsx', result, 'binary');
						var info = 	{ "success":  
						{  
							"url": 'https://www.smartlock.top/'+fileName+'.xlsx',  
							"code":"11000"  
						}  };
						response.write( JSON.stringify(info) );
						response.end();
				}else{
					var info = 	{ "error":  
					{  
						"msg": "没有数据记录!",  
						"code":"11001"  
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
//---------------------结束--Excel表格下载接口--结束--------------------//



//---------------------开始--模块导出接口声明--开始--------------------//
exports.addStation = addStation;
exports.updateStation = updateStation;
exports.deleteStation = deleteStation;
exports.selectStation = selectStation;
exports.downloadStation = downloadStation;
//---------------------结束--模块导出接口声明--结束--------------------//
