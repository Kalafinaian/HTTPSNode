###项目结构说明
####配置文件
     router.js  路由配置文件
     server.js  HTTPS服务配置文件
     index.js  启动文件

####数据库模块
     Mongo.js 数据库操作模块：对数据库模块的简单封装；由具体功能模块调用实现对后台数据库操作
  
  
####具体的功能模块
     keyInfoHandlers.js  电子钥匙管理模块
     stationInfoHandlers.js  基站管理模块
     taskInfoHandlers.js  任务管理模块
     userInfoHandlers.js  用户管理模块
     
####后台调试脚本     
     mongod.start  mongod后台启动脚本
     node.start  node后台启动脚本
     

     
    