var express = require('express');
var router = express.Router();
var listingsService = require('../services/listings.service');

/* GET home page. */
router.get('/', function(req, res) {

    listingsService.getListings(function(data) {
        var newData = parseData(data);
        //var AvgRent = A
        res.render('listings', { properties: newData });
    });
});

function parseData(data) {
    for(var i; i<data.length; i++){

    }
}

module.exports = router;
