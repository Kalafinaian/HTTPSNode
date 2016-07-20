db.userInfo.find({userType:{$type:Type Number}}).forEach(function(x){ 
	x.userType=new String(x.userType); 
	db.userInfo.save(x); 
}); 


db.userInfo.find({'userType' : { $type : 16 }}).forEach(function(x) {x.userType = String(x.userType);db.userInfo.save(x); }) 


db.userInfo.find().forEach(function(x) {x.companyID = x.companyID.toString();db.userInfo.save(x); }) 

db.userInfo.find().forEach(function(x) {x.companyCode = String(x.companyCode);db.userInfo.save(x); }) 

db.userInfo.find().forEach(function(x) {x.password = String(x.password);db.userInfo.save(x); }) 

"NumberLong(\"13018217301\")"

db.userInfo.find().forEach(function(x) {x.phone = x.phone.replace("NumberLong(","");db.userInfo.save(x); }) 

db.userInfo.find().forEach(function(x) {x.phone = x.phone.replace("\\","");db.userInfo.save(x); }) 

db.userInfo.find().forEach(function(x) {x.phone = x.phone.replace("\"","");db.userInfo.save(x); }) 

db.userInfo.find().forEach(function(x) {x.phone = x.phone.replace(")","");db.userInfo.save(x); }) 

db.userInfo.find().forEach(function(x) {x.phone = x.phone.replace(")","");db.userInfo.save(x); }) 