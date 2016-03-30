var httpsModule = require("https");
var fs = require('fs');
var url = require("url");

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
			route(handle, pathname, response, postData);
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


exports.start = start;