var Sequelize = require('sequelize');

function model(sequelize) {
	this.product = sequelize.define("product", {
		id : {
			type : Sequelize.INTEGER,
			field : "id"
		},
		img : {
			type : Sequelize.STRING,
			field : "img"
		},
		title : {
			type : Sequelize.STRING,
			field : "title"
		},
		description : {
			type : Sequelize.STRING(1024),
			field : "description"
		},
		price : {
			type : Sequelize.INTEGER,
			field : "price"
		},
		user : {
			type : Sequelize.STRING,
			reference : {
				model : "user",
				key : "name"
			}
		}
	});
	this.user = sequelize.define("user",{
		name : {
			type : Sequelize.STRING,
			field : "name"
		},
		password : {
			type : Sequelize.STRING,
			field : "password"
		}
	});
}

exports.model = model;