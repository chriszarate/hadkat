(function ($) {

  // Configuration
  var strikeURL = 'http://data.hasadronekilledanyonetoday.com/strike';

  // Fetch strike data.
  $.ajax(strikeURL, {dataType: 'jsonp'}).done(function(data) {

    if(data.ISIT) {
      $('html').addClass('YES');
    }

    $('#answer').html(data.answer);
    $('#headline').html(data.headline);
    $('#details').html(data.details);

  });

})(window.jQuery);
