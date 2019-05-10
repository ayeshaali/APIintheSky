
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require(__dirname +'/client_secret.json');
var fs = require("fs");
var dataJS = require(__dirname +'/googlesheets');
var Users = require(__dirname +'/User');
//var Papa = require("papaparse");
var doc = new GoogleSpreadsheet('1DVgMG20OgfLR0leaJvzOiHDxp19EoyGKHTJxUCnxoX0');
//var GSParser = require ('google-spreadsheets-parser');

exports.getJobById = function(id, filename, apikey, callback){
  var jsonArray = [];
  Users.getUserbyKey(apikey, function(k){
    if(k){
      dataJS.loadGoogle(filename,function(){
        doc.getRows(filename, function(err, rows){
          for(var i = 0; i<rows.length; i++){
            var value = Object.values(rows[i]);
            if(value [0] == this.id){
              jsonArray.push(rows[i]);
              break;
            }
            else{
              continue;
            }
          }
        });
        callback();
      });
      return jsonArray;
    }
  });
}


//Takes in a filename (sheet=1;sheet=2); param=Array of Parameters to filter, an apiKey and a callback function;
//Function loads the Google Sheet --> Get the Rows --> Check the values of each row and pushes it to a JSONObj. Then we create a new arrays that filter through each of the parameters
exports.ParamSelec = function(filename, param, apikey, callback){
  var jsonObj = {};
  var jsonArray = [];
  Users.getUserbyKey(apikey, function(k){
    if (k) {
      dataJS.loadGoogle(filename,function(rows){
          for(var i =0; i<rows.length; i++){
            var value = Object.values(rows[i]);
            for(var k=0; k<value.length; k++){
              console.log("Values object for this row" + value[k]);
            }
            if(filename==1){
              jsonObj = {"agency": value[4], "business_title": value[5], "job_category": value[7], "part_or_full": value[8], "Location": value[12], "ID": value[13]};
              console.log(jsonObj);
            } else{
              jsonObj = {"program_name": value[1], "benefit_type": value[2]  , "population_served": value[5] , "contact_info":value[9] ,  "summary": value[7], "ID": value[8]};
            }
            jsonArray.push(jsonObj);
          }

          if(filename==1){
            var k = jsonArray.filter(function(w){
              if(w!==""){
                return w.agency.includes(param.agency);
              }
            });
            console.log("Array 1: File 1" + k[0]);
            var k1 = k.filter(function(w){
              if(w!==""){
                return w.business_title.includes(param.business_title);
              }
            });
            console.log("Array 2:File 1" + k1[0]);
            var k2 = k1.filter(function(w){
              if(w!==""){
                return w.job_category.includes(param.job_category);
              }
            });
            console.log("Array 3:File 1" + k2[0]);
            var k3= k2.filter(function(w){
              if(w!==""){
                return w.part_or_full.includes(param.part_or_full);
              }
            });
            console.log("Array 4: File 1" + k3[0]);
            var finalJSON= k3.filter(function(w){
              if(w!==""){
                return w.location.includes(param.location);
              }
            });
            console.log("Array Final: File 1" + finalJSON[0]);
          } else{
            var k = jsonArray.filter(function(w){
              if(w!==""){
                return w.program_name.includes(param.program_name);
              }
            });
            console.log("Array 1: File 2" + k[0]);
            var k1 = k.filter(function(w){
              if(w!==""){
                return w.benefit_type.includes(param.benefit_type);
              }
            });
            console.log("Array 2: File 2" + k1[0]);
            var k2 = k1.filter(function(w){
              if(w!==""){
                return w.population_served.includes(param.population_served);
              }
            });
            console.log("Array 3: File 2" + k2[0]);
            var k3= k2.filter(function(w){
              if(w!==""){
                return w.contact_info.includes(param.contact_info);
              }
            });
            console.log("Array 4: File 2" + k3[0]);
            var finalJSON= k3.filter(function(w){
              if(w!==""){
                return w.summary.includes(param.summary);
              }
            });
            console.log("Array Final: File 2" + finalJSON[0]);
          }
          console.log(finalJSON)
          callback(finalJSON);
    })
  }
});    //checks which File and Parses for DETAILS
    //see if this is necessary
}


exports.loadResource = function(filename, name, key, callback){
  var jsonObj = {};
  var k = checkAPI(apikey);
  var value;
  if(k==true){
    dataJS.loadGoogle(filename, function(){
      doc.getRows(filename, function(err,rows){
        for(var i=0; i<rows.length; i++){
          if(rows.name.trim() == name.trim()){
            value = Object.values(rows[i]);
            break;
          }
        }
        if(filename==1){
          jsonObj = {"agency": value[0], "business_titleTitle": value[1], "job_category": value[3], "part_or_full": value[4], "Location": value[8]};
        }
        else{
          jsonObj = {"program_name": value[1], "benefit_type": value[2]  , "population_served": value[5] , "contact_info":value[9] ,  "summary": value[7] };
        }
      });
      callback();
      return jsonObj;
    });
  }
}

function checkAPI(apikey, callback){
  Users.getUserbyKey(apikey, function(k){
    console.log("User key accessed");
    if(k==true){
      console.log("API Key has been Checked: API Key is valid");
      return true;
    }
    else{
      console.log("API Key has been checked: API Key is invalid");
      return false;
    }
  });
}
