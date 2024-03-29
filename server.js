//API in the Sky
//Authors: Ayesha Ali, Thomas Brecher, Mit Ramesh

//required packages
var express = require('express');
var fs = require('fs');
var favicon = require('serve-favicon');
var app = express();
var Users = require(__dirname +'/models/User');
var Info = require(__dirname + '/models/jobprogram.js');
var methodOverride = require('method-override');
//set up server

app.use(methodOverride('_method'));

app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.urlencoded());


var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Server started at '+ new Date()+', on port ' + port+'!');
});


app.use(require(__dirname +'/controllers/user'));
app.use(require(__dirname +'/controllers/data'));
//first request, renders index
app.get('/', function(request, response){
  var user_data={};
  userName = "";
  userPSWD = "";
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index', {page:request.url, user:user_data, title:"Index"});
});
