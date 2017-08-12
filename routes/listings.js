var express = require('express');
var router = express.Router();
var listingsService = require('../services/listings.service');

/* GET home page. */
router.get('/', function(req, res) {

    listingsService.getListings(function(data) {
        console.log(data);
        var newData = parseData(data);
        res.render('/', { properties: newData });
    });
});

function parseData(data) {
    var filtered_data = {};
    var list = data.List;
    for(var i=0; i<list.length; i++){
        var array_list = [];
        array_list.push(list[i].Suburb);
        array_list.push(list[i].Bedrooms);
        array_list.push(list[i].RentPerWeek);


        filtered_data[i] = array_list;
    }
    return filtered_data;
}

module.exports = router;
