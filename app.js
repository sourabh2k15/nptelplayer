var http = require('http');
var express = require('express');
var app = express();

var port = 5000;
app.use(express.static(__dirname+'/public/'));

var server = http.createServer(app);
app.listen(port,function(req,res){
  console.log("server running on port "+port);
});
