//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');

var oio = require('orchestrate');
oio.ApiEndPoint = "api.ctl-va1-a.orchestrate.io";
var db = oio("f2a9de59-2ffe-483b-b5bb-8534141519a2");


//
// ## SimpleServer `SimpleServer(obj)`node 
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));
var messages = [];
var sockets = [];
var test_string = "some text";
var increment = 0;

io.on('connection', function(socket) {
  messages.forEach(function(data) {
    socket.emit('message', data);
  });

  sockets.push(socket);

  socket.on('disconnect', function() {
    sockets.splice(sockets.indexOf(socket), 1);
    updateRoster();
  });

  socket.on('message', function(msg) {
    var text = String(msg || '');

    if (!text)
      return;

    socket.get('name', function(err, name) {
      var data = {
        name: name,
        text: text
      };

      broadcast('message', data);
      messages.push(data);
    });
  });

  socket.on('identify', function(name) {
    socket.set('name', String(name || 'Anonymous'), function(err) {
      updateRoster();
    });
  });

  socket.on('GET', function() {
    var retval;
    db.get('users', '1') //temporarily hardcoded!!!
      .then(function(res) {
        retval = res.body.name;
        socket.emit('GET_2', retval);
      })
      .fail(function(err) {
        console.log(err);
      });
  });

  socket.on('LOG', function(logged) { //logged should be searchLogged... we think...
    db.post('chowsearch', { //ravi says the hardcoded 1 is fine
        "data": logged
      })
      //we're creating our own field, "data"
      .then(function(res) {
        //console.log(res); // prints response
      })
      .fail(function(err) {
        console.log(err); // prints error
      });
  });

  socket.on('DELETE', function() { //FOR CODE TESTING PURPOSES ONLY
    db.deleteCollection("chowsearch");


  });

}); //end of socket connection

var product_1 = { result_id: 1,
        result_logo_url: "http://www.chowchecker.com/img/logos/Blue-Buffalo.png",
        result_petfood_name: "BLUE Basics Salmon &",
        cc_rating: 4,
        cost_per_cup: 1.40,
        calories_per_cup: 300,
        grams_per_cup: 80,
        food_type: "Treat",
        top_ingred: ["Salmon", "Whole Ground Brown", "Rice", "Oatmeal", "Potato", "Potato Protein"],
        crude_protein_min: 0.18,
        crude_protein_max: 0.34,
        crude_fat_min: 0.06,
        crude_fat_max: 0.4,
        crude_fibre_max: 0.05,
  
};



function product_addRecords(){
  
  
  
  
}

function updateRoster() {
  async.map(
    sockets,
    function(socket, callback) {
      socket.get('name', callback);
    },
    function(err, names) {
      broadcast('roster', names);
    }
  );
}

function broadcast(event, data) {
  sockets.forEach(function(socket) {
    socket.emit(event, data);
  });
}

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
