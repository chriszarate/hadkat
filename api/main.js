/*
 * hasadronekilledanyonetoday.com
 * https://github.com/chriszarate/hasadronekilledanyonetoday
 * Released under the WTFPL (Do What the Fuck You Want to Public License)
 */

// Require Express.
var express = require('express'),

// Require file system.
fs = require('fs'),

// File name of data.
strikeData = 'data/strike.json',

// Create server.
app = express();

// Enable JSONP.
app.enable('jsonp callback', true);

// Create JSONP endpoint.
app.get('/strike', function (req, res) {

  // Read strike data.
  var data = JSON.parse(fs.readFileSync(strikeData, 'utf8'));

  // Output as JSONP.
  res.type('application/json');
  res.jsonp(data);

});

// Listen.
app.listen(8000);
