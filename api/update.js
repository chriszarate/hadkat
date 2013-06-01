/*
 * hasadronekilledanyonetoday.com
 * https://github.com/chriszarate/hasadronekilledanyonetoday
 * Released under the WTFPL (Do What the Fuck You Want to Public License)
 */

// Require HTTP.
var http = require('http'),

// Require file system.
fs = require('fs'),

// Options for HTTP request.
options = {
  host: 'api.dronestre.am',
  port: 80,
  path: '/data'
},

// File name for API cache.
outputCache = 'data/strikes.json',

// File name for most recent record.
outputLatest = 'data/strike.json',

// Process HTTP response.
getData = function (res) {

  if(res.statusCode === 200) {

    var output = '';

    // Collect chunks.
    res.on('data', function (chunk) {
      output += chunk;
    });

    // Process full response.
    res.on('end', function () {

      // Write to cache.
      fs.writeFile(outputCache, output);

      // Further parsing.
      parseData(output);

    });

  } else {
    console.log(res.statusCode);
  }

},

// Parse response to extract latest strike.
parseData = function (data) {

  // Parse data as JSON.
  var obj = JSON.parse(data);

  // Test for good data.
  if(obj.status == 'OK') {

    // Get last strike.
    var strike = obj.strike.pop();

    // Write record to file.
    fs.writeFile(outputLatest, JSON.stringify(strike));

  }

};

// Send request.
http.get(options, getData);
