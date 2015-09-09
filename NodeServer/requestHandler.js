var fs = require("fs");
var qs = require("querystring");
var dbManager = require("./dbManager");
var exec = require("child_process").exec;
//var formidable = require("formidable");

function getHTML(pathname, request, response) {
	fs.readFile("./WebContent" + pathname + ".html", "utf-8", function(err,
			data) {
		if (err)
			throw err;
		response.writeHead(200, {
			"Content-Type" : "text/html"
		});
		response.write(data);
		response.end();
	});
}

function getCSS(pathname, request, response) {
	fs.readFile("." + pathname, "utf-8", function(err, data) {
		if (err)
			throw err;
		response.writeHead(200, {
			"Content-Type" : "text/css"
		});
		response.write(data);
		response.end();
	});
}

function getIMG(pathname, request, response) {
	fs.readFile("./WebContent/IMG" + pathname, "binary", function(err, data) {
		if (err)
			throw err;
		response.writeHead(200, {
			"Content-Type" : "image/png"
		});
		response.write(data, "binary");
		response.end();
	});
}

function getJS(pathname, request, response) {
	fs.readFile("." + pathname, "utf-8", function(err, data) {
		if (err)
			throw err;
		response.writeHead(200, {
			"Content-Type" : "application/javascript"
		});
		response.write(data);
		response.end();
	});
}

function getPrds(pathname, request, response) {
	console.log("Manage database request.");

	exec(dbManager.manage("select", "product", "*", "", function(objs) {
		response.writeHead(200, {
			"Content-Type" : "text/plain"
		});
		var products = [];
		var i = 0;
		while (i < objs.length) {
			products[i] = objs[i].dataValues;
			++i;
		}
		response.write(JSON.stringify({
			"products" : products
		}));
		response.end();
	}), function() {
	});
};

function login(pathname, request, response) {
	if(request.method == "POST"){
		var body = "";
		request.on("data", function(data){
			body += data;
			if(body.length > 1e6) request.connection.destroy();
		});
		request.on("end", function(){
			var post = qs.parse(body);
			dbManager.manage("select","user","*",{name: post.account}, function(obj){
				if(obj == null){
					response.writeHead(200, {
						"Content-Type" : "text/plain"
					});
					response.write("Wrong username.");
					response.end();
				}
				else if(obj.dataValues.password === post.password){
					response.writeHead(200, {
						"Content-Type" : "text/plain"
					});
					response.write("Login success!");
					response.end();
				}
				else{
					response.writeHead(200, {
						"Content-Type" : "text/plain"
					});
					response.write("Wrong password.");
					response.end();
				}
			})
		});
	}
}

exports.getHTML = getHTML;
exports.getCSS = getCSS;
exports.getIMG = getIMG;
exports.getJS = getJS;
exports.getPrds = getPrds;
exports.login = login;