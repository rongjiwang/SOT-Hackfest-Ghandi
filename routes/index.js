var express = require('express');
var router = express.Router();
var getTenancyRegion = require('../tenancy_market_average');
var listingsService = require('../services/listings.service');

/* GET home page. */
router.get('/', function(req, res, next) {
    listingsService.getListings(function(data) {
        var newData = parseTMData(data);
        res.render('index', { properties: newData });
    });
});

router.get('/search', (req,res,next)=>{
  console.log(req.body.name);
});


function parseTMData(data) {
    var filtered_data = {};
    var list = data.List;
    var tradeMeObj = getJSON(data, 'Wellington');
<<<<<<< HEAD
    compareData(tradeMeObj);
=======
>>>>>>> ad27169e2707385e9871bc9b9334c29231fe74dc
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

function getJSON(data, region) {
    var suburbData = new Map();

    for(var i = 0; i< data.List.length; i++){
        var suburb = data.List[i].Suburb;
        var rent = data.List[i].RentPerWeek;
        var count = 0;
        var sum = 0;
        var obj = {count: count, rentSum: sum}

        if(suburbData.get(suburb) != null){
            count = suburbData.get(suburb).count;
            sum = suburbData.get(suburb).rentSum;
        }

        obj.count = count + 1;
        obj.rentSum = sum + rent;

        suburbData.set(suburb, obj);

    }
    var areas = [];

    suburbData.forEach(function (item, key, mapObj) {
        var avg = (item.rentSum / item.count);
        var area = {suburb: key, avg: avg};
        areas.push(area);
    });

    return {region: region, areas: areas};


}

function compareData(tradeMe){

    var tenancy = (getTenancyRegion('wellington'));
    var count = 0;
    var totalCount = 0;



    for (var i = 0; i < tradeMe['areas'].length; i++){
        for (var j = 0; j < tenancy.length; j++){

            if(tenancy[j]['suburb'].includes(tradeMe['areas'][i]['suburb'])){
            }
        }
    }
    console.log('count = ' + count);
    console.log('total count = ' + totalCount);


}


module.exports = router;
