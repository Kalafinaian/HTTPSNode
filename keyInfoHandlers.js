var querystring = require("querystring"); //post原始数据转JSON对象处理模块
var dbClient = require("./Mongo");  //数据库模块

//封装JSON字段不确定参数判断函数---待完成
function judgeKeyID(postJSON,response)
{
	if( !postJSON.hasOwnProperty("keyID") )
	{
		var info = 	{ "success":  
		{  
			"msg": "请输入电子钥匙ID!",  
			"code":"00003"  
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

//---------------------开始--电子钥匙添加函数--开始--------------------//
function addKey(response, postData)
{
	console.log( "Request handler 'addKey' was called." );
	response.writeHead(200, {"Content-Type": "text/plain,charset=utf-8"});
	var postJSON = querystring.parse(postData);
	var mongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/csis';	
	var collectionName = "keyInfo";
	//判断操作者和动态令牌是否存在
	if( judgeUserToken(postJSON,response)==false ){  return;  };
    if( judgeKeyID(postJSON,response)==false ){  return;  };
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
									"msg": "电子钥匙ID已存在!",  
									"code":"12001"  
								}  };
							response.write( JSON.stringify(info) );
							response.end();
						}else{
							var info = 	{ "success":  
							{  
								"msg": "电子钥匙添加成功!",  
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
//---------------------结束--电子钥匙添加函数--结束--------------------//




//---------------------开始--电子钥匙删除函数--开始--------------------//
function deleteKey(response, postData)
{
	console.log( "Request handler 'deleteKey' was called." );
	response.writeHead(200, {"Content-Type": "text/plain,charset=utf-8"});
	var postJSON = querystring.parse(postData);
	var mongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/csis';	
	var collectionName = "keyInfo";

	//判断操作者和动态令牌是否存在
	if( judgeUserToken(postJSON,response)==false ){  return;  };
    if( !postJSON.hasOwnProperty("deleteList") )
    {
		var info = 	{ "error":  
		{  
			"msg": "请输入要删除的电子钥匙数组数据!",  
			"code":"13001"  
		}  };
		response.write( JSON.stringify(info) );
		response.end();
		return;
    }

	//验证电子钥匙名和动态令牌
	var whereStr = {username:postJSON.operatorName,accessToken:postJSON.accessToken};
	dbClient.selectFunc( mongoClient, DB_CONN_STR, "userInfo",  whereStr , function(result){
		console.log(result);
		if(result.length>0)
		{
			//动态令牌有效性判断
			if( judgeTokenTime(result.tokenEndTime,response)==false ){ return; };


			var keyStr = postJSON.deleteList.toString();
			keyStr = keyStr.replace("[","");
			keyStr = keyStr.replace("]","");
			console.log(keyStr);

			var keyList = keyStr.split(",");

			for(var i=0;i<keyList.length;i++)
			{
				console.log(keyList[i]);
				console.log("删除的电子钥匙： "+keyList[i]);
				var whereStr = {keyID:keyList[i].toString()};
				dbClient.deleteFunc( mongoClient, DB_CONN_STR, collectionName,  whereStr , function(result){
					console.log("删除信息"+result);
				});	
			}
			var info = 	{ "success":  
			{  
				"msg": "电子钥匙删除成功!",  
				"code":"13000"  
			}  };
			response.write( JSON.stringify(info) );
			response.end();
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
//---------------------结束--电子钥匙删除函数--结束--------------------//



//---------------------开始--电子钥匙更新函数--开始--------------------//
function updateKey(response, postData)
{
	console.log( "Request handler 'updateKey' was called." );
	response.writeHead(200, {"Content-Type": "text/plain,charset=utf-8"});
	var postJSON = querystring.parse(postData);
	var mongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/csis';	
	var collectionName = "keyInfo";

	//判断操作者和动态令牌是否存在
	if( judgeUserToken(postJSON,response)==false ){  return;  };
    if( judgeKeyID(postJSON,response)==false ){  return;  };
	//验证电子钥匙名和动态令牌
	var whereStr = {username:postJSON.operatorName,accessToken:postJSON.accessToken};
	dbClient.selectFunc( mongoClient, DB_CONN_STR, "userInfo",  whereStr , function(result){
		console.log(result);

		if(result.length>0)
		{
			//动态令牌有效性判断
			if( judgeTokenTime(result.tokenEndTime,response)==false ){ return; };

			//originalName
			var whereStr = {keyID:postJSON.originalKeyID};
			delete postJSON.accessToken;
			delete postJSON.operatorName;
			delete postJSON.originalKeyID;
			var updateStr = {$set: postJSON };
			dbClient.updateFunc( mongoClient, DB_CONN_STR, collectionName, whereStr, updateStr,function(result){
				if( result.hasOwnProperty("errmsg") )
				{
					var info = 	{ "error":  
						{  
							"msg": "电子钥匙ID已存在!",  
							"code":"14001"  
						}  };
					response.write( JSON.stringify(info) );
					response.end();
				}else{
					var info = 	{ "success":  
					{  
						"msg": "电子钥匙信息编辑成功!",  
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
//---------------------结束--电子钥匙更新函数--结束--------------------//




//---------------------开始--电子钥匙查询函数--开始--------------------//
function selectKey(response, postData)
{
	console.log( "Request handler 'selectKey' was called." );
	response.writeHead(200, {"Content-Type": "text/plain,charset=utf-8"});
	var postJSON = querystring.parse(postData);
	var mongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/csis';	
	var collectionName = "keyInfo";
	//判断操作者和动态令牌是否存在
	if( judgeUserToken(postJSON,response)==false ){  return;  };
	
	console.log(postJSON);
	//验证电子钥匙名和动态令牌
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
					var json = {success:result};

					response.write( JSON.stringify(json) );
					response.end();
				}else{
					var info = 	{ "error":  
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
//---------------------结束--电子钥匙查询函数--结束--------------------//



//---------------------开始--downloadKey函数--开始--------------------//
function downloadKey(response, postData)
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
			dbClient.selectFunc( mongoClient, DB_CONN_STR, "keyInfo",  postJSON , 
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
						            caption:'电子钥匙ID',
						            type:'string',
						        },
						        {
						            caption:'有效省级地域',
						            type:'string',
						        },
						        {
						            caption:'有效市级地域',
						            type:'string'
						        },
						        {
						            caption:'有效区级地域',
						             type:'string'              
						        }
						];
						conf.rows = [];
						for(var i=0;i<result.length;i++)
						{
							conf.rows[i] = [result[i].keyID, result[i].managementProvince,
							result[i].managementCity, result[i].managementArea ];
						}

						var result = nodeExcel.execute(conf);
						console.log('export successfully!');
						fs.writeFileSync('/usr/share/nginx/MBS_WebSourceCode/'+fileName+'.xlsx', result, 'binary');
						var info = 	{ "success":  
						{  
							"url": 'https://www.smartlock.top/'+fileName+'.xlsx',  
							"code":"16000"  
						}  };
						response.write( JSON.stringify(info) );
						response.end();
				}else{
					var info = 	{ "error":  
					{  
						"msg": "没有数据记录!",  
						"code":"16001"  
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
//---------------------结束--downloadKey函数--结束--------------------//




//---------------------开始--电子钥匙日志查询函数--开始--------------------//
function queryKeyLog(response, postData)
{
	console.log( "Request handler 'queryKeyLog' was called." );
	response.writeHead(200, {"Content-Type": "text/plain,charset=utf-8"});
	var postJSON = querystring.parse(postData);
	var mongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/csis';	

	//判断操作者和动态令牌是否存在
	if( judgeUserToken(postJSON,response)==false ){  return;  };
	
	console.log(postJSON);

	//验证用户名和动态令牌
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
			var mstartTime = { "taskStartTime":{$gte:parseInt( postJSON.startTime) } };
			var mendTime = { "taskEndTime":{$lte:parseInt( postJSON.endTime) } };

			var whereStr  = {};

			if( postJSON.hasOwnProperty('startTime') )
			{
				whereStr.taskStartTime = mstartTime.taskStartTime;
				delete postJSON.startTime; 
			}

			if( postJSON.hasOwnProperty('endTime') )
			{
				whereStr.taskEndTime = mstartTime.taskEndTime;
				delete postJSON.endTime; 
			}

			if( postJSON.hasOwnProperty('keyID') )
			{
				whereStr.applicantKeyID = postJSON.keyID;   
			}


			if( postJSON.hasOwnProperty('keyManagementProvince') )
			{
				whereStr.keyManagementProvince = postJSON.keyManagementProvince;  
			}

			if( postJSON.hasOwnProperty('keyManagementCity') )
			{
				whereStr.keyManagementCity = postJSON.keyManagementCity;  
			}


			if( postJSON.hasOwnProperty('keyManagementArea') )
			{
				whereStr.keyManagementArea = postJSON.keyManagementArea;  
			}


			//{"taskStartTime":{$gte:parseInt(startTime)}}   {"taskEndTime":{$lte:parseInt(endTime) }}
			dbClient.selectFunc( mongoClient, DB_CONN_STR, "taskInfo",  whereStr , 
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
						"code":"26001"  
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
//---------------------结束--电子钥匙日志查询函数--结束--------------------//




//---------------------开始--电子钥匙日志Excel表格下载接口--开始--------------------//
function downloadKeyLog(response, postData)
{
	console.log( "Request handler 'downloadKeyLog' was called." );
	response.writeHead(200, {"Content-Type": "text/plain,charset=utf-8"});
	var postJSON = querystring.parse(postData);
	var mongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/csis';	

	//判断操作者和动态令牌是否存在
	if( judgeUserToken(postJSON,response)==false ){  return;  };
	
	console.log(postJSON);

	//验证用户名和动态令牌
	var whereStr = {username:postJSON.operatorName,accessToken:postJSON.accessToken};
	var fileName = postJSON.operatorName + "电子钥匙日志";

	console.log(whereStr);
	dbClient.selectFunc( mongoClient, DB_CONN_STR, "userInfo",  whereStr , function(result){
		console.log(result);
		if(result.length>0)
		{
			//动态令牌有效性判断
			if( judgeTokenTime(result.tokenEndTime,response)==false ){ return; };

			delete postJSON.operatorName; 
			delete postJSON.accessToken; 
			var mstartTime = { "taskStartTime":{$gte:parseInt( postJSON.startTime) } };
			var mendTime = { "taskEndTime":{$lte:parseInt( postJSON.endTime) } };

			var whereStr  = {};

			if( postJSON.hasOwnProperty('startTime') )
			{
				whereStr.taskStartTime = mstartTime.taskStartTime;
				delete postJSON.startTime; 
			}

			if( postJSON.hasOwnProperty('endTime') )
			{
				whereStr.taskEndTime = mstartTime.taskEndTime;
				delete postJSON.endTime; 
			}

			if( postJSON.hasOwnProperty('keyID') )
			{
				whereStr.applicantKeyID = postJSON.keyID;   
			}

			if( postJSON.hasOwnProperty('keyManagementProvince') )
			{
				whereStr.keyManagementProvince = postJSON.keyManagementProvince;  
			}

			if( postJSON.hasOwnProperty('keyManagementCity') )
			{
				whereStr.keyManagementCity = postJSON.keyManagementCity;  
			}


			if( postJSON.hasOwnProperty('keyManagementArea') )
			{
				whereStr.keyManagementArea = postJSON.keyManagementArea;  
			}


			//{"taskStartTime":{$gte:parseInt(startTime)}}   {"taskEndTime":{$lte:parseInt(endTime) }}
			dbClient.selectFunc( mongoClient, DB_CONN_STR, "taskInfo",  whereStr , 
				function(result){
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
						            caption:'电子钥匙ID',
						            type:'string',
						        },
						        {
						            caption:'任务ID',
						            type:'string',
						        },
 						        {
						            caption:'电子钥匙有效省级区域',
						            type:'string',
						        },
						        {
						            caption:'电子钥匙有效市级区域',
						            type:'string',
						        },
						        {
						            caption:'电子钥匙有效地级区域',
						            type:'string',
						        },
						        {
						            caption:'任务申请人',
						            type:'string'
						        },
						        {
						            caption:'申请人联系方式',
						            type:'string'
						        },
						        {
						            caption:'任务申请描述',
						             type:'string'              
						        },
						        {
						            caption:'任务起始时间',
						             type:'string'              
						        },
						        {
						            caption:'任务终止时间',
						             type:'string'              
						        }

						];
						conf.rows = [];


						for(var i=0;i<result.length;i++)
						{

							var startDate = new Date(result[i].taskStartTime * 1000); 
							var endDate = new Date(result[i].taskEndTime * 1000);

							var startDateTime = (startDate.getFullYear()) + "-" + (startDate.getMonth() + 1) + "-" +
							(startDate.getDate()) + "   " + 
							 (startDate.getHours()) + ":" + (startDate.getMinutes()) + ":" + (startDate.getSeconds());

							var endDateTime  = (endDate.getFullYear()) + "-" + (endDate.getMonth() + 1) + "-" +(endDate.getDate()) + "   " + (endDate.getHours()) + ":" + (endDate.getMinutes()) + ":" + (endDate.getSeconds());

							conf.rows[i] = [result[i].stationID, result[i].stationAddress,result[i].applicantKeyID, result[i].taskID,
							result[i].keyManagementProvince, result[i].keyManagementCity, result[i].keyManagementArea,
							result[i].applicantName, result[i].applicantPhone, result[i].applyDescription,
							startDateTime
							, endDateTime ];
						}

						var result = nodeExcel.execute(conf);
						console.log('export Log successfully!');
						fs.writeFileSync('/usr/share/nginx/MBS_WebSourceCode/'+fileName+'.xlsx', result, 'binary');
						var info = 	{ "success":  
						{  
							"url": 'https://www.smartlock.top/'+fileName+'.xlsx',  
							"code":"27000"  
						}  };
						response.write( JSON.stringify(info) );
						response.end();
				}else{
					var info = 	{ "error":  
					{  
						"msg": "没有查询记录!",  
						"code":"27001"  
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
//---------------------结束--电子钥匙日志Excel表格下载接口--结束--------------------//


//---------------------开始--模块导出接口声明--开始--------------------//
exports.addKey = addKey;
exports.updateKey = updateKey;
exports.deleteKey = deleteKey;
exports.selectKey = selectKey;
exports.downloadKey = downloadKey;
exports.queryKeyLog = queryKeyLog;
exports.downloadKeyLog = downloadKeyLog;
//---------------------结束--模块导出接口声明--结束--------------------//
