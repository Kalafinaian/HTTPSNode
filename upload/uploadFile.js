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

    try
    {
		if( pathname == '/uploadFile' && request.method.toLowerCase() == 'post' )
		{
			console.log("start upload");

			//创建上传表单
			var form = new formidable.IncomingForm();
			//设置编辑
			form.encoding = 'utf-8';
			//设置上传目录
			form.uploadDir = "./";
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


				//移动的文件目录
				var newPath = form.uploadDir + files.file.name;
				fs.renameSync(files.file.path, newPath);


				
				
				response.write('<html>');
				response.write('<head>');
				response.write(
				'<meta http-equiv=\"refresh\" content=\"0; url=https://www.smartlock.top/my_smartlock/html/stationManage.html?result=success\">');
				response.write('</head>');
				response.write('</html>');
				response.end();
				return;

			});
		}

    }catch(e)
    {
				response.write('<html>');
				response.write('<head>');
				response.write(
				'<meta http-equiv=\"refresh\" content=\"0; url=https://www.smartlock.top/my_smartlock/html/stationManage.html?result=failure\">');
				response.write('</head>');
				response.write('</html>');
				response.end();   	
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

