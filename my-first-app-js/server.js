var Router = require("vertx-web-js/router");
var BodyHandler = require("vertx-web-js/body_handler");
var StaticHandler = require("vertx-web-js/static_handler");

var server = vertx.createHttpServer();

var router = Router.router(vertx);

var users = [{id: 1, name: "Carlos", idade: "21"},
			{id: 2, name: "Fattor", idade: "33"}];

router.route().handler(BodyHandler.create().handle);

router.get("/").handler(function(ctx) {
	var response = ctx.response();
	response.putHeader("content-type", "application/json; charset=utf-8");
	response.end("Hello World!");
});

var route1 = router.route("/some/path/").handler(function (routingContext) {

  var response = routingContext.response();
  // enable chunked responses because we will be adding data as
  // we execute over other handlers. This is only required once and
  // only if several handlers do output.
  response.setChunked(true);

  response.write("route1\n");

  // Call the next matching route after a 5 second delay
  routingContext.vertx().setTimer(5000, function (tid) {
    routingContext.next();
  });
});

var route2 = router.route("/some/path/").handler(function (routingContext) {

  var response = routingContext.response();
  response.write("route2\n");

  // Call the next matching route after a 5 second delay
  routingContext.vertx().setTimer(5000, function (tid) {
    routingContext.next();
  });
});

var route3 = router.route("/some/path/").handler(function (routingContext) {

  var response = routingContext.response();
  response.write("route3");

  // Now end the response
  routingContext.response().end();
});

router.route('GET', "/api/users/:id").handler(function(ctx){
	var myUser;
	var userId = ctx.request().getParam("id");

	users.forEach(function(u){
		if(u.id == userId){
			myUser = u;
		}
	});

	var response = ctx.response();
	response.setChunked(true)
		.putHeader("content-type", "application/json")
		.setStatusCode(200)
		.write(JSON.stringify(myUser));
	
	ctx.response().end();

});
router.route('GET', "/api/users").handler(function(ctx){
	var response = ctx.response();
	response
		.putHeader("content-type", "application/json")
		.setChunked(true)
		.setStatusCode(200)
		.write(JSON.stringify(users));

	ctx.response().end();
});


















// Serve the static resources
router.route().handler(StaticHandler.create().handle);

server.requestHandler(router.accept).listen(8080);