var path = require("path");
var url = require("url");

function route(handle, request, response){
	var pathname = url.parse(request.url).pathname;
	if(pathname == "/") pathname = "/home";
	var ext = path.extname(pathname);
	
	if(typeof handle[pathname] === "function"){
		console.log("Handling request " + pathname);
		handle[pathname](pathname, request, response);
	}
	else if(typeof handle[ext] === "function"){
		console.log("Handling request " + pathname);
		handle[ext](pathname, request, response);
	}
	else{
		console.log("Error path: " + pathname);
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("404 Not Found.")
		response.end();
	}
}

exports.route = route;