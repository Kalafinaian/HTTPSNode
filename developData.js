stationInfo
{ "_id" : ObjectId("577b259d9f6194cb08732551"), "stationID" : "4674968890", "address" : "四川省成都市建设北路二段四号", "lockID" : "4C11223344556677", "chargePerson" : "陆金波", "managementProvince" : "四川省", "managementCity" : "成都", "managementArea" : "成都市", "approvalPerson" : "肖良平", "doorStatus" : "closed", "approveCode" : "4201736374740106" }

keyInfo

{ "_id" : ObjectId("577d008eec81ed9d178dc307"), "keyID" : "010000", "managementProvince" : "四川省", "managementCity" : "成都市", "managementArea" : "ALL", "gridID" : "123456791" }

userInfo

db.userInfo.insert({ "username" : "九鼎", "realname" : "九鼎", "phone" : "13918217100", "userType" : "501", "companyGroup" : "厂商公司", "company" : "九鼎科技", "userDescription" : "工程师", "userGroup" : "工程师", "companyCode" : "5", "managementProvince" : "四川省", "managementCity" : "成都", "managementArea" : "成都市", "addStationAction" : "true", "deleteStationAction" : "true", "queryStationAction" : "true", "updateStationAction" : "true", "addStaffAction" : "true", "deleteStaffAction" : "true", "queryStaffAction" : "true", "updateStaffAction" : "true", "addKeyAction" : "true", "deleteKeyAction" : "true", "queryKeyAction" : "true", "updateKeyAction" : "true", "doorAuthorization" : "true", "password" : "123456", "accessToken" : "h1f2rylbd42t9", "tokenStartTime" : "1467872598", "tokenEndTime" : "1467958998", "addLockAction" : "true", "deleteLockAction" : "true", "queryLockAction" : "true", "updateLockAction" : "true" })

 db.userInfo.find({"username" : "九鼎"}).pretty()
{
        "_id" : ObjectId("5782fd975f46af4c3532ac22"),
        "username" : "九鼎",
        "realname" : "九鼎",
        "phone" : "13918217100",
        "userType" : "501",
        "companyGroup" : "厂商公司",
        "company" : "九鼎科技",
        "userDescription" : "工程师",
        "userGroup" : "工程师",
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
}
