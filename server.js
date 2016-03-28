var http = require("http");
url = require("url");

function start(route,handle){
	function onRequest(request,response)
	{
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		request.setEncoding("utf8");
		request.addListener("data", function(postDataChunk){
			postData += postDataChunk;
			console.log("Received POST data chunk '"+ postDataChunk + "'.");
		});
		request.addListener("end", function() {
			route(handle, pathname, response, postData);
		});
	}
	//request、response是http模块的内部成员
	//参考http://www.jb51.net/article/59810.htm
	http.createServer(onRequest).listen(8000);
    console.log("server has started");
}

exports.start = start;