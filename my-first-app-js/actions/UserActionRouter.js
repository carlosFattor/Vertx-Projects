var BodyHandler = require("vertx-web-js/body_handler");
var StaticHandler = require("vertx-web-js/static_handler");

var eb = vertx.eventBus();

module.exports = function (router) {

    // This body handler will be called for all routes
    router.route().handler(BodyHandler.create().handle);
    // Serve the static resources
    router.route().handler(StaticHandler.create().handle);

    router.route('GET', "/api/users/:id").handler(getOne);
    router.route('GET', "/api/users").handler(getAll);
    router.route('POST', "/api/users").handler(addOne);
}

function addOne(context) {
    var user = context.getBodyAsJson();
    console.log("adding-> " + JSON.stringify(user));
    eb.send("user.post.one", user, function (ar, ar_err) {
        context.response()
            .putHeader("content-type", "application/json")
            .setChunked(true)
            .setStatusCode(200)
            .write("Added")
            .end();
    });
};

function getOne(context) {
    var userId = context.request().getParam("id") || "";
    console.log("getOne-> " + JSON.stringify(userId));
    eb.send("user.get.id", { id: userId }, function (ar, ar_err) {
        context.response()
            .setChunked(true)
            .putHeader("content-type", "application/json")
            .setStatusCode(200)
            .write(JSON.stringify(ar.body())).end();
    });
};
function getAll(context) {
    eb.send("user.get.all", { msg: 'get all users' }, function (ar, ar_err) {
        console.log("getAll-> " + Json.stringify(users));
        context.response()
            .putHeader("content-type", "application/json")
            .setChunked(true)
            .setStatusCode(200)
            .write(JSON.stringify(ar.body()))
            .end();
    });
};