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


function calcAvgRent(data, district) {

    var avgRent = new Map();
    for(var i = 0; i< data.List.length; i++){
        var suburb = data.List[i].Suburb;
        var rent = data.List[i].RentPerWeek;
        var count = 0;
        var rent = 0;

        if(myMap.get(suburb) != 'underfined'){
            var count = myMap.get(suburb).value.count;
            var sum = myMap.get(suburb).value.sum;
        }

        count = count + 1;
        sum = sum + sum;

        var obj = {count: count, rentSum: sum}

        avgRent.set(suburb, obj);

    }
}


module.exports = router;
