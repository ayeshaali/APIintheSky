
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');
var fs = require("fs");
var dataJS = require(__dirname +'/googlesheets');
var Users = require(__dirname +'/User');
var Papa = require("papaparse");
var doc = new GoogleSpreadsheet('1DVgMG20OgfLR0leaJvzOiHDxp19EoyGKHTJxUCnxoX0');
var GSParser = require ('google-spreadsheets-parser');



//Takes in a filename (sheet=1;sheet=2); param=Array of Parameters to filter, an apiKey and a callback function;
//Function loads the Google Sheet --> Get the Rows --> Check the values of each row and pushes it to a JSONObj. Then we create a new arrays that filter through each of the parameters
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
    //checks which File and Parses for DETAILS
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
  return finalJSON;
  callback(); //see if this is necessary
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
