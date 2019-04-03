
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');
var fs = require("fs");
var dataJS = require(__dirname +'/googlesheets');
var Users = require(__dirname +'/User');
var Papa = require("papaparse");


//need to test Papaparse. This takes in the csv file, the sheet (Filename) and callback then we use Papaparse to parse through CSV rows step-by-step for large data set and then add them to the sheet
//CSV is the NYC_Jobs.csv and Benefits and Programs API
//Filename is the Sheet 1 or 2
//Callback is any callback function


exports.loadSheetToPage = function(csv, filename, callback, apikey){
  //include check for APIKey
//We clear the sheet with the filename, then load the sheet and create new Rows.
  dataJS.clearSheet(filename, function(){
    console.log("Clear sheet");
  });

  dataJS.loadGoogle(filename, function(){
    Papa.parse((this.csv).files[0],{ //parses big files by step
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

//paramtype will be 1, 2, 3, 4 ,5
exports.sortByParam = function(paramtype, csv, filename, callback){
  //if API key is true, sort CSV then write row


  dataJS.clearSheet(filename, function(){
    console.log("Clear sheet");
  });

//Clear the Sheet and then sort by Param
//then list and display the CSV 




/*
  var parsedRow = [];
    Papa.parse((this.csv).files[0], {
      step:function(row){
          if(typeOf(paramtype) == array){
            for(var i=0; i<paramtype.length; i++){
              parsedRow.push(paramtype[i]);
              //dataJS.createRow(filename, )
            }
            dataJS.createRow(filename, parsedRow, function(){
              console.log("This has been parsed");
            }
          }
          else{
            dataJS.createRow(filename, row[paramtype], function(){
              console.log("Parameter Row has been added to CSV");
            });
          }
      }
    }
    */
}

function checkAPI(){
  //put something in here to check the API key
}











/*
exports.findParam(filename, user_id, param){
  dataJs.loadGoogle(userfile, function(params)){
  }
*/
  //get the user and the API key,
    //check if API Key is right?
    //parses CSV for whatever we need
    //sends back data
}


exports.findItem(filename, user_id, param, item){

}
