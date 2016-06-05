var eb = vertx.eventBus();

var users = [{id: 1, name: "Carlos", idade: "21"},
             {id: 2, name: "Fattor", idade: "33"}];

var myUser = {};

var routes = function() {
    eb.consumer("user.get.id", function(userId){
        users.forEach(function (u) {
            if (u.id == userId.body().id) {
                myUser = u;
            } 
        });
        userId.reply(myUser);
    });

    eb.consumer("user.get.all").handler(function(msg) {
        console.log(" MSG-> "+JSON.stringify(msg.body()));
        msg.reply(users);
    });
    
    eb.consumer("user.post.one").handler(function(user){
        //user["id"] = users.length+1;
        users.push(user);
        user.reply(users); 
    });

};

module.export = routes();

