var httpsModule = require("https");
var fs = require('fs');
var url = require("url");
var formidable = require('formidable');
var util = require('util');
var uuid = require('node-uuid');

//---------------------开始--https启动监听，路由分配函数--开始--------------------//
function onRequest(request,response)
{
	var postData = "";
	var pathname = url.parse(request.url).pathname;
	console.log("Request for " + pathname + " started.");
	//response.writeHead(200, {"Content-Type": "text/plain,charset=utf-8"});
	//var exec = require('child_process').exec; 
	// var cmdStr = 'rm *.xlsx';
	// exec(cmdStr);

    try
    {
		if( pathname == '/uploadStationFile' && request.method.toLowerCase() == 'post' )
		{
			console.log("uploadStationFile start upload");

			//创建上传表单
			var form = new formidable.IncomingForm();
			//设置编辑
			form.encoding = 'utf-8';
			//设置上传目录
			form.uploadDir = "/usr/share/NodeJS/Node.js/upload/";
			form.keepExtensions = true;
			//文件大小
			form.maxFieldsSize = 1024 * 1024 * 1024;
			form.parse(request, function (err, fields, files) {
				if(err) {
					response.write(err);
					//response.end();
					return;
				}

				console.log(files);

				try
				{
					//移动的文件目录
					//var newPath = form.uploadDir + files.file.name;
					var newPath = form.uploadDir + '基站数据批量导入.xlsx';
					fs.renameSync(files.file.path, newPath);

					// cmdStr = 'mv '+ files.file.name + ' 基站数据批量导入.xlsx';
					// exec(cmdStr);
					response.write('<html>');
					response.write('<head>');
					response.write(
					'<meta http-equiv=\"refresh\" content=\"0; url=https://www.smartlock.top/my_smartlock/html/stationManage.html?result=success\">');
					response.write('</head>');
					response.write('</html>');
					response.end();
					return;
				}catch(e)
				{
					response.write('<html>');
					response.write('<head>');
					response.write(
					'<meta http-equiv=\"refresh\" content=\"0; url=https://www.smartlock.top/my_smartlock/html/stationManage.html?result=failure\">');
					response.write('</head>');
					response.write('</html>');
					response.end();
					return;
				}

			});
		}else if( pathname == '/uploadKeyFile' && request.method.toLowerCase() == 'post' ){
				console.log("uploadKeyFile start upload");

				//创建上传表单
				var form = new formidable.IncomingForm();
				//设置编辑
				form.encoding = 'utf-8';
				//设置上传目录
				form.uploadDir = "/usr/share/NodeJS/Node.js/upload/";
				form.keepExtensions = true;
				//文件大小
				form.maxFieldsSize = 1024 * 1024 * 1024;
				form.parse(request, function (err, fields, files) {
					if(err) {
						response.write(err);
						//response.end();
						return;
					}

					console.log(files);

					// cmdStr = 'mv '+ files.file.name + ' 电子钥匙数据批量导入.xlsx';
					// exec(cmdStr);
					try
					{
						//移动的文件目录
						//var newPath = form.uploadDir + files.file.name;
						var newPath = form.uploadDir + '电子钥匙数据批量导入.xlsx';
						fs.renameSync(files.file.path, newPath);

						// cmdStr = 'mv '+ files.file.name + ' 电子钥匙数据批量导入.xlsx';
						// exec(cmdStr);
						response.write('<html>');
						response.write('<head>');
						response.write(
						'<meta http-equiv=\"refresh\" content=\"0; url=https://www.smartlock.top/my_smartlock/html/keyManage.html?result=success\">');
						response.write('</head>');
						response.write('</html>');
						response.end();
						return;
					}catch(e)
					{
						response.write('<html>');
						response.write('<head>');
						response.write(
						'<meta http-equiv=\"refresh\" content=\"0; url=https://www.smartlock.top/my_smartlock/html/keyManage.html?result=failure\">');
						response.write('</head>');
						response.write('</html>');
						response.end();
						return;
					}
				});

		}else{

			if( pathname == '/uploadStationFile' )
			{
				response.write('<html>');
				response.write('<head>');
				response.write(
				'<meta http-equiv=\"refresh\" content=\"0; url=https://www.smartlock.top/my_smartlock/html/stationManage.html?result=failure\">');
				response.write('</head>');
				response.write('</html>');
				response.end();   
			}else{
				response.write('<html>');
				response.write('<head>');
				response.write(
				'<meta http-equiv=\"refresh\" content=\"0; url=https://www.smartlock.top/my_smartlock/html/keyManage.html?result=failure\">');
				response.write('</head>');
				response.write('</html>');
				response.end();   	
			}

		}

    }catch(e)
    {
			if( pathname == '/uploadStationFile' )
			{
				response.write('<html>');
				response.write('<head>');
				response.write(
				'<meta http-equiv=\"refresh\" content=\"0; url=https://www.smartlock.top/my_smartlock/html/stationManage.html?result=failure\">');
				response.write('</head>');
				response.write('</html>');
				response.end();   
			}else{
				response.write('<html>');
				response.write('<head>');
				response.write(
				'<meta http-equiv=\"refresh\" content=\"0; url=https://www.smartlock.top/my_smartlock/html/keyManage.html?result=failure\">');
				response.write('</head>');
				response.write('</html>');
				response.end();   	
			}
    }



}

var options = {
     key: fs.readFileSync('/etc/nginx/server.key'),
     cert: fs.readFileSync('/etc/nginx/server.crt')
};

var https = httpsModule.createServer(options, onRequest);

https.listen(8080, function(err){  
    console.log("https listening on port: 8080");
});
console.log("server has started");


//---------------------结束--https启动监听，路由分配函数--结束--------------------//

