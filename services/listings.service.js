var request = require('request');

const trademeKey = {
  consumerKey: "CAC321B080D280936E409C86E72ABDC2",
  consumerSecret: "1695A123465C11F5B85808A5E6EB4A73"
};

var search = '/Search/Property/Rental.json?region=15';
const trademeApiUrl = `https://api.tmsandbox.co.nz/v1/${search}`;

var options = {
    url: trademeApiUrl,
    method: 'GET',
    headers: {
      'Authorization' : `OAuth oauth_consumer_key="${trademeKey.consumerKey}", oauth_signature_method="PLAINTEXT", oauth_signature="${trademeKey.consumerSecret}&"`
    }
  };

var getListings = function(callback) {
    console.log("requesting listings");
    request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            callback(data);
        } else if (error) {
            console.error(error);
        } else {
            console.log(body);
            return null;
        }
    });
};

module.exports = {
    getListings: getListings
};