mongoexport  --csv -f username,realname,phone,userType,companyGroup,company,userDescription,userGroup,companyCode,managementProvince,managementCity,managementArea,addStationAction,deleteStationAction,queryStaffAction,updateStationAction,addStaffAction,deleteStaffAction,queryStaffAction,updateStaffAction,addKeyAction,deleteKeyAction,queryKeyAction,updateKeyAction,doorAuthorization,password,accessToken,tokenStartTime,tokenEndTime,addLockAction,deleteLockAction,queryLockAction,updateLockAction -d csis -c userInfo -o  ./用户信息.csv



mongoexport   --type=csv -f username,realname,phone,userType,companyGroup,company,userDescription,userGroup,companyCode,managementProvince,managementCity,managementArea,addStationAction,deleteStationAction,queryStationAction,updateStationAction,addStaffAction,deleteStaffAction,queryStaffAction,updateStaffAction,addKeyAction,deleteKeyAction,queryKeyAction,updateKeyAction,doorAuthorization,password,accessToken,tokenStartTime,tokenEndTime,addLockAction,deleteLockAction,queryLockAction,updateLockAction -d csis -c userInfo -o  ./用户信息.csv



         "_id" : ObjectId("5722c4a2b808375f48d8b535"),
        "username" : "胡斐",
        "realname" : "胡斐",
        "phone" : "13318217100",
        "userType" : "501",
        "companyGroup" : "厂商公司",
        "company" : "成都市雪山公司",
        "userDescription" : "自定义",
        "userGroup" : "管理员",
        "companyCode" : "5",
        "managementProvince" : "四川省",
        "managementCity" : "成都",
        "managementArea" : "成都市",
        "addStationAction" : "true",
        "deleteStationAction" : "true",
        "queryStationAction" : "true",
        "updateStationAction" : "true",
        "addStaffAction" : "true",
        "deleteStaffAction" : "true",
        "queryStaffAction" : "true",
        "updateStaffAction" : "true",
        "addKeyAction" : "true",
        "deleteKeyAction" : "true",
        "queryKeyAction" : "true",
        "updateKeyAction" : "true",
        "doorAuthorization" : "true",
        "password" : "123456",
        "accessToken" : "h1f2rylbd42t9",
        "tokenStartTime" : "1467872598",
        "tokenEndTime" : "1467958998",
        "addLockAction" : "true",
        "deleteLockAction" : "true",
        "queryLockAction" : "true",
        "updateLockAction" : "true"

