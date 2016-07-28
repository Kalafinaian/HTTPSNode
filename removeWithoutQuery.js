//fluent query example
//db.user.where('age').gte(21).lte(65).select('name age -_id').sort("-age name");
db.stationInfo.remove({address:{$regex: '[^四川省成都市建设北路二段四号基站]', $options:'i'}})