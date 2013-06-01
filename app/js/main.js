(function ($) {

  // Configuration
  var strikeURL = 'http://data.hasadronekilledanyonetoday.com/strike',
      jQueryURL = 'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js',
      jQueryMin = 1.5;

  /*
    Look for jQuery 1.5+ and load it if it can't be found.
    Adapted from Paul Irish's method: http://pastie.org/462639
  */

  if(typeof $ === 'undefined' || parseFloat($.fn.jquery) < jQueryMin) {
    var s = document.createElement('script');
    s.src = jQueryURL;
    s.onload = s.onreadystatechange = function() {
      if(!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
        s.onload = s.onreadystatechange = null;
        LoadStrike(jQuery.noConflict());
      }
    };
    document.getElementsByTagName('head')[0].appendChild(s);
  } else {
    LoadStrike($);
  }

  function LoadStrike($) {

    $.ajax(strikeURL, {dataType: 'jsonp'})
      .done(function(strike) {

        var then = Date.parse(strike.date),
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

        UpdateSite($, strikeData);

      });

  }

  function UpdateSite($, strikeData) {

    if(strikeData.ISIT) {
      $('html').addClass('YES');
    }

    $('#answer').html(strikeData.answer);
    $('#headline').html(strikeData.headline);
    $('#details').html(strikeData.details);

  }

})(window.jQuery);
