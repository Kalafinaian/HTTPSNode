var httpsModule = require("https");
var fs = require('fs');
var url = require("url");

//---------------------开始--时间戳转日期--开始--------------------//
function add0(m){return m<10?'0'+m:m }
function formatToDate(timeStamp)
{
	//shijianchuo是整数，否则要parseInt转换
	var time = new Date(timeStamp);
	var y = time.getFullYear();
	var m = time.getMonth()+1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return y+'-'+add0(m)+'-'+add0(d);
}
function formatToDetailDate(timeStamp)
{
	//shijianchuo是整数，否则要parseInt转换
	var time = new Date(timeStamp);
	var y = time.getFullYear();
	var m = time.getMonth()+1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return y+'-'+add0(m)+'-'+add0(d) +' '+add0(h)+':'+add0(mm)+':'+add0(s);
}
//---------------------结束--时间戳转日期--结束--------------------//


//---------------------开始--https启动监听，路由分配函数--开始--------------------//
function start(route,handle){
	//https响应回调函数
	function onRequest(request,response)
	{
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " started.");
		console.log("current time is "+ formatToDetailDate(Date.now()));

		request.setEncoding("utf8");
		request.addListener("data", function(postDataChunk)
		{
			postData += postDataChunk;
			//console.log("Received POST data chunk '"+ postDataChunk + "'.");
		});

		request.addListener("end", function() {
			if( request.method.toLowerCase() == 'post' )
			{
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