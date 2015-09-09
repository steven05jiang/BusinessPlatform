var server = require("./server");
var router = require("./router");
var requestHandler = require("./requestHandler");

var handle={};
handle["/home"] = requestHandler.getHTML;
handle[".css"] = requestHandler.getCSS;
handle[".js"] = requestHandler.getJS;
handle[".jpg"] = requestHandler.getIMG;
handle["/products"] = requestHandler.getPrds; 
handle["/signup"] = requestHandler.getHTML; 
handle["/login"] = requestHandler.login;



server.start(router.route, handle);