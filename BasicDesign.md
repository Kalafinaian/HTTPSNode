##一、后台API设计清单
平台需要具备支持区域管理、账号管理、授权管理、锁具管理、钥匙管理和记录管理等功能  
https://www.smartlock.top代表网络协议和访问地址，v0代表API版本号，login等代表请求API  


###1、用户和公司信息录入和管理	
	1	https://www.smartlock.top/v0/login	        	登陆
	2	https://www.smartlock.top/v0/addUser			添加用户、公司
	3	https://www.smartlock.top/v0/deleteUser			删除用户、公司
	4	https://www.smartlock.top/v0/updateUser			编辑用户、公司
	5	https://www.smartlock.top/v0/queryUser			查询用户、公司
	6	https://www.smartlock.top/v0/downloadUser		用户、公司信息Excel下载请求接口


###2、基站信息录入和管理	
	7	https://www.smartlock.top/v0/addStation	 		添加基站
	8	https://www.smartlock.top/v0/deleteStation		删除基站
	9	https://www.smartlock.top/v0/updateStation		编辑基站
	10	https://www.smartlock.top/v0/queryStation		查询基站
	11	https://www.smartlock.top/v0/downloadStation	基站信息Excel下载请求接口


###3、电子钥匙管理
	12	https://www.smartlock.top/v0/addKey 	    	添加电子钥匙
	13	https://www.smartlock.top/v0/deleteKey 			删除电子钥匙
	14	https://www.smartlock.top/v0/updateKey 			编辑电子钥匙
	15	https://www.smartlock.top/v0/queryKey 			查询电子钥匙
	16	https://www.smartlock.top/v0/downloadKey 		电子钥匙信息Excel下载请求接口


###4、任务申请和授权管理	
	17	https://www.smartlock.top/v0/taskRequest		开门工单任务申请（工程师申请任务）
	18	https://www.smartlock.top/v0/taskFetch    		开门工单任务抓取（管理员定时调用）
	19	https://www.smartlock.top/v0/taskAuthenticate	开门工单任务授权（管理员审批任务）
	20	https://www.smartlock.top/v0/taskAuthFetch		开门工单任务申请状态抓取（工程师定时调用）
	21	https://www.smartlock.top/v0/taskCommit			开门工单任务结果上传接口（工程师上传开门结果）
	22	https://www.smartlock.top/v0/downloadTask		下载基站的开门申请任务Excel记录日志
	23	https://www.smartlock.top/v0/taskChange			工单任务修改


###5、基站日志管理
	24	https://www.smartlock.top/v0/queryStationLog		查询指定基站日志
	25	https://www.smartlock.top/v0/downloadStationLog		下载指定基站任务Excel记录日志



###6、电子钥匙日志管理
	26、https://www.smartlock.top/v0/queryKeyLog	        查询指定电子钥匙日志
	27、https://www.smartlock.top/v0/downloadKeyLog	        下载指定电子钥匙相关任务Excel记录日志


		
总体任务：前期实现基本API，后期实现数据库备份，操作日志记录，大量数据压力测试等工作			
			


##二、授权管理	
权限完全由用户定制，身份信息也由用户录入规定。权限按照以下规定管理：  
1、系统初始化时，会分配一个超级管理员用户，拥有所有权限；  
2、超级管理员用户可以添加比自己权限更低或者等同的用户；  
3、所有用户只能添加权限更低的用户；  
4、所有用户只能添加自己管辖区域范围内的基站；  
5、所有用户只能操作自己管辖区域内的基站。  




##三、后台基本数据表定义


**后台处理的核心数据是用户信息和基站信息**



###1、用户管理JSON字段设计


**用户信息用于用户管理、公司管理、权限管理功能实现**

	{
		"userInfo" : //用户信息
		{
			//基本信息
			"username" : "陈刚", //用户名--登陆名一,必须保证唯一性
			"realname":"陈刚", //不需要保证唯一性
			"password" : "123456", //密码
			"phone" : "14780413613", //手机号
			"company": "中国移动成都分公司高新西区分公司"， //用户所属公司
			"companyGroup":"运营商"  //必须选定，用于公司分类管理；五选一:铁塔公司、运营商、施工公司、代维公司、厂商
			"userDescription" : "基站管理员", //用户描述
			"userType":"1", //用户类型，1表示管理员，0表示工程师
			"userGroup":"超级管理员"，//用户自定义权限，按固定的权限分组；若指定Group，权限则固定为group的权限，后续权限字段免填


			//管理范围--限制只能操作成都市地区基站、员工、作业数据;ALL表示可以查看所有同级区域 
			"managementProvince":"四川省"，
			"managementCity":"成都市"，
			"managementArea":"高新西区"，



			//基站管理--基站录入时的增删查改权限
			"addStationAction" : "true",
			"deleteStationAction" : "true",
			"queryStationAction" : "true",
			"updateStationAction" : "true",
			


			//员工管理--员工录入时的增删查改权限
			"addStaffAction" : "true",
			"deleteStaffAction" : "true",
			"queryStaffAction" : "true",
			"updateStaffAction" : "true",


			//电子钥匙管理--电子钥匙录入时的增删查改权限
			"addKeyAction" : "true",  
			"deleteKeyAction" : "true",  
			"queryKeyAction" : "true",  
			"updateKeyAction" : "true",  


			//作业管理--是否具有开门授权的权限
			"doorAuthorization" : "true", //开门授权
		

			//使用动态令牌，可以增强安全性
			"accessToken" : "faueswyghfils",  //API动态令牌 
			"tokenStartTime " : 1459173098, //动态令牌起始时间   %s 总秒数。起算时间为1970-01-01 00:00:00 UTC。 
			"tokenEndTime" : 1458568298 //动态令牌终止时间  %s 总秒数。起算时间为1970-01-01 00:00:00 UTC。 

		}
	}


###2、基站管理JSON字段设计

**基站信息用于基站管理、作业管理功能实现**

	{
		"stationInfo" : //基站信息
		{
			//基本信息-ID、地址、状态
			"stationID" : "4634968874",  //基站ID，唯一性字段
			"address" : "四川省成都市建设北路二段四号", //唯一性字段
			"lockID":"1326354564", //唯一性字段

			"doorStatus" : "closed", 

			//负责人、基站所属公司
			"chargePerson":"陆金波"，   //基站负责人
			"chargePhone":"14652341236", //基站负责人电话
			"chargeCompany":"中国移动成都分公司高新西区分公司"，  //基站所属公司


			//所属管辖区域
			"managementProvince":"四川省"，
			"managementCity":"成都市"，
			"managementArea":"高新西区"，


			//基站任务审批人
			"approvalPerson"："肖良平",  //基站作业审批人
			"approvalPhone"："15520443869",  //作业审批人电话
			"approvalCompany"："中国移动成都分公司高新西区分公司",

			"doorMagnetic":"开",
			"lockingTab":"关"


		}
	}




###3、电子钥匙管理JSON字段设计
**电子钥匙基本信息**

	{
		"keyInfo" : //电子钥匙信息
		{
			//基本信息-ID
			"keyID" : "434968874",  //电子钥匙ID
			"managementProvince":"四川省"    //电子钥匙管理区域信息
			"managementCity":"成都市"        //电子钥匙管理区域信息
			"managementArea":"高新西区"      //电子钥匙管理区域信息
		}
	}


###4、任务管理JSON字段设计
**任务信息用于作业授权管理、作业管日志理功能实现**

	{
		"taskInfo" : //基站信息
		{
			//基本信息-ID、地址、状态
			"taskID" : "4634968874",  //任务ID--每次唯一分配，递增分配

			"stationID":"4634968874", //基站ID
			"stationAddress":"四川省成都市高新西区", //基站地址
			
			//申请信息
			"applicantName":"陈刚"， //作业申请人--必须--工程师按用户名拉取自己申请的工单
			"applicantCompany":"中国移动成都分公司高新西区分公司"， //申请人公司
			"applicantPhone":"14780413613", //申请人电话--必须
			"applicatKeyID":"1346464674", //申请授权的电子钥匙ID--必须
			"applicationType":"",   //申请类型
			"applyDescription":"",  //申请描述
			"taskStartTime":1459173098,  //工单申请的开门起始时间
			"taskEndTime":1458568298,  //工单申请的开门终止时间
			"taskTimes":5,//工单申请的开门次数


			//基站任务审批信息
			"approvalPerson"："樊建峰",  //作业审批人--根据申请任务的基站，查找审批人--审批人按用户名拉取自己负责的工单
			"approvalPhone"："15464674156",  //作业审批人电话
			"reason":"情况属实，给予开门权限", //审批人作业审批说明

			//审批状态
			"applicationStatus":"pending"  //pending待处理 holded延期处理 reject拒绝 approve同意


			//授权信息--仅当审批状态为approve的时候，授权信息才生效
			"approveCode":"fgauihffgda"  //开门码
			"approveStartTime " : 1459173098, //允许使用该开门码开门的起始时间  %s 总秒数。起算时间为1970-01-01 00:00:00 UTC。 
			"approveEndTime" : 1458568298, //允许使用该开门码开门的终止时间  %s 总秒数。起算时间为1970-01-01 00:00:00 UTC。 
			"approveTimes":"5", //允许开门的次数


			"applyTime":" ",
			"approveTime":" ",
			"workStatus":"未完成",
			"workDescription":"",
			"finishTime":" "

		}
	}

