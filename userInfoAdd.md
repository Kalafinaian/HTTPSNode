db.userInfo.update({username:"向宇"},{$set:{companyID:'10000'}});
db.userInfo.update({username:"李堂庚"},{$set:{companyID:'10000'}});
db.userInfo.update({username:"刘冬寅"},{$set:{companyID:'10000'}});


db.userInfo.insert(
{
        "username" : "admin",
        "password" : "123456",
        "phone" : "15008431512",
        "userType" : "000",
        "companyGroup" : "厂商",
        "company" : "中国移动高新西区子公司",
        "companyCode" : "000",
        "userDescription" : "中国移动员工",
        "userGroup" : "运营商",
        "managementProvince" : "四川省",
        "managementCity" : "成都市",
        "managementArea" : "高新西区",
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
        "accessToken" : "l6pgsvb4oraoflxr",
        "tokenStartTime" : "1469005784",
        "tokenEndTime" : "1469092184",
        "addLockAction" : "true",
        "deleteLockAction" : "true",
        "queryLockAction" : "true",
        "updateLockAction" : "true"
}
);