var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');
//var dataJS = require(__dirname +'/data');
// Create a document object using the ID of the spreadsheet - obtained from its URL.
var doc = new GoogleSpreadsheet('1DVgMG20OgfLR0leaJvzOiHDxp19EoyGKHTJxUCnxoX0');
// Authenticate with the Google Spreadsheets API.

exports.getDataJob = function(p,p1,p2,p3,p4,p5){
  var a = [p1,p2,p3,p4,p5];

  //long function
}

exports.getDataProgram = function(p,p1,p2,p3,p4,p5){
  var a = [p1,p2,p3,p4,p5]
}

exports.loadGoogle = function(filename, callback) {
  var user_data = [];
  doc.useServiceAccountAuth(creds, function (err) {
    doc.getRows(filename, function (err, rows) {
      callback(rows);
    });
  });
}

exports.getAllKeys = function(callback) {
  doc.useServiceAccountAuth(creds, function (err) {
    doc.getInfo(function(err,info){
      sheet=info.worksheets[1];
      sheet.getCells({
        'min-col': 3,
        'max-col': 3,
        'return-empty': true}, function(err, cells){
          var cell = [];
          for (var i=0; i<cells.length; i++) {
            cell[i]=cells[i].value;
          }
          callback(cell);
        }
    });
  });
}
//Updates a row
exports.updateRow=function(filename, userName, newStuff, callback){
  var sheet;
  doc.useServiceAccountAuth(creds, function (err) {
    doc.getInfo(function(err,info){
      sheet=info.worksheets[filename];
      sheet.getCells({
        'min-col': 1,
        'max-col': 1,
        'return-empty': true}, function(err, cells) {
        for(var i=0; i<cells.length;i++){
          if(cells[i].value==userName){
            sheet.getCells({'min-row': i+1,'max-row': i+1},
            function(err, cells) {
              for(var i=0; i<cells.length;i++){
                cells[i].setValue(newStuff[i]);
              }
            });
            break;
          }
        }
        console.log("doing callback");
        callback();
      });
    });
  });
}

// creates a new row (when making a new user)
exports.createRow = function(obj, callback) {
  var sheet;
  doc.useServiceAccountAuth(creds, function (err) {
    doc.addRow(1, obj, function(){
      dataJS.log("Calling first callback")
      callback();
    });
  });
}

// deletes a row (when deleting a user)
exports.deleteRow = function(user_id, callback) {
  var sheet;
  doc.useServiceAccountAuth(creds, function (err) {
    doc.getInfo(function(err,info){
      sheet=info.worksheets[0];
      sheet.getCells({
        'min-col': 1,
        'max-col': 1,
        'return-empty': true}, function(err, cells) {
        for(var i=0; i<cells.length;i++){
          if(cells[i].value==user_id){
            var index = i;
             sheet.getRows(function (err, rows) {
               rows[i-1].del(function(err){
                 callback();
               });
            });
            break;
          }
        }
      });
    });
  });
}