var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();

var port = 5000;
var dir = 'public/videos/';

app.use(express.static(__dirname+'/public/'));
var server = http.createServer(app);

app.listen(port,function(req,res){
  console.log("server running on port "+port);
});

app.get('/subjects',function(req,res){
    var subjects = [];
    fs.readdirSync(dir).forEach(function(file){
        subjects.push(file.toString());
    });
    res.send(JSON.stringify(subjects));
});

app.get('/videos',function(req,res){
    var subject = (req.query).subject;
    console.log(subject);
    var videos = [];
    fs.readdirSync(dir+'/'+subject+'/videos/nptel/').forEach(function(file){
        videos.push(file);
    });
    res.send(JSON.stringify(videos));
});
