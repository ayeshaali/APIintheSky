var express = require('express');
var fs = require("fs");
var router = express.Router();
var dataJS = require('../models/googlesheets');
var jobJS = require('../models/jobprogram');

router.get('/benefitsearch', function(request, response) {
  var key = request.query.apikey
  var data={
    name: request.query.name,
    type: request.query.type,
    pop: request.query.pop,
    contact: request.query.contact,
    desc: request.query.desc
  };

  jobJS.ParamSelec(2,data,key,function(json) {
    console.log(json)
    response.json(json);
  })

})

router.get('/jobsearch', function(request, response) {
  var key = request.query.apikey;
  var data={
    agency: request.query.agency,
    title: request.query.title,
    category: request.query.category,
    service: request.query.service,
    location: request.query.location
  };

  jobJS.ParamSelec(1,data,key,function(json) {
    response.json(json);
  });
})

router.get('/onejob', function(request, response) {
  var key = request.query.apikey;
  var data={
    id: request.query.id
  };
  jobJS.getJobById(data.id,1,key,function(json) {
    console.log(json);
    response.json(json);
  });
})


router.get('/onebenefit', function(request, response) {
  var key = request.query.apikey;
  var data={
    id: request.query.id
  };
  jobJS.getJobById(data.id,2,key,function(json) {
    response.json(json);
  });
})

module.exports = router;
