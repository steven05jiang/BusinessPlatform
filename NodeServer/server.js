var http = require("http");

function start(route, handle){
	function onRequest(request, response){
		console.log("Routing");
		route(handle, request, response);
	}
	http.createServer(onRequest).listen(8888);
	console.log("Server is on.");
}


exports.start = start;