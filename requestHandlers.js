var querystring = require("querystring");

function start(response, postData)
{
	console.log( "Request handler 'start' was called." );
	response.writeHead(200, {"Content-Type": "text/plain,charset=utf-8"});
	var postJSON = querystring.parse(postData);
	response.write( JSON.stringify(postJSON) );
	response.end();
}

function upload(response, postData)
{
	console.log( "Request handler 'upload' was called." );
	response.writeHead(200, {"Content-Type": "text/plain,charset=utf-8"});
	var postJSON = querystring.parse(postData);
	response.write( JSON.stringify(postJSON) );
	response.end();
}


exports.start = start;
exports.upload = upload;
