
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');
var fs = require("fs");
var dataJS = require(__dirname +'/googlesheets');
var Users = require(__dirname +'/User');
var Papa = require("papaparse");
var doc = new GoogleSpreadsheet('1DVgMG20OgfLR0leaJvzOiHDxp19EoyGKHTJxUCnxoX0');

//This takes in a CSV(Jobs/Programs), a Sheet to Edit, An APIKEY and a callback function.
//First you check the API key to load the page. If the k contains. We clear the sheet off screen and then parse the CSV and create a sheet row by row.

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
else{
  //return error;
}
}
//This takes in a CSV, filename, an array of parameters, an apikey and a callback.
//It checks to see if APIkey works, then we clear sheet, parse the CSV and run a for loop to check if each parameter in the row "matches" the param array. We will ahve to figure that out to compare data but if it's true for how many ever elemtns in array. The info will be added by a row.


exports.selectParameter= function(csv, filename, param, apikey, callback){
  //var meetsConditions = false;
  var k = checkAPI(apikey);
  if(k==true){
      dataJS.clearSheet(filename,function(){
        Papa.parse((this.csv).files[0], {
          step: function(row){
            for(var i=0; i<param.length; i++){
              doc.getCells(1, {'min-col': param[0], 'max-col': param[param.length]}, function(err, cells){
                  if(cells[i] == param[i]){
                    if(i==param.length){
                        dataJS.createRow(this.filename, this.row, function(){
                          console.log("Row has been added to CSV with Param selector");
                        });
                    }
                    else{
                      continue;
                    }
                  }
                  else{
                    break;
                  }
              });
            }
          },
          complete: function(){
            console.log("This parse and clear has been complete");
          }
        });
      });
    callback();
  }
  else{
    //return error;
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
