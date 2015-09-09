var info = require("./database").info;
var Sequelize = require('sequelize');
var databaseModel = require("./databaseModel");

function manage(act, table, field, condition, cb) {
	console.log("Accessing database.");
	var sequelize = new Sequelize(info.database, info.username, info.password,
			info.option);
	var model = new databaseModel.model(sequelize);
	var manageList = {
		user : model.user,
		product : model.product,
		comment : model.comment
	}
	var tableObj = manageList[table];

	if (act == "select") {
		console.log("Retreiving data.");
		if (condition == "") {
			tableObj.findAll().then(function(objs) {
				cb(objs);
			});
		}
		else{
			tableObj.findOne({ where: condition}).then(function(obj){
				cb(obj);
			});
		}
	} else if (act == "insert") {

	} else if (act == "update") {

	} else if (act == "delete") {

	}
}

exports.manage = manage;
