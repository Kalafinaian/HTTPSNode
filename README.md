# NodeJSRouter
## node.js的路由功能简单例子


## POST数据处理技巧
### 1、POST数据成功的返回头：        
	response.writeHead(200, {"Content-Type": "text/plain"});
### 2、POST字符串数据转换为JSON格式：
	var a = querystring.parse(postData);
### 3、JSON对象转换为字符串：
	JSON.stringify(a) 
### 4、JSON字符串转换为JSON对象：
	JSON.parse(str); 
