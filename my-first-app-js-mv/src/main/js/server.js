var Router = require("vertx-web-js/router");
var BodyHandler = require("vertx-web-js/body_handler");
var StaticHandler = require("vertx-web-js/static_handler");


var server = vertx.createHttpServer();
var router = Router.route(vertx);

// This body handler will be called for all routes
    router.route().handler(BodyHandler.create().handle);
    // Serve the static resources
    router.route().handler(StaticHandler.create().handle);


server.requestHandler(router.accept).listen(8080);