var xlsx = require("node-xlsx");
var dbClient = require("./Mongo");  //数据库模块
var fs = require('fs');
function trimStr(str){return str.replace(/\s+/g,"");}

function importStationFromExcel( importFileName, response )
{
	if( importFileName.indexOf(".csv") < 0 /*!= (importFileName.length-4)*/ )
	{
				var failedInfo = 	{ "error":  
				{  
					"msg": "数据导入失败,文件类型错误",  
					"code":"28007"  
				}  };
				
				response.write( JSON.stringify(failedInfo) );
				response.end();
				return;	    
	}

	// 判断文件是否存在
	fs.exists( "/usr/share/NodeJS/Node.js/upload/"+importFileName , function( exists ){
	    if(exists == false )
	    {
				var failedInfo = 	{ "error":  
				{  
					"msg": "数据导入失败,指定文件不存在",  
					"code":"28006"  
				}  };
				
				response.write( JSON.stringify(failedInfo) );
				response.end();
				return;	    	
	    }

		try 
		{
			// var excelObj  = xlsx.parse( "/usr/share/NodeJS/Node.js/upload/"+importFileName );
			// console.log(excelObj );

			// var sheetData = excelObj[0].data; 
			// var rowCount = sheetData.length;

			// console.log("数据长度： " + rowCount);

			// var firstRowData = sheetData[0]; 
			// //excel格式判断
			// if( firstRowData[0].toString() != '基站ID' || firstRowData[1].toString() != '基站地址' || firstRowData[2].toString() != '锁ID' ||
			// firstRowData[3].toString() != '基站负责人' || firstRowData[4].toString() != '基站所属省份' || firstRowData[5].toString() != '基站所属市级区域'  || 
			// firstRowData[6].toString() != '基站所属地级区域' || firstRowData[7].toString() != '基站审批人' )
			// {
			// 		var failedInfo = 	{ "error":  
			// 		{  
			// 			"msg": "数据导入失败,基站数据格式错误",  
			// 			"code":"28002"  
			// 		}  };
					
			// 		response.write( JSON.stringify(failedInfo) );
			// 		response.end();
			// 		return;
			// }

			// var mongoClient = require('mongodb').MongoClient;
			// var DB_CONN_STR = 'mongodb://127.0.0.1:27017/csis';	
			// var collectionName = "stationInfo";

			// //逐条插入数据到数据库
			// for (var i = 1; i < rowCount; i++) 
			// {
			// 	var rowData = sheetData[i]; 
			// 	var columnCount = rowData.length;
			// 	var field = {};
			// 	console.log( rowData)
			// 	field.stationID  = trimStr( rowData[0].toString() );
			// 	field.address  = trimStr( rowData[1].toString() );
			// 	field.lockID  = trimStr( rowData[2].toString() );
			// 	field.chargePerson  = trimStr( rowData[3].toString() );
			// 	field.managementProvince  = trimStr( rowData[4].toString() );
			// 	field.managementCity  = trimStr( rowData[5].toString() );
			// 	field.managementArea  = trimStr( rowData[6].toString() );
			// 	field.approvalPerson  = trimStr( rowData[7].toString() );
			// 	field.doorStatus = "closed";
			// 	dbClient.insertFunc(mongoClient, DB_CONN_STR, collectionName,field,function(result){
			// 							console.log("基站数据导入结果 "+result);	
			// 	});
			// }

			// var successInfo = 	{ "success":  
			// {  
			// 	"msg": "数据导入成功,重复数据和包含系统之外的工作人员条目已剔除",  
			// 	"code":"28000"  
			// }  };
			
			// response.write( JSON.stringify(successInfo) );
			// response.end();
			//第一步：node调用shell完成备份
			var exec = require('child_process').exec; 
			var cmdStr = 'mongoimport -d csis -c stationInfo --headerline --type csv  --file ';
			var fileName = "/usr/share/NodeJS/Node.js/upload/"+importFileName;
			cmdStr = cmdStr + fileName;
			exec(cmdStr, function callback(error, stdout, stderr) {
				console.log(stdout);
				var Info = 	{ "success":  
				{  
					"msg": "数据已经导入，请查看导入结果", 
					"description":error+stdout+stderr, 
					"code":"28007"  
				}  };
				response.write( JSON.stringify(Info) );
				response.end();
			});


		} catch(e)
		{ 
				var failedInfo = 	{ "error":  
				{  
					"msg": "数据导入失败,文件内部错误",  
					"code":"28008"  
				}  };
				
				response.write( JSON.stringify(failedInfo) );
				response.end();
		}

	});



	
}



function importKeyFromExcel( importFileName, response )
{
	if( importFileName.indexOf(".xlsx") != (importFileName.length-5) )
	{
				var failedInfo = 	{ "error":  
				{  
					"msg": "数据导入失败,文件类型错误",  
					"code":"28007"  
				}  };
				
				response.write( JSON.stringify(failedInfo) );
				response.end();
				return;	    
	}


	// 判断文件是否存在
	fs.exists( "/usr/share/NodeJS/Node.js/upload/"+importFileName , function( exists ){
	    if(exists == false )
	    {
				var failedInfo = 	{ "error":  
				{  
					"msg": "数据导入失败,指定文件不存在",  
					"code":"28006"  
				}  };
				
				response.write( JSON.stringify(failedInfo) );
				response.end();
				return;	    	
	    }

		try 
		{
			var excelObj  = xlsx.parse(  "/usr/share/NodeJS/Node.js/upload/"+importFileName );
			console.log(excelObj );

			//[ { name: 'Sheet1', data: [ [Object] ] } ]

			var sheetData = excelObj[0].data; 
			var rowCount = sheetData.length;
			console.log("数据长度： " + rowCount);

			var firstRowData = sheetData[0]; 
			//excel格式判断
			if( firstRowData[0].toString() != '电子钥匙ID' || 
			firstRowData[1].toString() != '电子钥匙管理省份' || 
			firstRowData[2].toString() != '电子钥匙管理市级区域' ||
			firstRowData[3].toString() != '电子钥匙管理地级区域' ||
			firstRowData[4].toString() != '网格编号' )
			{
					var failedInfo = 	{ "error":  
					{  
						"msg": "数据导入失败,电子钥匙数据格式错误",  
						"code":"28004"  
					}  };
					
					response.write( JSON.stringify(failedInfo) );
					response.end();
					return;
			}

			var mongoClient = require('mongodb').MongoClient;
			var DB_CONN_STR = 'mongodb://127.0.0.1:27017/csis';	
			var collectionName = "keyInfo";

			//逐条插入数据到数据库
			for (var i = 1; i < rowCount; i++) 
			{
				var rowData = sheetData[i]; 
				console.log( "第i行数据 "+ rowData)
				var columnCount = rowData.length;
				var field = {};

				field.keyID  = trimStr( rowData[0].toString() );
				field.managementProvince  = trimStr( rowData[1].toString() );
				field.managementCity  = trimStr( rowData[2].toString() );
				field.managementArea  = trimStr( rowData[3].toString() );
				field.gridID =  trimStr( rowData[4].toString() );
				//要注意异步编程的特性
				dbClient.insertFunc( mongoClient, DB_CONN_STR, collectionName,  field, function(result){
					console.log("电子钥匙数据导入结果 "+result);	
				});	
				console.log("导入的数据 " + field);	
			}

			var successInfo = 	{ "success":  
			{  
				"msg": "数据导入成功,重复数据已剔除",  
				"code":"28000"  
			}  };
			
			response.write( JSON.stringify(successInfo) );
			response.end();

		} catch(e)
		{ 
				var failedInfo = 	{ "error":  
				{  
					"msg": "数据导入失败,文件内部错误",  
					"code":"28008"  
				}  };
				
				response.write( JSON.stringify(failedInfo) );
				response.end();
		}
	});	  
}



function importDataFromCSV( importFileName, importCollectionName , response )
{
	if( importFileName.indexOf(".csv") < 0 /*!= (importFileName.length-4)*/ )
	{
				var failedInfo = 	{ "error":  
				{  
					"msg": "数据导入失败,文件类型错误",  
					"code":"48007"  
				}  };
				
				response.write( JSON.stringify(failedInfo) );
				response.end();
				return;	    
	}

	// 判断文件是否存在
	fs.exists( "/usr/share/NodeJS/Node.js/upload/"+importFileName , function( exists ){
	    if(exists == false )
	    {
				var failedInfo = 	{ "error":  
				{  
					"msg": "数据导入失败,指定文件不存在",  
					"code":"48006"  
				}  };
				
				response.write( JSON.stringify(failedInfo) );
				response.end();
				return;	    	
	    }

		try 
		{

			var exec = require('child_process').exec; 
			var cmdStr = 'mongoimport -d csis -c ' + importCollectionName + ' --headerline --type csv  --file ';
			var fileName = "/usr/share/NodeJS/Node.js/upload/"+importFileName;
			cmdStr = cmdStr + fileName;
			//console.log(importCollectionName+" import get in");
			//console.log(cmdStr+" ");
			var dbClient = require("./Mongo");  //数据库模块
			var mongoClient = require('mongodb').MongoClient;
			var DB_CONN_STR = 'mongodb://127.0.0.1:27017/csis';	
			exec(cmdStr, function callback(error, stdout, stderr) {
				console.log(stdout);
				var Info = 	{ "success":  
				{  
					"msg": "数据已经导入，请查看导入结果", 
					"description":error+stdout+stderr, 
					"code":"48007"  
				}  };
				response.write( JSON.stringify(Info) );
				response.end();

				// if(importCollectionName == "userInfo")
				// {
				// 		// var dbClient = require("./Mongo");  //数据库模块
				// 		// var mongoClient = require('mongodb').MongoClient;
				// 		// var DB_CONN_STR = 'mongodb://127.0.0.1:27017/csis';	
				// 		dbClient.selectFunc( mongoClient,DB_CONN_STR,"userInfo", {} ,function(result){
				// 		    for(var i=0;i<result.length;i++)
				// 		    {
				// 				try{
				// 		        dbClient.updateMultiFunc( mongoClient,DB_CONN_STR,"userInfo", {companyID:result[i].companyID},
				// 		            {$set:{companyID:result[i].companyID.toString(),
				// 		            	phone:''+result[i].phone}});    

				// 		        dbClient.updateMultiFunc( mongoClient,DB_CONN_STR,"userInfo", {userType:result[i].userType},
				// 		            {$set:{userType:result[i].userType.toString()}});       


				// 		        dbClient.updateMultiFunc( mongoClient,DB_CONN_STR,"userInfo", {password:result[i].password},
				// 		            {$set:{password:result[i].password.toString()}});   


				// 		        dbClient.updateMultiFunc( mongoClient,DB_CONN_STR,"userInfo", {companyCode:result[i].companyCode},
				// 		            {$set:{companyCode:result[i].companyCode.toString()}});    

				// 		        dbClient.updateMultiFunc( mongoClient,DB_CONN_STR,"userInfo", {phone:result[i].phone},
				// 		            {$set:{phone:''+result[i].phone}});  
				// 		        } catch(e){};      
				// 		    }
				// 		});
				// }else if(importCollectionName=="lockInfo"){
				// 		dbClient.selectFunc( mongoClient,DB_CONN_STR,importCollectionName,{},function(result){
				// 		    for(var i=0;i<result.length;i++)
				// 		    {
				// 		    	try{
				// 		    	//console.log(typeof())
				// 		    	//遍历元素
				// 		        dbClient.updateMultiFunc( 
				// 		        	mongoClient,
				// 		        	DB_CONN_STR,importCollectionName, 
				// 		        	{lockID:result[i].lockID},
				// 		            {$set:{stationID:''+result[i].stationID}
				// 		        }); 
				// 				}catch(e){};	
				// 		    }
				// 		});					
				// }else
				// {
				// 	dbClient.selectFunc( mongoClient,DB_CONN_STR,importCollectionName,{},function(result){
				// 	    for(var i=0;i<result.length;i++)
				// 	    {
				// 	    	for (var prop in result[i])  
				// 			{     
				// 		    	try{
				// 		    	//console.log(typeof())
				// 		        dbClient.updateMultiFunc( 
				// 		        	mongoClient,
				// 		        	DB_CONN_STR,importCollectionName, 
				// 		        	{lockID:result[i].lockID},
				// 		            {$set:{stationID:''+result[i].stationID}
				// 		        }); 
				// 				}catch(e){};	  
				// 			}  	
				// 	    }
				// 	});						

				// }


			});
		} catch(e)
		{ 
				var failedInfo = 	{ "error":  
				{  
					"msg": "数据导入失败,文件内部错误",  
					"code":"48008"  
				}  };
				
				response.write( JSON.stringify(failedInfo) );
				response.end();
		}

	});



	
}


//---------------------开始--模块导出接口声明--开始--------------------//
exports.importStationFromExcel = importStationFromExcel;
exports.importKeyFromExcel = importKeyFromExcel;
exports.importDataFromCSV = importDataFromCSV;
//---------------------结束--模块导出接口声明--结束--------------------//