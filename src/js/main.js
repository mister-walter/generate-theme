// ==== CORE ==== //

// A simple wrapper for all your custom jQuery;
// everything in this file will be run on every page

$(function() {
  // Application page: scroll to application list
  $('#apply-hero .cta .btn').click(function() {
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $('.apply--applications--section').offset().top - 80,
      },
      800
    );
  });

  $('.nav .mobile-nav--indicator').click(function() {
    $('.nav .mobile-nav--indicator').toggleClass('active');
    $('.nav .mobile--navigation').toggleClass('active');
  });

  let offset = 0;

  function autoLogos() {
    offset -= 1;
    document.querySelector(
      '.employer--section--carousel .employer--section--carousel-wrapper'
    ).style.transform = `translateX(${offset}px`;
    if (
      document.querySelector(
        '.employer--section--carousel .employer--section--carousel-wrapper .employer--logo'
      ).offsetWidth <
      -1 * offset
    ) {
      // Add to end
      document
        .querySelector(
          '.employer--section--carousel .employer--section--carousel-wrapper'
        )
        .appendChild(
          document.querySelector(
            '.employer--section--carousel .employer--section--carousel-wrapper .employer--logo'
          )
        );
      // Fix up offsets
      let marR = getComputedStyle(
        document.querySelector('.employer--logo')
      ).getPropertyValue('margin-right');
      offset = parseInt(marR);
      document.querySelector(
        '.employer--section--carousel .employer--section--carousel-wrapper'
      ).style.transform = `translateX(${offset}px`;
    }
  }

  $('.basiclightbox').click(function() {
    img_url = $(this).attr('lightbox-img');
    basicLightbox
      .create(
        `
		<img width="1400" height="900" src="${img_url}">
	`
      )
      .show();
  });

  $(document).ready(function() {
    if (
      document.querySelector(
        '.employer--section--carousel .employer--section--carousel-wrapper'
      )
    ) {
      let interval = setInterval(autoLogos, 20);
    }
  });
});
