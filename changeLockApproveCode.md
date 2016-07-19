db.operateInfo.find({"apiName" : "/v0/updateLock"}).pretty()


db.taskInfo.find({ "lockID" : "4C00000E0B1170C0"}).pretty()

 "approveCode" : "4201736374740106",
 "approveCode" : "4201010203040506",


db.lockInfo.find().pretty()


db.stationInfo.update({},{$set:{"approveCode" : "4201010203040506"}},{multi:true})

{ [MongoError: multi update only works with $ operators]
  name: 'MongoError',
  message: 'multi update only works with $ operators',
  driver: true,
  index: 0,
  code: 9,
  errmsg: 'multi update only works with $ operators' }
连接成功！
{ [MongoError: multi update only works with $ operators]
  name: 'MongoError',
  message: 'multi update only works with $ operators',
  driver: true,
  index: 0,
  code: 9,
  errmsg: 'multi update only works with $ operators' }
连接成功！
{ [MongoError: multi update only works with $ operators]
  name: 'MongoError',
  message: 'multi update only works with $ operators',
  driver: true,
  index: 0,
  code: 9,
  errmsg: 'multi update only works with $ operators' }
连接成功！
