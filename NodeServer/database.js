var info = { 
	database : "platform", 
	username : "root", 
	password : "jiangwei", 
	option : {
		host : "localhost",
		dialect : "mysql",
		pool : {
			max : 5,
			min : 0,
			idle : 10000
		}
	} 
}

exports.info = info;