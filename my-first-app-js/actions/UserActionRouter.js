var BodyHandler = require("vertx-web-js/body_handler");
var StaticHandler = require("vertx-web-js/static_handler");

var eb = vertx.eventBus();

module.exports = function (router) {
    router.route('GET', "/api/users/:id").handler(getOne);
    router.route('GET', "/api/users").handler(getAll);
    router.route('POST', "/api/users").handler(addOne);
    
    // This body handler will be called for all routes
    router.route().handler(BodyHandler.create().handle);
    // Serve the static resources
    router.route().handler(StaticHandler.create().handle);
    
    console.log("Server UP");
}

function addOne(context) {
    context.request().bodyHandler(function(data){
       var user = JSON.stringify(JSON.parse(data.toString()));
        console.log("addOne-> " + user);
        eb.send("user.post.one", user, function (ar, ar_err) {
            if(ar_err == null){
                context.response()
                    .setChunked(true)
                    .putHeader("content-type", "application/json")
                    .setStatusCode(200)
                    .write(JSON.stringify(ar.body()))
                    .end();
            } else {
                context.response()
                .setChunked(true)
                .putHeader("content-type", "application/json")
                .setStatusCode(404)
                .write({"status":"Fail"})
                .end();
            }
        });
    });    
};

function getOne(context) {
    var userId = context.request().getParam("id") || "";
    eb.send("user.get.id", { 'id': userId }, function (ar, ar_err) {
        if(ar_err == null){
            context.response()
                .setChunked(true)
                .putHeader("content-type", "application/json")
                .setStatusCode(200)
                .write(JSON.stringify(ar.body()))
                .end();
        } else {
            context.response()
                .setChunked(true)
                .putHeader("content-type", "application/json")
                .setStatusCode(404)
                .write("NOK")
                .end();
        }
    });
};

function getAll(context) {
    eb.send("user.get.all", { 'msg': "get all users" }, function (ar, ar_err) {
        context.response()
            .putHeader("content-type", "application/json")
            .setChunked(true)
            .setStatusCode(200)
            .write(JSON.stringify(ar.body())).end();
    });
};