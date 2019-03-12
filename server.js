//PRS Showdown
//Authors: Sadi Gulcelik, Ayesha Ali
//Date: 1/18/19

//required packages
var express = require('express');
var fs = require('fs');
var favicon = require('serve-favicon');
var app = express();
var Users = require(__dirname +'/models/User');
var Villains = require(__dirname +'/models/Villain');
var dataJS = require(__dirname +'/models/data');
var Routes = require(__dirname +'/controllers/user');
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

//set up server
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/images/logo.png'));
app.use(express.urlencoded());

//variables for login and villain strategies
var villainPrevious=Villains.randomChoice();
var userPrevious=Villains.randomChoice();
fs.writeFileSync("data/villainPrevious.txt",villainPrevious,'utf8')
fs.writeFileSync("data/userPrevious.txt",userPrevious,'utf8')

var error = false;

var port = process.env.PORT || 3000;
app.listen(port, function(){
  dataJS.log('Server started at '+ new Date()+', on port ' + port+'!');
});

app.use(require('./controllers/user'));
//first request, renders index
app.get('/', function(request, response){
    dataJS.increment("index");
  var user_data={};
  userName = "";
  userPSWD = "";
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index', {page:request.url, user:user_data, title:"Index"});
});