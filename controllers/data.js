var express = require('express');
var fs = require("fs");
var router = express.Router();
var dataJS = require('../models/googlesheets');
var jobJS = require('../models/jobprogram');

router.get('/benefitsearch', function(request, response) {
  var data={
    apikey: request.query.apikey,
    name: request.query.name,
    type: request.query.type,
    pop: request.query.pop,
    contact: request.query.contact,
    desc: request.query.desc,
  };
  
  jobJS.
  
})

router.get('/jobsearch', function(request, response) {
  var data={
    apikey: request.query.apikey,
    agency: request.query.agency,
    title: request.query.title,
    category: request.query.category,
    service: request.query.service,
    location: request.query.location,
  };
  
  
})