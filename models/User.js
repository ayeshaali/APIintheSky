var fs = require("fs");
var dataJS = require(__dirname +'/googlesheets');
<<<<<<< HEAD

=======
>>>>>>> 967fa76914b2c9655dc6fcb47fcd6e8b5b316894
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
<<<<<<< HEAD
    if (user_id==null||user_id==""||first_name==null||first_name==""||last_name==null||last_name==""||user_password==null||user_password==""||user_key==null){
=======
    if (user_id==null||user_id==""||user_password==null||user_password==""){
>>>>>>> 967fa76914b2c9655dc6fcb47fcd6e8b5b316894
        dataJS.log("inv");
        result= false;
        feedbackN = 42;
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
