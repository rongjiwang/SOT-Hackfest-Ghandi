var express = require('express');
var router = express.Router();
var listingsService = require('../services/listings.service');

/* GET home page. */
router.get('/', function(req, res, next) {
    listingsService.getListings(function(data) {
        console.log(data);
        var newData = parseData(data);
        //var _calculateMedRent = calculateMedRent(newData);
        res.render('index', { properties: newData });
    });
});

router.get('/search', (req,res,next)=>{
  console.log(req.body.name);
});

function calculateMedRent(data){
  for(var i=0; i<data.length; i++){
    console.log(data[i]);
  }
}

function parseData(data) {
    var filtered_data = {};
    var list = data.List;
    for(var i=0; i<list.length; i++){
        var array_list = [];
        array_list.push(list[i].Address);
        array_list.push(list[i].Suburb);
        array_list.push(list[i].Bedrooms);
        array_list.push(list[i].RentPerWeek);


        filtered_data[i] = array_list;
    }
    return filtered_data;
}

module.exports = router;
