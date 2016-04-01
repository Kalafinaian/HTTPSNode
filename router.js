//---------------------开始--路由配置函数--开始--------------------//
function route(handle,pathname,response,postData)
{
	console.log("Route a request to " + pathname);
	if( typeof(handle[pathname])  == "function" )
	{
		handle[pathname](response, postData);
	}else
	{
		console.log("No request handler for " + pathname);
	}
}
//---------------------结束--路由配置函数--结束--------------------//


//---------------------开始--模块导出接口声明--开始--------------------//
exports.route = route;
//---------------------结束--模块导出接口声明--结束--------------------//