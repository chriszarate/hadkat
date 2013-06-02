/*
 * hasadronekilledanyonetoday.com
 * https://github.com/chriszarate/hadkat
 * Released under the WTFPL (Do What the Fuck You Want to Public License)
 */

// Dependencies
var http = require('http'),
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

// Parse response to extract details of latest strike.
parseData = function (data) {

  // Parse data as JSON.
  var obj = JSON.parse(data);

  // Test for good data.
  if(obj.status == 'OK') {

    // Get last strike.
    var strike = obj.strike.pop(),
        then = Date.parse(strike.date),
        now = new Date().getTime(),
        hours = (now - then) / 1000 / 60 / 60,
        days = Math.round(hours / 24),
        ISIT = (hours < 24),
        deaths = '',
        injuries = '',
        time = '',
        strikeData = {};

    if(strike.deaths) {
      deaths = ' killed ' + strike.deaths;
      deaths += (strike.deaths !== '1') ? ' people' : ' person';
    }

    if(strike.injuries) {
      injuries = ' injured ' + strike.injuries;
      injuries += (strike.injuries !== '1') ? ' people' : ' person';
    }

    if(deaths && injuries) {
      deaths += ' and';
    }

    if(days > 1) {
      time = ' ' + days + ' days ago';
    } else {
      time = ' ' + hours + ' hours ago';
    }

    strikeData.ISIT = ISIT;
    strikeData.answer = (ISIT) ? 'YES' : 'NO';
    strikeData.headline = 'A U.S. drone' + deaths + injuries + time + '.';
    strikeData.details = strike.bij_summary_short;

    // Write record to file.
    fs.writeFile(outputLatest, JSON.stringify(strikeData));

  }

};

// Send request.
http.get(options, getData);
