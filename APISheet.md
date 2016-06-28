##一、用户和权限管理	
###1、用户登陆

功能说明：通过用户名和密码实现登陆操作。

```
适用群体：Web端+APP端    
URL：https://www.smartlock.top/v0/login	   
请求方式：POST   
```

请求参数：username=""&password=""   application/x-www-form-urlencoded

|   参数名  |  类型  | 必须 | 说明          |
| :------:  | :----: | :--: | :---------:   | 
| username  | String | Yes  | 用户名 		| 
| password  | String | Yes  | 用户登陆密码  | 

Code说明:前两位是API序号，后三位是状态序号。    


服务器返回参数:  

	{  
		"success":
		{
			//基本信息
			"userInfo" :
			{
				"username" : "陈刚", //用户名--具有唯一性
				"realname":"陈刚",   //真实姓名 
				"phone" : "14780413613", //手机号--具有唯一性
				"companyGroup":"运营商", //用户所属公司
				"company": "中国移动成都分公司高新西区分公司"， //用户所属公司 
				"userDescription" : "基站管理员",  //用户说明，由管理员指定，这里不做限制  
				"userGroup":"",  //用户自定义权限，按固定的权限分组；若指定Group，权限则固定为group的权限，后续权限字段免填
				"userType":"1"， //用户类型，1表示管理员，0表示工程师
			}


			"regionInfo":
			{
				//管理范围--限制只能操作成都市地区基站、员工、作业数据;ALL表示可以查看所有同级区域  
				"managementProvince":"四川省"，  
				"managementCity":"成都市"，  
				"managementArea":"ALL"， 	
			}
 

			"permissions":
			{
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
				"doorAuthorization" : "true", 	
			}


			"tokenInfo":
			{
				//使用动态令牌，可以增强安全性  
				"accessToken" : "faueswyghfils",  //API动态令牌   
				"tokenStartTime " : 1459173098, //动态令牌起始时间   %s 总秒数。起算时间为1970-01-01 00:00:00 UTC。   
				"tokenEndTime" : 1458568298 //动态令牌终止时间  %s 总秒数。起算时间为1970-01-01 00:00:00 UTC。  
			}
 
		}
	}  

Or  

	{ 
		"error":  
		{  
			"msg": "请输入用户名和密码",  
			"code":"01001"  
		}  
	}

Or 

	{  
		"error":  
		{  
			"msg": "#err:用户名或密码错误!",  
			"code":"01002"  
		}  
	}  



###2、添加用户

功能说明：用户如果具有添加用户的权限，通过API动态令牌、用户名可以新增其他用户；
新增的用户在管理权限上要降低或相等；
在管理地域上都应该从属于当前用户。

```
适用群体：Web端
URL：https://www.smartlock.top/v0/addUser	
请求方式：POST
```

请求参数：operatorName=""&accessToken=""newUserName=""...   application/x-www-form-urlencoded

| 参数名       		    | 类型     |必须   | 说明                                           |  
| :------:       		|:----:    |:--:   | :--------:										|  
| operatorName   		| String   | Yes   | 操作者用户账号-用户名        					|   
| accessToken 			| String   | Yes   | 操作者API动态令牌								|   
| username      		| String   | Yes   | 用户登陆名称--不能与现有名称重复			  	|  
| password      		| String   | Yes   | 用户登陆密码--没有密码不能登陆					|  
| phone       			| String   | Yes   | 用户联系方式--不能与现有名称重复			  	|    
| userType				| String   | Yes   | 用户类型，1表示管理员，0表示工程师				|	
| companyGroup     		| String   | No    | 用户所属公司类型								|      
| company     			| String   | No    | 用户所属公司									|
| companyCode     		| String   | No    | 预留扩展字段    								|
| userDescription     	| String   | NO    | 用户自己指定，可以不填写,默认为空 				|
| userGroup             | String   | NO    | userGroup指定，则固定权限，具体权限不可配置 	|   
| managementProvince 	| String   | Yes   | 没有地域则没有任何权限，ALL表示同级所有区域 	|    
| managementCity 		| String   | Yes   | 没有地域则没有任何权限，ALL表示同级所有区域 	|   
| managementArea 		| String   | Yes   | 没有地域则没有任何权限，ALL表示同级所有区域 	|     
| addStationAction 		| String   | NO    | 默认为false ，增加基站信息的权限				|   
| deleteStationAction 	| String   | NO    | 默认为false ，删除基站信息的权限				|   
| queryStationAction 	| String   | NO    | 默认为false ，查询基站信息的权限				|   
| updateStationAction 	| String   | NO    | 默认为false ，更新基站信息的权限				|   
| addStaffAction 		| String   | NO    | 默认为false ，增加用户信息的权限          		|   
| deleteStaffAction 	| String   | NO    | 默认为false ，删除用户信息的权限          		|    
| queryStaffAction  	| String   | NO    | 默认为false ，查询用户信息的权限          		|    
| updateStaffAction 	| String   | NO    | 默认为false ，更新用户信息的权限          		|  
| addKeyAction 			| String   | NO    | 默认为false ，增加电子钥匙信息的权限          	|   
| deleteKeyAction 		| String   | NO    | 默认为false ，删除电子钥匙信息的权限          	|    
| queryKeyAction 	 	| String   | NO    | 默认为false ，查询电子钥匙信息的权限          	|    
| updateKeyAction 		| String   | NO    | 默认为false ，更新电子钥匙信息的权限          	|      
| doorAuthorization 	| String   | NO    | 默认为false ，开门授权的权限          	 		|    

服务器返回参数：

	{
		"success":
		{
			"msg": "用户添加成功！",
			"code":"02000"
		｝
	}

Or

	{
		"error":
		{
			"msg": "用户或手机号已经存在!",
			"code":"02001"
		}
	}
Or

	{
		"error":
		{
			"msg": "用户名不存在或动态令牌已过期!",
			"code":"00000"
		}
	}



###3、删除用户
功能说明：删除受用户管理的用户。


```
适用群体：Web端
URL：https://www.smartlock.top/v0/deleteUser	
请求方式：POST
```	

请求参数：operatorName=""&accessToken=""username=""...   application/x-www-form-urlencoded

|   参数名    |   类型   |  必须  | 说明        								| 
| :------:    | :----:   | :--:   | :----------------------------------------: 	| 
| operatorName| String   | Yes    | 操作者用户账号--用户名         				|  
| accessToken | String   | Yes    | 操作者API动态令牌							|  
| username    | String   | Yes    | 删除用户的名称--必须是已经存在的用户  	 	|  

服务器返回参数：

	{
		"success":
		{
			"msg": "用户删除成功!",
			"code":"03000"
		｝
	}

Or

	{
		"error":
		{
			"msg": "用户名不存在或动态令牌已过期!",
			"code":"00000"
		}
	}





###4、编辑用户
功能说明：编辑受管理的用户和和当前用户信息。

```
适用群体：Web端
URL：https://www.smartlock.top/v0/updateUser		
请求方式：POST
```	

请求参数：operatorName=""&accessToken=""originalName=""...   application/x-www-form-urlencoded

|   参数名       		|   类型   | 必须  | 说明                                           |  
| :------:       		| :----:   | :--:  | :-------: 										|
| operatorName   		| String   | Yes   | 操作者用户账号-用户名        					|  
| accessToken 			| String   | Yes   | 操作者API动态令牌								|  
| originalName			| String   | Yes   | 用户在编辑之前的名字（指具有唯一性的登录名）	| 
| username      		| String   | No    | 用户登陆名称--不能与现有名称重复			  	|  
| password      		| String   | No    | 用户登陆密码--没有密码不能登陆					|   
| phone       			| String   | No    | 用户联系方式--不能与现有名称重复			  	|    
| userType				| String   | No    | 用户类型，1表示管理员，0表示工程师				|	
| companyGroup     		| String   | No    | 用户所属公司类型,必填项						|      
| company     			| String   | No    | 用户所属公司,必填项							|
| userDescription     	| String   | NO    | 用户自己指定，可以不填写,默认为空 				|
| userGroup             | String   | NO    | userGroup指定，则固定权限，具体权限不可配置 	|   
| managementProvince 	| String   | NO    | 可以不填--没有地域则没有任何权限 				|    
| managementCity 		| String   | NO    | 可以不填--没有地域则没有任何权限 				|   
| managementArea 		| String   | NO    | 可以不填--没有地域则没有任何权限 				|    
| addStationAction 		| String   | NO    | 默认为false ，增加基站信息的权限				|   
| deleteStationAction 	| String   | NO    | 默认为false ，删除基站信息的权限				|   
| queryStationAction 	| String   | NO    | 默认为false ，查询基站信息的权限				|   
| updateStationAction 	| String   | NO    | 默认为false ，更新基站信息的权限				|   
| addStaffAction 		| String   | NO    | 默认为false ，增加用户信息的权限          		|   
| deleteStaffAction 	| String   | NO    | 默认为false ，删除用户信息的权限          		|    
| queryStaffAction  	| String   | NO    | 默认为false ，查询用户信息的权限          		|    
| updateStaffAction 	| String   | NO    | 默认为false ，更新用户信息的权限          		|  
| addKeyAction 			| String   | NO    | 默认为false ，增加电子钥匙信息的权限          	|   
| deleteKeyAction 		| String   | NO    | 默认为false ，删除电子钥匙信息的权限          	|    
| queryKeyAction 	 	| String   | NO    | 默认为false ，查询电子钥匙信息的权限          	|    
| updateKeyAction 		| String   | NO    | 默认为false ，更新电子钥匙信息的权限          	|      
| doorAuthorization 	| String   | NO    | 默认为false ，开门授权的权限          	 		|    		   

服务器返回参数：

	{
		"success":
		{
			"msg": "用户信息编辑成功",
			"code":"04000"
		｝
	}

Or

	{
		"error":
		{
			"msg": "用户名或手机号重复!",  
			"code":"040001"  
		}
	}

Or

	{
		"error":
		{
			"msg": "用户名不存在或动态令牌已过期!",
			"code":"00000"
		}
	}




###5、查询用户
功能说明：用户查询接口，没有查询限制则查询所有权限内可见的用户

```
适用群体：Web端
URL：https://www.smartlock.top/v0/queryUser	
请求方式：POST
```	

请求参数：operatorName=""&accessToken="...   application/x-www-form-urlencoded

|   参数名              |   类型   |  必须 | 说明        								    | 
| :------:    			| :----:   | :--:  | :-------: 								        | 
| operatorName   		| String   | Yes   | 操作者用户账号-用户名        					|  
| accessToken 			| String   | Yes   | 操作者API动态令牌								|  
| username      		| String   | No    | 用户登陆名称--不能与现有名称重复			  	|  
| phone       			| String   | No    | 用户联系方式--不能与现有名称重复			  	|    
| userType				| String   | No    | 用户类型，1表示管理员，0表示工程师				|	
| companyGroup     		| String   | No    | 用户所属公司类型,必填项						|      
| company     			| String   | No    | 用户所属公司,必填项							|
| userDescription     	| String   | NO    | 用户自己指定，可以不填写,默认为空 				|
| userGroup             | String   | NO    | userGroup指定，则固定权限，具体权限不可配置 	|   
| managementProvince 	| String   | NO    | 可以不填--没有地域则没有任何权限 				|    
| managementCity 		| String   | NO    | 可以不填--没有地域则没有任何权限 				|   
| managementArea 		| String   | NO    | 可以不填--没有地域则没有任何权限 				|    
| addStationAction 		| String   | NO    | 默认为false ，增加基站信息的权限				|   
| deleteStationAction 	| String   | NO    | 默认为false ，删除基站信息的权限				|   
| queryStationAction 	| String   | NO    | 默认为false ，查询基站信息的权限				|   
| updateStationAction 	| String   | NO    | 默认为false ，更新基站信息的权限				|   
| addStaffAction 		| String   | NO    | 默认为false ，增加用户信息的权限          		|   
| deleteStaffAction 	| String   | NO    | 默认为false ，删除用户信息的权限          		|    
| queryStaffAction  	| String   | NO    | 默认为false ，查询用户信息的权限          		|    
| updateStaffAction 	| String   | NO    | 默认为false ，更新用户信息的权限          		|  
| addKeyAction 			| String   | NO    | 默认为false ，增加电子钥匙信息的权限          	|   
| deleteKeyAction 		| String   | NO    | 默认为false ，删除电子钥匙信息的权限          	|    
| queryKeyAction 	 	| String   | NO    | 默认为false ，查询电子钥匙信息的权限          	|    
| updateKeyAction 		| String   | NO    | 默认为false ，更新电子钥匙信息的权限          	|      
| doorAuthorization 	| String   | NO    | 默认为false ，开门授权的权限          	 		|    	   
     


服务器返回参数：

	{
		"success":
		{
			[
				{
					用户信息
				｝,


				...
				{
					用户信息
				｝				
			]
		}
	}

Or

	{
		"error":
		{
			"msg": "没有查询记录!",  
			"code":"05001"  
		}
	}
Or

	{
		"error":
		{
			"msg": "用户名不存在或动态令牌已过期",  
			"code":"00000"  
		}
	}




###6、下载用户信息Excel表格
功能说明：


```
适用群体：Web端
URL：https://www.smartlock.top/v0/downloadUser
请求方式：POST
```	

请求参数：operatorName=""&accessToken="...   application/x-www-form-urlencoded

|   参数名    			|   类型   | 必须  | 说明        								    |  
| :------:    			| :----:   | :--:  | :----------------------------------------: 	| 
| operatorName   		| String   | Yes   | 操作者用户账号-用户名        					|  
| accessToken 			| String   | Yes   | 操作者API动态令牌								| 
| username      		| String   | No    | 用户登陆名称--不能与现有名称重复			  	|  
| phone       			| String   | No    | 用户联系方式--不能与现有名称重复			  	|    
| userType				| String   | No    | 用户类型，1表示管理员，0表示工程师				|	
| companyGroup     		| String   | No    | 用户所属公司类型,必填项						|      
| company     			| String   | No    | 用户所属公司,必填项							|
| userDescription     	| String   | NO    | 用户自己指定，可以不填写,默认为空 				|
| userGroup             | String   | NO    | userGroup指定，则固定权限，具体权限不可配置 	|   
| managementProvince 	| String   | NO    | 可以不填--没有地域则没有任何权限 				|    
| managementCity 		| String   | NO    | 可以不填--没有地域则没有任何权限 				|   
| managementArea 		| String   | NO    | 可以不填--没有地域则没有任何权限 				|    
| addStationAction 		| String   | NO    | 默认为false ，增加基站信息的权限				|   
| deleteStationAction 	| String   | NO    | 默认为false ，删除基站信息的权限				|   
| queryStationAction 	| String   | NO    | 默认为false ，查询基站信息的权限				|   
| updateStationAction 	| String   | NO    | 默认为false ，更新基站信息的权限				|   
| addStaffAction 		| String   | NO    | 默认为false ，增加用户信息的权限          		|   
| deleteStaffAction 	| String   | NO    | 默认为false ，删除用户信息的权限          		|    
| queryStaffAction  	| String   | NO    | 默认为false ，查询用户信息的权限          		|    
| updateStaffAction 	| String   | NO    | 默认为false ，更新用户信息的权限          		|  
| addKeyAction 			| String   | NO    | 默认为false ，增加电子钥匙信息的权限          	|   
| deleteKeyAction 		| String   | NO    | 默认为false ，删除电子钥匙信息的权限          	|    
| queryKeyAction 	 	| String   | NO    | 默认为false ，查询电子钥匙信息的权限          	|    
| updateKeyAction 		| String   | NO    | 默认为false ，更新电子钥匙信息的权限          	|      
| doorAuthorization 	| String   | NO    | 默认为false ，开门授权的权限          	 		|    	   
     

服务器返回参数：

	
	{ 
		"success":  
		{  
			"url": "https://www.smartlock.top/b.xlsx",  
			"code":"06000"  
		}  
	}
	
Or

	{ 
		"error":  
		{  
			"msg": "没有数据记录!",  
			"code":"06001"  
		}  
	}

Or

	{
		"error":
		{
			"msg": "用户名不存在或动态令牌已过期",  
			"code":"00000"  
		}
	}



##二、基站管理
###7、添加基站
功能说明：


```
适用群体：Web端
URL：https://www.smartlock.top/v0/addStation
请求方式：POST
```	

请求参数：operatorName=""&accessToken=""&stationID=""...   application/x-www-form-urlencoded

|   参数名    		|   类型  | 必须 | 说明        								    			|  
| :------:    		| :----:  | :--: | :-------------------------------------: 	    			| 
|operatorName   	| String  | Yes  | 操作者用户账号-用户名        							|  
|accessToken 		| String  | Yes  | 操作者API动态令牌										| 
|stationID	  		| String  |	Yes  | 唯一的基站标识                               			|
|address	  		| String  |	Yes	 | 基站地址                                     			| 
|doorStatus			| String  |	No	 | 基站门的开关状态                             			| 
|lockID				| String  |	Yes	 | 基站门锁ID                                   			|
|chargePerson		| String  |	Yes	 | 基站负责人账号                                   		|  
|managementProvince	| String  |	Yes	 | 所属省级地域                                 			|
|managementCity		| String  |	Yes	 | 所属市级地域                                 			|
|managementArea		| String  |	Yes	 | 所属区级地域                                 			|
|approvalPerson		| String  |	Yes	 | 基站作业审批人账号--添加的审批人必须具有审批该基站的权限 |    
 

服务器返回参数：

	{
		"success":
		{
			"msg": "基站添加成功",
			"code":"07000"
		｝
	}

Or

	{
		"error":
		{
			"msg": "基站ID已存在",
			"code":"07001"
		}
	}

Or

	{
		"error":
		{
			"msg": "用户名不存在或动态令牌已过期",  
			"code":"00000"  
		}
	}



###8、删除基站
功能说明：删除指定的基站


```
适用群体：Web端
URL：https://www.smartlock.top/v0/deleteStation
请求方式：POST
```	 


请求参数：operatorName=""&accessToken=""&deleteList=[id1,id2,...,idn]...   
application/x-www-form-urlencoded
			



|   参数名    |   类型   |  必须  | 说明        								|  
| :------:    | :----:   | :--:   | :----------------------------------------: 	| 
|operatorName | String   | Yes    | 操作者用户账号-用户名        				|  
|accessToken  | String   | Yes    | 操作者API动态令牌							| 
|deleteList	  | String   | Yes    | 被删除的基站ID-唯一的基站标识               |


服务器返回参数：

	{
		"success":
		{
			"msg": "基站删除成功!",  
			"code":"08000"  
		｝
	}

Or

	{
		"error":
		{
			"msg": "基站名不存在或动态令牌已过期!",  
			"code":"00000"  
		}
	}


###9、编辑基站
功能说明：编辑指定的基站


```
适用群体：Web端
URL：https://www.smartlock.top/v0/updateStation
请求方式：POST
```	

请求参数：operatorName=""&accessToken="...   application/x-www-form-urlencoded

|   参数名    		|   类型  | 必须 | 说明        								    |  
| :------:    		| :----:  | :--: | :----------------------------------------: 	| 
|operatorName   	| String  | Yes  | 操作者用户账号-用户名        				|  
|accessToken 		| String  | Yes  | 操作者API动态令牌							| 
|originalStationID	| String  |	Yes  | 被编辑的基站ID-唯一的基站标识                |
|stationID	  		| String  |	No   | 唯一的基站标识                               |
|address	  		| String  |	No	 | 基站地址                                     | 
|doorStatus			| String  |	No	 | 基站门的开关状态                             | 
|lockID				| String  |	No	 | 基站门锁ID                                   |
|chargePerson		| String  |	No	 | 基站负责人                                   |  
|managementProvince	| String  |	No	 | 所属省级地域                                 |
|managementCity		| String  |	No	 | 所属市级地域                                 |
|managementArea		| String  |	No	 | 所属区级地域                                 |
|approvalPerson		| String  |	No	 | 基站作业审批人                               |     

服务器返回参数：

	{
		"success":
		{
			"msg": "基站信息编辑成功!",  
			"code":"09000"  
		｝
	}

Or

	{
		"error":
		{
			"msg": "基站ID已存在!",  
			"code":"09001"  
		}
	}
Or

	{
		"error":
		{
			"msg": "基站名不存在或动态令牌已过期!",  
			"code":"00000"  
		}
	}



###10、查询基站
功能说明：查询指定的基站


```
适用群体：Web端
URL：https://www.smartlock.top/v0/queryStation	
请求方式：POST
```	

请求参数：operatorName=""&accessToken="...   application/x-www-form-urlencoded

|   参数名    		|   类型  | 必须 | 说明        								    |  
| :------:    		| :----:  | :--: | :----------------------------------------: 	| 
|operatorName   	| String  | Yes  | 操作者用户账号-用户名        				|  
|accessToken 		| String  | Yes  | 操作者API动态令牌							| 
|stationID	  		| String  |	No   | 唯一的基站标识                               |
|address	  		| String  |	No	 | 基站地址                                     | 
|doorStatus			| String  |	No	 | 基站门的开关状态                             | 
|lockID				| String  |	No	 | 基站门锁ID                                   |
|chargePerson		| String  |	No	 | 基站负责人                                   |  
|chargePhone		| String  |	No	 | 负责人联系方式                               | 
|chargeCompany		| String  |	No	 | 负责人公司                                   | 
|managementProvince	| String  |	No	 | 所属省级地域                                 |
|managementCity		| String  |	No	 | 所属市级地域                                 |
|managementArea		| String  |	No	 | 所属区级地域                                 |
|approvalPhone		| String  |	No	 | 基站作业审批人                               |    


服务器返回参数：

	{
		"success":
		{
			[
				{
					基站信息
				｝,


				...
				{
					基站信息
				｝				
			]
		}
	}
	
Or

	{
		"error":
		{
			"msg": "没有查询记录!",  
			"code":"10001"  
		}
	}

Or

	{
		"error":
		{
			"msg": "用户名不存在或动态令牌已过期",  
			"code":"00000"  
		}
	}



###11、下载基站信息Excel表格
功能说明：根据指定信息生成Excel表格，返回下载链接


```
适用群体：Web端
URL：https://www.smartlock.top/v0/downloadStation	
请求方式：POST
```	

请求参数：operatorName=""&accessToken="...   application/x-www-form-urlencoded

|   参数名        	|   类型  | 必须 | 说明        									|  
| :------:    		| :----:  | :--: | :----------------------------------------: 	| 
|operatorName   	| String  | Yes  | 操作者用户账号-用户名        				|  
|accessToken 		| String  | Yes  | 操作者API动态令牌							| 
|stationID	  		| String  |	No   | 唯一的基站标识                               |
|address	  		| String  |	No	 | 基站地址                                     | 
|doorStatus			| String  |	No	 | 基站门的开关状态                             | 
|lockID				| String  |	No	 | 基站门锁ID                                   |
|chargePerson		| String  |	No	 | 基站负责人                                   |  
|chargePhone		| String  |	No	 | 负责人联系方式                               | 
|chargeCompany		| String  |	No	 | 负责人公司                                   | 
|managementProvince	| String  |	No	 | 所属省级地域                                 |
|managementCity		| String  |	No	 | 所属市级地域                                 |
|managementArea		| String  |	No	 | 所属区级地域                                 |
|approvalPhone		| String  |	No	 | 基站作业审批人                               |    


服务器返回参数：

	{ 
		"success":  
		{  
			"url": "https://www.smartlock.top/b.xlsx",  
			"code":"11000"  
		}  
	}

Or

	{
		"error":
		{
			"msg": "没有数据记录",  
			"code":"11001"  
		}
	}

	
Or

	{
		"error":
		{
			"msg": "用户名不存在或动态令牌已过期",  
			"code":"00000"  
		}
	}


##三、电子钥匙管理    

###12、添加电子钥匙  

功能说明： 用户添加电子钥匙 


```
适用群体：Web端
URL：https://www.smartlock.top/v0/addKey 	    		
请求方式：POST
```	

请求参数：operatorName=""&accessToken=""&keyID=""...   application/x-www-form-urlencoded

|   参数名       	|   类型  | 必须 | 说明        									|  
| :------:   	    | :----:  | :--: | :----------------------------------------: 	| 
|operatorName   	| String  | Yes  | 操作者用户账号-用户名        				|  
|accessToken 		| String  | Yes  | 操作者API动态令牌							| 
|keyID	  		    | String  |	Yes  | 唯一的电子钥匙标识                           |
|managementProvince	| String  |	No	 | 有效省级地域                                 |
|managementCity		| String  |	No	 | 有效市级地域                                 |
|managementArea		| String  |	No	 | 有效区级地域                                 |


服务器返回参数：

	{
		"success":
		{
			"msg": "电子钥匙添加成功",
			"code":"12000"
		｝
	}

Or

	{
		"error":
		{
			"msg": "电子钥匙已存在",
			"code":"12001"
		}
	}

Or

	{
		"error":
		{
			"msg": "用户名不存在或动态令牌已过期",  
			"code":"00000"  
		}
	}


###13、删除电子钥匙 

功能说明： 用户删除指定的电子钥匙 


```
适用群体：Web端
URL：https://www.smartlock.top/v0/deleteKey 				    		
请求方式：POST
```	

请求参数：operatorName=""&accessToken=""&deleteList=[keyID1,keyID2]...   application/x-www-form-urlencoded

|   参数名       	|   类型  | 必须 | 说明        									|  
| :------:   	    | :----:  | :--: | :----------------------------------------: 	| 
|operatorName   	| String  | Yes  | 操作者用户账号-用户名        				|  
|accessToken 		| String  | Yes  | 操作者API动态令牌							| 
|deleteList	  		| String  |	Yes  | 电子钥匙ID列表                               |



服务器返回参数：

	{
		"success":
		{
			"msg": "电子钥匙删除成功",
			"code":"13000"
		｝
	}

Or

	{
		"error":
		{
			"msg": "用户名不存在或动态令牌已过期",  
			"code":"00000"  
		}
	}


###14、编辑电子钥匙
功能说明： 用户编辑指定的电子钥匙 


```
适用群体：Web端
URL：https://www.smartlock.top/v0/updateKey 			    		
请求方式：POST
```	

请求参数：operatorName=""&accessToken=""&keyID=""...   application/x-www-form-urlencoded

|参数名       		| 类型    | 必须 | 说明        									|  
|:------:   	    | :----:  | :--: | :----------------------------------------: 	| 
|operatorName   	| String  | Yes  | 操作者用户账号-用户名        				|  
|accessToken 		| String  | Yes  | 操作者API动态令牌							| 
|originalKeyID	    | String  |	Yes  | 唯一的电子钥匙标识                           |
|keyID	  		    | String  |	No   | 唯一的电子钥匙标识                           |
|managementProvince	| String  |	No	 | 有效省级地域                                 |
|managementCity		| String  |	No	 | 有效市级地域                                 |
|managementArea		| String  |	No	 | 有效区级地域                                 |


服务器返回参数：

	{
		"success":
		{
			"msg": "电子钥匙信息编辑成功",
			"code":"14000"
		｝
	}

Or

	{
		"error":
		{
			"msg": "电子钥匙ID已存在",
			"code":"14001"
		}
	}

Or

	{
		"error":
		{
			"msg": "用户名不存在或动态令牌已过期",  
			"code":"00000"  
		}
	}

###15、查询电子钥匙
功能说明： 用户查询指定的电子钥匙 


```
适用群体：Web端
URL：https://www.smartlock.top/v0/queryKey 				    		
请求方式：POST
```	

请求参数：operatorName=""&accessToken=""&keyID=""...   application/x-www-form-urlencoded

|   参数名       	|   类型  | 必须 | 说明        									|  
| :------:   	    | :----:  | :--: | :----------------------------------------: 	| 
|operatorName   	| String  | Yes  | 操作者用户账号-用户名        				|  
|accessToken 		| String  | Yes  | 操作者API动态令牌							| 
|keyID	  		    | String  |	No   | 唯一的电子钥匙标识                           |
|managementProvince	| String  |	No	 | 有效省级地域                                 |
|managementCity		| String  |	No	 | 有效市级地域                                 |
|managementArea		| String  |	No	 | 有效区级地域                                 |


服务器返回参数：

	{
		"success":
		{
			[
				{
					电子钥匙信息
				｝,


				...
				{
					电子钥匙信息
				｝				
			]
		}
	}
	

Or

	{
		"error":
		{
			"msg": "没有查询记录",
			"code":"15001"
		}
	}

Or

	{
		"error":
		{
			"msg": "用户名不存在或动态令牌已过期",  
			"code":"00000"  
		}
	}

###16、电子钥匙信息Excel下载请求接口
功能说明： 用户添加电子钥匙 


```
适用群体：Web端
URL：https://www.smartlock.top/v0/downloadKey 				
请求方式：POST
```	

请求参数：operatorName=""&accessToken=""&keyID=""...   application/x-www-form-urlencoded

|   参数名       	|   类型  | 必须 | 说明        									|  
| :------:   	    | :----:  | :--: | :----------------------------------------: 	| 
|operatorName   	| String  | Yes  | 操作者用户账号-用户名        				|  
|accessToken 		| String  | Yes  | 操作者API动态令牌							| 
|keyID	  		    | String  |	No   | 唯一的电子钥匙标识                           |
|managementProvince	| String  |	No	 | 有效省级地域                                 |
|managementCity		| String  |	No	 | 有效市级地域                                 |
|managementArea		| String  |	No	 | 有效区级地域                                 |


服务器返回参数：

	{
		"success":
		{
			"url": "电子钥匙信息下载URL",
			"code":"16000"
		｝
	}

Or

	{
		"error":
		{
			"msg": "没有数据记录",
			"code":"16001"
		}
	}

Or

	{
		"error":
		{
			"msg": "用户名不存在或动态令牌已过期",  
			"code":"00000"  
		}
	}




##四、任务申请和授权管理	
###17、开门工单任务申请（工程师）
功能说明：工程师开门申请指定的工单任务


```
适用群体：Web端
URL：https://www.smartlock.top/v0/taskRequest	
请求方式：POST
```	

请求参数：operatorName=""&accessToken="...   application/x-www-form-urlencoded

|   参数名    		|   类型  | 必须 | 说明        								    |  
| :------:    		| :----:  | :--: | :----------------------------------------: 	| 
|operatorName   	| String  | Yes  | 操作者用户账号-用户名        				|  
|accessToken 		| String  | Yes  | 操作者API动态令牌							| 
|stationAddress     | String  | Yes  | 基站地址                                     |
|applicantName   	| String  | Yes  | 申请者姓名      							    |  
|applicantCompany 	| String  | Yes  | 申请者所属公司								| 
|applicantPhone	    | String  |	Yes  | 申请者联系方式                         		|
|applicantKeyID   	| String  | Yes  | 申请授权的电子钥匙ID       					|  
|applicationType    | String  | Yes  | 申请任务紧急情况								| 
|applyDescription	| String  |	Yes  | 申请描述                           			|
|taskStartTime	  	| String  |	Yes  | 申请开门的起始时间                          	|
|taskEndTime	    | String  |	Yes  | 申请开门的起始时间                         	|
|taskTimes		   	| String  | Yes  | 申请开门的次数      							|  



服务器返回参数：

	{
		"success":
		{
			"msg": "任务申请工单申请成功!",  
			"code":"17000"  
		｝
	}

Or

	{
		"error":
		{
			"msg": "用户名不存在或动态令牌已过期",  
			"code":"00000"  
		}
	}




###18、开门工单任务抓取（管理员定时调用）
功能说明：管理员抓取指定的工单任务，从而完成后续授权处理


```
适用群体：Web端
URL：https://www.smartlock.top/v0/taskFetch	
请求方式：POST
```	

请求参数：operatorName=""&accessToken="...   application/x-www-form-urlencoded

|   参数名    		|   类型  |  必须 	| 说明        								 |  
| :------:   	    | :----:  | :--:    |:----------------------------------------:  | 
|operatorName   	| String  | Yes  	| 操作者用户账号-用户名        				 |  
|accessToken 		| String  | Yes  	| 操作者API动态令牌							 | 
|approvalPerson	    | String  | Yes     | 审批人姓名							     | 
|approvalPhone		| String  | No      | 审批人联系方式                             |
|applicantName   	| String  | No  	| 申请人名字      							 |  
|applicationType   	| String  | No      | 工单类型      							 |  
|applicationStatus  | String  | No      | 审批状态                                   |
|taskStartTime  	| String  | No      | 任务开始时间                               |
|taskEndTime  		| String  | No      | 任务结束时间                               |
|applyStartTime     | String  | No      | 任务申请时间起始时间                       |
|applyEndTime       | String  | No      | 任务申请时间终止时间                       |

服务器返回参数：

	{
		"success":
		{
			[
				{
					工单信息
				｝,


				...
				{
					工单信息
				｝				
			]
		}
	}

Or

	{
		"error":
		{
			"msg": "暂时没有需要处理的工单!",  
			"code":"18001"  
		}
	}
Or

	{
		"error":
		{
			"msg": "用户名不存在或动态令牌已过期",  
			"code":"00000"  
		}
	}

Or

	{
		"error":
		{
			"msg": "请输入任务申请工单ID!",  
			"code":"00004"  
		}
	}




###19、开门工单任务授权（管理员审批任务）
功能说明：管理员审批工单任务


```
适用群体：Web端
URL：https://www.smartlock.top/v0/taskAuthenticate	
请求方式：POST
```	

请求参数：operatorName=""&accessToken="...   application/x-www-form-urlencoded

|   参数名    		|   类型    |  必须 | 说明        								 |  
| :------:    		| :----:    | :--:  |:----------------------------------------:  | 
|operatorName   	| String  	| Yes  	| 操作者用户账号-用户名        				 |  
|accessToken 		| String  	| Yes  	| 操作者API动态令牌							 | 
|taskID	            | String   	| Yes   | 工单ID								     | 
|applicationStatus  | String   	| Yes   | 同意，拒绝，延期 ，等待处理                |




服务器返回参数：

	{
		"success":
		{
			"msg": "任务工单信息授权成功!",  
			"code":"19000"  
		｝
	}

Or

	{
		"error":
		{
			"msg": "请输入任务申请工单ID!",  
			"code":"00004"  
		}
	}
Or

	{
		"error":
		{
			"msg": "用户名不存在或动态令牌已过期",  
			"code":"00000"  
		}
	}



###20、开门工单任务申请状态抓取（工程师定时调用）
功能说明：工程师获取授权信息


```
适用群体：Web端
URL：https://www.smartlock.top/v0/taskAuthFetch	
请求方式：POST
```	

请求参数：operatorName=""&accessToken="...   application/x-www-form-urlencoded

|   参数名    		|   类型   |  必须  | 说明        								 |  
| :------:    		| :----:   | :--:   |:----------------------------------------:  | 
|operatorName   	| String   | Yes    | 操作者用户账号-用户名        				 |  
|accessToken 		| String   | Yes    | 操作者API动态令牌							 | 
|applicantName   	| String   | Yes    | 申请人名字      							 |  
|applicationStatus  | String   | No     | 任务工单状态                               |
|approvalPerson	    | String  | Yes     | 审批人姓名							     | 
|approvalPhone		| String  | No      | 审批人联系方式                             | 
|applicationType   	| String  | No      | 工单类型      							 |  
|taskStartTime  	| String  | No      | 任务开始时间                               |
|taskEndTime  		| String  | No      | 任务结束时间                               |

服务器返回参数：

	{
		"success":
		{
			[
				{
					工单信息
				｝,


				...
				{
					工单信息
				｝				
			]
		}
	}

Or

	{
		"error":
		{
			"msg": "请输入申请人的名字!",  
			"code":"20002"  
		}
	}
Or

	{
		"error":
		{
			"msg": "您没有申请任务!",  
			"code":"20001"  
		}
	}

Or

	{
		"error":
		{
			"msg": "用户名不存在或动态令牌已过期",  
			"code":"00000"  
		}
	}


###21、开门工单任务上传接口（工程师上传开门结果）
功能说明：工程师任务完成后上传工单完成信息


```
适用群体：Web端
URL：https://www.smartlock.top/v0/taskCommit	
请求方式：POST
```	

请求参数：operatorName=""&accessToken="...   application/x-www-form-urlencoded

|   参数名    		|   类型   |  必须  | 说明        								 |  
| :------:    		| :----:   | :--:   |:----------------------------------------:  | 
|operatorName   	| String   | Yes    | 操作者用户账号-用户名        				 |  
|accessToken 		| String   | Yes    | 操作者API动态令牌							 | 
|applicantName   	| String   | Yes    | 申请者姓名      						     |  
|taskDescription    | String   | Yes    | 任务完成的描述信息                         |
|taskStatus         | String   | Yes    | 完成，未完成，等等                         |


服务器返回参数：

	{
		"success":
		{
			"msg": "任务申请工单信息提交成功!",  
			"code":"21000"  
		｝
	}

Or

	{
		"error":
		{
			"msg": "用户名不存在或动态令牌已过期",  
			"code":"00000"  
		}
	}


###22、下载基站的开门申请任务记录日志
功能说明：


```
适用群体：Web端
URL：https://www.smartlock.top/v0/downloadTask	
请求方式：POST
```	

请求参数：operatorName=""&accessToken="...   application/x-www-form-urlencoded

|   参数名    		|   类型  | 必须 | 说明        									|  
| :------:    		| :----:  | :--: | :----------------------------------------: 	| 
|operatorName   	| String  | Yes  | 操作者用户账号-用户名        				|  
|accessToken 		| String  | Yes  | 操作者API动态令牌							| 
|taskID			   	| String  | No   | 任务ID号	      						    	|  
|applicantName   	| String  | No   | 申请者姓名      						    	|    
|applicationStatus  | String  | No   | 任务工单状态                              	|
|applicantCompany 	| String  | No   | 申请者所属公司								| 
|applicantPhone	    | String  |	No   | 申请者联系方式                         		|
|applicatKeyID   	| String  | No   | 申请授权的电子钥匙ID       					|  
|applicationType    | String  | No   | 申请任务紧急情况								| 
|stationID   	   	| String  | No   | 申请授权的基站ID      					    |  
|approvalPerson	    | String  | No   | 审批人姓名							    	| 
|approvalPhone		| String  | No   | 审批人联系方式                            	|




服务器返回参数：

	{
		"success":
		{
			"url": 'https://www.smartlock.top/'+fileName+'.xlsx',  
			"code":"22000"  
		｝
	}

Or

	{
		"error":
		{
			"msg": "没有数据记录!",  
			"code":"22001"  
		}
	}

Or

	{
		"error":
		{
			"msg": "用户名不存在或动态令牌已过期",  
			"code":"00000"  
		}
	}


###23、工单任务修改接口
功能说明：修改已提交的工单


```
适用群体：Web端
URL：https://www.smartlock.top/v0/taskChange	
请求方式：POST
```	

请求参数：operatorName=""&accessToken="...   application/x-www-form-urlencoded

|   参数名    		|   类型  | 必须 | 说明        									|  
| :------:    		| :----:  | :--: | :----------------------------------------: 	| 
|operatorName   	| String  | Yes  | 操作者用户账号-用户名        				|  
|accessToken 		| String  | Yes  | 操作者API动态令牌							| 
|originalTaskID		| String  | Yes  | 任务原始ID号	      						    |  
|taskID			   	| String  | No   | 任务ID号	      						    	|  
|applicantName   	| String  | No   | 申请者姓名      						    	|    
|applicationStatus  | String  | No   | 任务工单状态                              	|
|applicantCompany 	| String  | No   | 申请者所属公司								| 
|applicantPhone	    | String  |	No   | 申请者联系方式                         		|
|applicatKeyID   	| String  | No   | 申请授权的电子钥匙ID       					|  
|applicationType    | String  | No   | 申请任务紧急情况								| 
|stationID   	   	| String  | No   | 申请授权的基站ID      					    |  




服务器返回参数：

	{
		"success":
		{
			"msg": "任务工单信息修改成功!",  
			"code":"23000"  
		｝
	}

Or

	{
		"error":
		{
			"msg": "没有数据记录!",  
			"code":"23001"  
		}
	}

Or

	{
		"error":
		{
			"msg": "用户名不存在或动态令牌已过期",  
			"code":"00000"  
		}
	}








##四、基站日志管理
###24、查询基站日志  
功能说明：查询指定的基站日志 


```
适用群体：Web端
URL：https://www.smartlock.top/v0/queryStationLog	
请求方式：POST
```	

请求参数：operatorName=""&accessToken="...   application/x-www-form-urlencoded

|   参数名    		|   类型  | 必须 | 说明        								    |  
| :------:    		| :----:  | :--: | :----------------------------------------: 	| 
|operatorName   	| String  | Yes  | 操作者用户账号-用户名        				|  
|accessToken 		| String  | Yes  | 操作者API动态令牌							| 
|stationID	  		| String  |	No   | 唯一的基站标识                               |
|address	  		| String  |	No	 | 基站地址                                     | 
|startTime	  		| String  |	No   | 起始时间时间戳	                            |
|endTime	  		| String  |	No	 | 结束时间时间戳                               | 
|stationManagementProvince	| String  |	No	 | 有效省级地域                                 |
|stationManagementCity		| String  |	No	 | 有效市级地域                                 |
|stationManagementArea		| String  |	No	 | 有效区级地域                                 |


服务器返回参数：

	{
		"success":
		{
			[
				{
					基站日志一
				｝,


				...
				{
					基站日志二
				｝				
			]
		}
	}
	
Or

	{
		"error":
		{
			"msg": "没有查询记录!",  
			"code":"24001"  
		}
	}

Or

	{
		"error":
		{
			"msg": "用户名不存在或动态令牌已过期",  
			"code":"00000"  
		}
	}




###25、下载基站日志Excel表格
功能说明：根据指定信息生成基站日志Excel表格，返回下载链接


```
适用群体：Web端
URL：https://www.smartlock.top/v0/downloadStationLog	
请求方式：POST
```	

请求参数：operatorName=""&accessToken="...   application/x-www-form-urlencoded

|   参数名        	|   类型  | 必须 | 说明        									|  
| :------:    		| :----:  | :--: | :----------------------------------------: 	| 
|operatorName   	| String  | Yes  | 操作者用户账号-用户名        				|  
|accessToken 		| String  | Yes  | 操作者API动态令牌							| 
|stationID	  		| String  |	No   | 唯一的基站标识                               |
|address	  		| String  |	No	 | 基站地址                                     | 
|startTime	  		| String  |	No   | 起始时间时间戳	                            |
|endTime	  		| String  |	No	 | 结束时间时间戳                               | 
|stationManagementProvince	| String  |	No	 | 有效省级地域                                 |
|stationManagementCity		| String  |	No	 | 有效市级地域                                 |
|stationManagementArea		| String  |	No	 | 有效区级地域                                 |

服务器返回参数：

	{ 
		"success":  
		{  
			"url": "https://www.smartlock.top/log.xlsx",  
			"code":"25000"  
		}  
	}

Or

	{
		"error":
		{
			"msg": "没有数据记录",  
			"code":"25001"  
		}
	}

	
Or

	{
		"error":
		{
			"msg": "用户名不存在或动态令牌已过期",  
			"code":"00000"  
		}
	}



##五、电子钥匙日志管理
###26、查询电子钥匙日志  
功能说明：查询指定的电子钥匙日志 


```
适用群体：Web端
URL：https://www.smartlock.top/v0/queryKeyLog	
请求方式：POST
```	

请求参数：operatorName=""&accessToken="...   application/x-www-form-urlencoded

|   参数名    		|   类型  | 必须 | 说明        								    |  
| :------:    		| :----:  | :--: | :----------------------------------------: 	| 
|operatorName   	| String  | Yes  | 操作者用户账号-用户名        				|  
|accessToken 		| String  | Yes  | 操作者API动态令牌							| 
|keyID		  		| String  |	No   | 唯一的电子钥匙标识                           |
|startTime	  		| String  |	No   | 起始时间时间戳	                            |
|endTime	  		| String  |	No	 | 结束时间时间戳                               | 
|keyManagementProvince	| String  |	No	 | 有效省级地域                                 |
|keyManagementCity		| String  |	No	 | 有效市级地域                                 |
|keyManagementArea		| String  |	No	 | 有效区级地域                                 |


服务器返回参数：

	{
		"success":
		{
			[
				{
					电子钥匙日志一
				｝,


				...
				{
					电子钥匙日志二
				｝				
			]
		}
	}
	
Or

	{
		"error":
		{
			"msg": "没有查询记录!",  
			"code":"26001"  
		}
	}

Or

	{
		"error":
		{
			"msg": "用户名不存在或动态令牌已过期",  
			"code":"00000"  
		}
	}




###27、下载电子钥匙日志Excel表格
功能说明：根据指定信息生成电子钥匙日志Excel表格，返回下载链接  

```
适用群体：Web端
URL：https://www.smartlock.top/v0/downloadKeyLog	
请求方式：POST
```	

请求参数：operatorName=""&accessToken="...   application/x-www-form-urlencoded

|   参数名        	|   类型  | 必须 | 说明        									|  
| :------:    		| :----:  | :--: | :----------------------------------------: 	| 
|operatorName   	| String  | Yes  | 操作者用户账号-用户名        				|  
|accessToken 		| String  | Yes  | 操作者API动态令牌							| 
|keyID		  		| String  |	No   | 唯一的电子钥匙标识                           |
|startTime	  		| String  |	No   | 起始时间时间戳	                            |
|endTime	  		| String  |	No	 | 结束时间时间戳                               | 
|keyManagementProvince	| String  |	No	 | 有效省级地域                                 |
|keyManagementCity		| String  |	No	 | 有效市级地域                                 |
|keyManagementArea		| String  |	No	 | 有效区级地域                                 |

服务器返回参数：

	{ 
		"success":  
		{  
			"url": "https://www.smartlock.top/log.xlsx",  
			"code":"27000"  
		}  
	}

Or

	{
		"error":
		{
			"msg": "没有数据记录",  
			"code":"27001"  
		}
	}

	
Or

	{
		"error":
		{
			"msg": "用户名不存在或动态令牌已过期",  
			"code":"00000"  
		}
	}




###28、从Excel表格中导入信息
功能说明：用户先上传文件到服务器，然后指定使用哪个文件导入数据到后台数据库哪个表单


```
适用群体：Web端
URL：https://www.smartlock.top/v0/importDataFromExcel	
请求方式：POST
```	

请求参数：operatorName=""&accessToken="...   application/x-www-form-urlencoded

|   参数名        	|   类型  | 必须 | 说明        									|  
| :------:    		| :----:  | :--: | :----------------------------------------: 	| 
|operatorName   	| String  | Yes  | 操作者用户账号-用户名        				|  
|accessToken 		| String  | Yes  | 操作者API动态令牌							| 
|filename		  	| String  |	No   | 文件名                         				|
|importDestination	| String  |	No   | 导入目标：0--基站，1--电子钥匙	            |


服务器返回参数：

	{ 
		"success":  
		{  
			"msg": "导入成功，请在前台查看",  
			"code":"28000"  
		}  
	}


Or

	{
		"error":
		{
			"msg": "您指定的文件不存在",  
			"code":"28001"  
		}
	}


Or

	{
		"error":
		{
			"msg": "文件格式不符合规范",  
			"code":"28002"  
		}
	}


Or

	{
		"error":
		{
			"msg": "导入目标填写错误",  
			"code":"28003"  
		}
	}

	
Or

	{
		"error":
		{
			"msg": "用户名不存在或动态令牌已过期",  
			"code":"00000"  
		}
	}

