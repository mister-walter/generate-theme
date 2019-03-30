// ==== CORE ==== //

// A simple wrapper for all your custom jQuery;
// everything in this file will be run on every page

$(function() {
  // Homepage: scroll to about from hero
  $('#hero .cta .btn').click(function() {
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $('#about').offset().top - 80,
      },
      800
    );
  });

  // Application page: scroll to application list
  $('#apply-hero .cta .btn').click(function() {
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $('.apply--applications--section').offset().top - 80,
      },
      800
    );
  });
});
