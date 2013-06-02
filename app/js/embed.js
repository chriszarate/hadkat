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
        Main(jQuery.noConflict());
      }
    };
    document.getElementsByTagName('head')[0].appendChild(s);
  } else {
    Main($);
  }


  /*
    Main
  */

  function Main($) {

    // Fetch data.
    $.ajax(strikeURL, {dataType: 'jsonp'}).done(function(data) {

      if(data.ISIT) {

        // Create link.
        var link =
          $('<a>')
            .attr('href', 'http://hasadronekilledanyonetoday.com')
            .html(data.headline)
            .css({
              'font-size': '1em',
              'font-weight': 'bold',
              'color': '#fff',
              'background-color': '#f00',
              'text-decoration': 'underline'
            }),

        // Create close link.
        closeLink =
          $('<a>')
            .html('×')
            .css({
              'padding-left': '10px',
              'font-size': '1em',
              'font-weight': 'normal',
              'color': '#fff',
              'background-color': '#f00',
              'text-decoration': 'none',
              'cursor': 'pointer'
            })
            .on('click', function() {
              $('#HADKAT').hide();
            }),

        // Create notice.
        notice =
          $('<span>')
            .attr('id', 'HADKAT')
            .css({
              'display': 'block',
              'position': 'absolute',
              'z-index': '9999',
              'top': '10px',
              'right': '10px',
              'padding': '5px 10px',
              'background-color': '#f00',
              '-moz-border-radius': '5px',
              'border-radius': '5px'
            })
            .append(link, closeLink);

        // Append notice to page.
        $('body').append(notice);

      }

    });

  }

})(window.jQuery);
