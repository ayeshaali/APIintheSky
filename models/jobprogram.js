
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');
var fs = require("fs");
var dataJS = require(__dirname +'/googlesheets');
var Users = require(__dirname +'/User');
var Papa = require("papaparse");

//This takes in a CSV(Jobs/Programs), a Sheet to Edit, A
exports.loadSheetToPage = function(csv, filename, apikey, callback){
  var k = checkAPI(apikey);
if(k==true){
  dataJS.clearSheet(filename, function(){
    Papa.parse((this.csv).files[0],{ //parses big files by step
      step:function(row){
      dataJS.loadGoogle(filename, function(){
        dataJS.createRow(filename, row, function(){
          console.log("Row has been added to csv");
        });
      });
      },
      complete:function(){
        console.log("This parse has been completed and loadSheet")
      }
    });
});
  callback();
}
}
//just send param through array
exports.selectParameter= function(csv, filename, param, apikey, callback){
  var k = checkAPI(apikey);
  if(k==true){

  }
}

function checkAPI(apikey){
  var k = Users.getUser(apikey);
  if(k==true){
      return true;
  }
  else{
    return false;
  }
  //put something in here to check the API key
}
console.log("Truth for API Check" + truth);

















/
