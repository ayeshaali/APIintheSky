var fs = require("fs");
var dataJS = require(__dirname +'/googlesheets');

//gets a user
exports.getUser = function(user_id, callback) {
  dataJS.log("getUser: "+user_id+" at "+ new Date());
  var user = createBlankUser();
  var all_users = dataJS.loadGoogle(1, function(all_users) {
    for(var i=0; i<all_users.length; i++){
      if(all_users[i].name==user_id.trim()){
        user = all_users[i];
        break;
      }
    }
    callback(user);
  });
}

//creates a user
exports.createUser = function(user_id, user_password,first_name,last_name, callback) {
    dataJS.log("createUser: "+user_id+" at "+ new Date());
    var result = true;
    var feedbackN = 0;
    if (user_id==null||user_id==""||user_password==null||user_password==""){
        dataJS.log("inv");
        result= false;
        feedbackN = 42;
    }
    var user_key = makeid(10);
    dataJS.getAllKeys(function(keys){
      while (keys.includes(user_key)){
        user_key = makeid(10);
      }
      
      exports.getUser(user_id, function(user){
        if (user.name != "notarealuser") {
          result = false;
          feedbackN = 10;
        }

        if (result) {
          date=returnDate();
          var new_obj = {
            "name": user_id,
            "pswd": user_password,
            "key": user_key
          }
          dataJS.createRow(new_obj, function(){
            dataJS.log("Calling second callback")
            callback(true, feedbackN);
          })
        } else {
          callback(false, feedbackN);
        }
      })
      
    })
    
}

//deletes a user
exports.deleteUser = function(user_id, callback) {
  dataJS.log("deleteUser: "+user_id+" at "+ new Date());
  dataJS.deleteRow(user_id, callback)
}

//updates the date for a user
exports.updateUser = function(user_id, updates, callback) {
  dataJS.log("updateUser: "+user_id+" at "+ new Date());
  dataJS.updateRow(0, user_id, updates, function(){
    console.log("doing next");
    callback();
  });
}

function makeid(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
