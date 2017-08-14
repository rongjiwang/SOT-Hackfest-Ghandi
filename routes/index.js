var express = require('express');
var router = express.Router();
var getTenancyRegion = require('../tenancy_market_average');
var listingsService = require('../services/listings.service');

/* GET home page. */
router.get('/', function(req, res, next) {
    listingsService.getListings(function(data) {
        var newData = parseTMData(data);
        console.log(newData);
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
    var finalData = compareData(tradeMeObj, 'wellington');
    /*for(var i=0; i<list.length; i++){
        var array_list = [];
        array_list.push(list[i].Address);
        array_list.push(list[i].Suburb);
        array_list.push(list[i].Bedrooms);
        array_list.push(list[i].RentPerWeek);


        filtered_data[i] = array_list;
    }*/
    return finalData;
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
        avg = Math.round(avg);
        var area = {suburb: key, avg: avg};
        areas.push(area);
    });

    return {region: region, areas: areas};


}

function compareData(tradeMe, region){

    var tenancy = (getTenancyRegion(region));
    var count = 0;
    var totalCount = 0;
    var areas = [];


    for (var i = 0; i < tradeMe['areas'].length; i++){
        for (var j = 0; j < tenancy.length; j++){
            var a = tenancy[j]['suburb'].toLowerCase().split('_').join(' ');
            var b = tradeMe['areas'][i]['suburb'].toLowerCase();
            if(a.includes(b)){
                var TMavg = tradeMe['areas'][i]['avg'];
                var Tavg = tenancy[j]['median'];
                var p = 200;
                var c = (TMavg - Tavg) / TMavg * 100;
                c = Math.round(c);


                var area = {
                    suburb: tradeMe['areas'][i]['suburb'],
                    trademeAvg: TMavg,
                    comparison: c
                };
                areas.push(area);
            }
        }
    }

    return {region: 'wellington', areas: areas};



}





module.exports = router;
