
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');
var fs = require("fs");
var dataJS = require(__dirname +'/googlesheets');
var Users = require(__dirname +'/User');
var Papa = require("papaparse");
var doc = new GoogleSpreadsheet('1DVgMG20OgfLR0leaJvzOiHDxp19EoyGKHTJxUCnxoX0');
var GSParser = require ('google-spreadsheets-parser');



//Takes in a filename (sheet=1;sheet=2); param=Array of Parameters to filter, an apiKey and a callback function;
exports.ParamSelec = function(filename, param, apikey, callback){
  var jsonObj = {};
  var jsonArray = [];
  var k = checkAPI(apikey);
  if(k==true){
      dataJS.loadGoogle(filename,function(){
        doc.getRows(filename, function(err,rows){
          for(var i =0; i<rows.length; i++){
            var value = Object.values(rows[i]);
              if(filename==1){
                jsonObj = {"agency": value[0], "business_titleTitle": value[1], "job_category": value[3], "part_or_full": value[4], "Location": value[8]};
              }
              else{
                jsonObj = {"program_name": value[1], "benefit_type": value[2]  , "population_served": value[5] , "contact_info":value[9] ,  "summary": value[7] };
              }
              jsonArray.push(jsonObj);
            }
          });
        });

    if(filename==1){
        var k = jsonArray.filter(function(w){
          return param.agency == w.agency;
        });
        var k1 = k.filter(function(w)){
          return param.business_title == w.business_title;
        });
        var k2 = k1.filter(function(w)){
          return param.job_category == w.job_category;
        });
        var k3= k2.filter(function(w)){
          return param.part_or_full == w.part_or_full;
        });
        var finalJSON= k3.filter(function(w)){
          return param.location == w.location;
        });
    }

    else{
      var k = jsonArray.filter(function(w){
        return param.program_name == w.program_name;
      });
      var k1 = k.filter(function(w)){
        return param.benefit_type == w..benefit_type;
      });
      var k2 = k1.filter(function(w)){
        return param.population_served==w.population_served;
      });
      var k3= k2.filter(function(w)){
        return param.contact_info== w..contact_info;
      });
      var finalJSON= k3.filter(function(w)){
        return param.summary == w..summary;
      });
    }
  callback();
  return finalJSON;
  }
else{
    console.log("APIKey was not accepted");
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





//---------DELETED CODE-----------------------------------------------------------------------
//This takes in a CSV(Jobs/Programs), a Sheet to Edit, An APIKEY and a callback function.
//First you check the API key to load the page. If the k contains. We clear the sheet off screen and then parse the CSV and create a sheet row by row.
/*
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
        //convert to JSON
        console.log("This parse has been completed and loadSheet");
        //create Parameters
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
exports.ParamSelec = function(filename, headerlist, param, apikey, callback){
var JSONObject  = {};
  var k = checkAPI(apikey);
    if(k==true){
      dataJS.loadGoogle(filename,function(){
        doc.getRows(filename, {query:} function(err,rows){


      });


          for(var i=0; i<rows.length; i++){
            doc.getCells(filename,{'min-col': param[0], 'max-col': param[param.length]}, function(err, cells){

            });
          }
        });
      });
      */
    });
}




/*
exports.selectParameter= function(csv, filename, param, apikey, callback){
  //var meetsConditions = false;
  var k = checkAPI(apikey);
  if(k==true){
      //dataJS.clearSheet(filename,function(){
        Papa.parse((this.csv).files[0], {
          step: function(row){
            for(var i=0; i<param.length; i++){
              doc.getCells(1, {'min-col': param[0], 'max-col': param[param.length]}, function(err, cells){
                  if(cells[i] == param[i]){
                    if(i==param.length){
                      //append row to JSON object.
                      /*
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
    //  });
    callback();
  }
  else{
    //return error;
  }
}
*/
