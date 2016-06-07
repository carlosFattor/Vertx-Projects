var eb = vertx.eventBus();

var users = [{id: 1, name: "Carlos", idade: "21"},
             {id: 2, name: "Fattor", idade: "33"}];

var myUser = {};

var flows = function() {
    eb.consumer("user.get.id", function(msg){
        var userId = msg.body().id;
        users.forEach(function (u) {
            if (u.id == userId) {
                myUser = u;
            } 
        });
        msg.reply(myUser);
    });

    eb.consumer("user.get.all").handler(function(msg) {
        msg.reply(users);
    });
    
    eb.consumer("user.post.one").handler(function(msg){
        var user = JSON.parse(msg.body().toString());
        user.id = users.length+1;
        users.push(user);
        msg.reply(users); 
    });
    
    eb.consumer("user.delete.one").handler(function(msg){
       var userId = msg.body().id;
       users.splice(userId, 1);
       msg.reply(users);
    });
};

module.export = flows();

