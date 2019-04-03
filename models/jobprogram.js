
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');
var fs = require("fs");
var dataJS = require(__dirname +'/googlesheets');
var User = require(__dirname +'/User');
var Papa = require("papaparse");


//need to test Papaparse. This takes in the csv file, the sheet (Filename) and callback then we use Papaparse to parse through CSV rows step-by-step for large data set and then add them to the sheet
exports.loadSheetToPage = function(csv, filename, callback){
  dataJS.loadGoogle(filename, function(){
    Papa.parse((this.csv).files[0]),{
      step:function(row){
        dataJS.createRow(filename, row, function(){
          console.log("Row has been added to csv");
        });
      },
      complete:function(){
        console.log("This parse has been completed and loadSheet")
      }
    }
  });
}












exports.findParam(filename, user_id, param){
  dataJs.loadGoogle(userfile, function(params)){


  }
  //get the user and the API key,
    //check if API Key is right?
    //parses CSV for whatever we need
    //sends back data
}


exports.findItem(filename, user_id, param, item){

}
