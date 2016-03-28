var querystring = require("querystring");
function start(response, postData)
{
	console.log( "Request handler 'start' was called." );
	response.writeHead(200, {"Content-Type": "text/plain"});
	var result = {
	"Permissions" : [{
			"_id" : "54939fc21e44f52c2c67ea54",
			"action" : "changeStatus",
			"subject" : "taskManage",
			"__v" : 0
		}, {
			"_id" : "54939fc11e44f52c2c67ea4a",
			"action" : "search",
			"subject" : "stationManage",
			"__v" : 0
		}, {
			"_id" : "54939fc21e44f52c2c67ea57",
			"action" : "search",
			"subject" : "reportManage",
			"__v" : 0
		}, {
			"_id" : "54939fc11e44f52c2c67ea4d",
			"action" : "search",
			"subject" : "accountManage",
			"__v" : 0
		}, {
			"_id" : "54939fc21e44f52c2c67ea59",
			"action" : "export",
			"subject" : "reportManage",
			"__v" : 0
		}, {
			"_id" : "54939fc11e44f52c2c67ea48",
			"action" : "change",
			"subject" : "accountManage",
			"__v" : 0
		}, {
			"_id" : "54939fc21e44f52c2c67ea51",
			"action" : "search",
			"subject" : "taskManage",
			"__v" : 0
		}
	],
	"UserInfo" : {
		"_id" : "56e388c45bad5af46781d4ac",
		"username" : "14780413613",
		"realname" : "007",
		"status" : "active",
		"belongs" : "54dc52559475fa6712f0b997",
		"userType" : "ManagementCompanyStaff",
		"createdDate" : "2016-03-12T03:11:00.160Z"
	},
	"accessToken" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU2ZTM4OGM0NWJhZDVhZjQ2NzgxZDRhYyIsImlhdCI6MTQ1ODU2ODI5OCwiZXhwIjoxNDU5MTczMDk4fQ.fWbxQrK1ZHBgUMzEbbS-lPp5lJIEyspUT5za7IHT4JU",
	"token_exp" : 1459173098,
	"token_iat" : 1458568298
};
	var a = querystring.parse(postData);
	response.write( JSON.stringify(a) );
	//response.write( postData );
	//response.write("You've sent the text: "+ querystring.parse(postData).text);
	//response.write("You've sent the text: "+ " to start function" );
	response.end();
}

function upload(response, postData)
{
	console.log( "Request handler 'upload' was called." );
	//response.write( "Request handler 'upload' was called." );
	response.writeHead(200, {"Content-Type": "text/plain"});
	//response.write( "Request handler 'upload' was called.\n" );
	var a = querystring.parse(postData);
	response.write( JSON.stringify(a) );
	//response.write( postData );
	//response.write("You've sent the text: "+ querystring.parse(postData).text);
	//response.write("You've sent the text: "+ " to start function" );
	response.end();
}

exports.start = start;

exports.upload = upload;
