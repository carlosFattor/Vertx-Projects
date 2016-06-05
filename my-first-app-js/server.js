var Router = require("vertx-web-js/router");
var UserFlow = require("./flow/UserFlow");
var UserActionRouter = require("./actions/UserActionRouter");

var server = vertx.createHttpServer();
var router = Router.router(vertx);

var user = new UserActionRouter(router);

server.requestHandler(router.accept).listen(8081);