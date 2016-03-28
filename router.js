function route(handle,pathname,response,postData){
	console.log("About to route a request for " + pathname);
	if( typeof(handle[pathname])  == "function" )
	{
		handle[pathname](response, postData);
	}else{
		console.log("No request handler for " + pathname);
	}
}
exports.route = route;