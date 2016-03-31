//---------------------开始--数据插入函数--开始--------------------//
var insertData = function(db, collectionName, data , callback) {   
  var collection = db.collection(collectionName);    //连接到表 
  collection.insert(data, function(err, result) {    //插入数据
	    if(err)
	    {
	      console.log('Error:'+ err);
	      return;
	    }	 
	    callback(result);
  });
}

function insertFunc( mongoClient, DB_CONN_STR, collectionName, data, callback)
{
	mongoClient.connect(DB_CONN_STR, function(err, db) {
		console.log("连接成功！");
		insertData(db, collectionName, data , function(result){
			 callback(result);
			 db.close();
		})
	});
}
//---------------------结束--数据插入函数--结束--------------------//







//---------------------开始--数据查询函数--开始--------------------//
var selectData = function(db, collectionName, whereStr , callback) {  
  //连接到表  
  var collection = db.collection(collectionName);
  collection.find(whereStr).toArray(function(err, result) {
	    if(err)
	    {
	      console.log('Error:'+ err);
	      return;
	    }     
	    callback(result);
  });
}

function selectFunc( mongoClient,  DB_CONN_STR, collectionName,  whereStr,  callback)
{
	mongoClient.connect(DB_CONN_STR, function(err, db) {
		  console.log("连接成功！");
		  selectData(db, collectionName,  whereStr , function(result){
		  	 callback(result);
		  	 db.close();
		  });
	});
}
//---------------------结束--数据查询函数--结束--------------------//






//---------------------开始--数据修改函数--开始--------------------//
var updateData = function(db, collectionName, whereStr ,updateStr, callback){   
  var collection = db.collection(collectionName);   //连接到表 
  collection.update( whereStr, updateStr, function(err, result) {    //更新数据
    if(err)
    {
	      console.log('Error:'+ err);
	      return;
    }	 
    callback(result);
  });
}

function updateFunc( mongoClient,DB_CONN_STR,collectionName, whereStr ,updateStr , callback)
{
	mongoClient.connect(DB_CONN_STR, function(err, db) {
	  console.log("连接成功！");
	  updateData(db, collectionName, whereStr ,updateStr, function(result){
		  	 callback(result);
		  	 db.close();
	  });
	});
}
//---------------------结束--数据修改函数--结束--------------------//





//---------------------开始--数据删除函数--开始--------------------//
var delData = function(db, collectionName, whereStr , callback) {  
  var collection = db.collection(collectionName);    //连接到表  
  collection.remove(whereStr, function(err, result) {
    if(err)
    {
		console.log('Error:'+ err);
		return;
    }     
    callback(result);
  });
}

function deleteFunc( mongoClient,DB_CONN_STR,collectionName, whereStr, callback )
{
	mongoClient.connect(DB_CONN_STR, function(err, db) {
	  console.log("连接成功！");
	  delData(db, collectionName, whereStr , function(result){
		  	 callback(result);
		  	 db.close();
	  });
	});
}
//---------------------结束--数据删除函数--结束--------------------//






//---------------------开始--调用存储过程--开始--------------------//
var invokeProcData = function(db, callback) {  
  db.eval(proc, function(err, result) {   //存储过程调用
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }			 
    callback(result);
  });
}


function invokeProcFunc(mongoClient,DB_CONN_STR,callback)
{
	mongoClient.connect(DB_CONN_STR, function(err, db) {
	  console.log("连接成功！");
	  invokeProcData(db, function(result){
		  	 callback(result);
		  	 db.close();
	  });
	});

}
//---------------------结束--调用存储过程--结束--------------------//



exports.insertFunc = insertFunc;
exports.selectFunc = selectFunc;
exports.updateFunc = updateFunc;
exports.deleteFunc = deleteFunc;
exports.invokeProcFunc = invokeProcFunc;
