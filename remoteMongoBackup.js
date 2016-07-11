//执行脚本   mongo localhost:27017/csis  mongoShell.js
//localhost:27017/csis
//var cursor = db.getCollectionNames(); // 获取collection 名
//print(cursor);
//数据库名  备份目的地（备份文件名）  备份时间  备份内容  
var dbClient = require("./Mongo");  //数据库模块
var mongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/csis';	
var collectionName = "backupInfo";

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



//第一步：node调用shell完成备份
var exec = require('child_process').exec; 

var cmdStr = 'rm *.xlsx';
exec(cmdStr);



//第二步：node将备份记录写入数据库
var insertStr = {dbName:"csis",backupName:"",backupTime:"",backupTimeStamp:""};
var timeStamp = Date.now();
insertStr.backupTime = formatToDetailDate(timeStamp);
insertStr.backupTimeStamp = parseInt(timeStamp/1000);

//插入数据
dbClient.insertFunc( mongoClient, DB_CONN_STR, collectionName,  insertStr , function(result){});	


//第三步：预留数据恢复脚本


//备份端的脚本---通过备份端远程连接数据库备份，并写入备份记录
// mongodump --help
// #命令帮助

// mongodump  -h 192.168.0.1 -u "mydbuser" -p "123" -d mydb  -o d:\mydb
// #备份192.168.0.1上的mydb库到本地的 d:\mydb 目录，如果mongod服务启用了认证，则必须使用用户名密码进行谁
// #注意此处的认证用户必须是mydb库中的用户，如果admin库中有超级用户，但mydb库没有用户，也是无法备份的，必须在mydb中创建一个用户才行。

// mongodump  -h 192.168.0.1 -u "mydbuser" -p "123" -d mydb  -c User -o d:\User
// #备份192.168.0.1上的mydb库中的User集合



// 恢复： mongorestore

// mongorestore --help
// #命令帮助

// mongorestore -h  192.168.0.2 -u "root" -p "123"  d:\mydb
// #从备份目录d:\mydb下恢复数据库到192.168.0.1上
// #整库恢复使用admin库下的用户进行认证

// mongorestore -h  192.168.0.2 -u "mydb_user" -p "123"  -d mydb  d:\User\mydb --drop
// #从备份目录d:\User\mydb下恢复集合到192.168.0.1上mydb库的User集合,如果存在则先删除再恢复
// #指定数据库名则需使用指定库下的用户进行认证
