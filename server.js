var httpsModule = require("https");
var fs = require('fs');
var url = require("url");

//---------------------开始--https启动监听，路由分配函数--开始--------------------//
function start(route,handle){
	//https响应回调函数
	function onRequest(request,response)
	{
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " started.");

		request.setEncoding("utf8");
		request.addListener("data", function(postDataChunk)
		{
			postData += postDataChunk;
			console.log("Received POST data chunk '"+ postDataChunk + "'.");
		});

		request.addListener("end", function() {
			if(postData.length<4)
			{
				var info = 	{ "error":  
				{  
					"msg": "#err:参数错误",  
					"code":"01000"  
				}  };
				response.write( JSON.stringify(info) );
				response.end();
			}else{
				route(handle, pathname, response, postData);
			}	
		});
		
	}

	var options = {
	     key: fs.readFileSync('/etc/nginx/server.key'),
	     cert: fs.readFileSync('/etc/nginx/server.crt')
	};

	var https = httpsModule.createServer(options, onRequest);

	https.listen(8000, function(err){  
        console.log("https listening on port: 8000");
	});
    console.log("server has started");

}
//---------------------结束--https启动监听，路由分配函数--结束--------------------//



//---------------------开始--模块导出接口声明--开始--------------------//
exports.start = start;
//---------------------结束--模块导出接口声明--结束--------------------//