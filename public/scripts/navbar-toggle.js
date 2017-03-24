$(function () {
    $('.navbar-toggle').click(function () {
        $('.navbar-nav').toggleClass('slide-in');
        $('.side-body').toggleClass('body-slide-in');
        $('#search').removeClass('in').addClass('collapse').slideUp(200);

        /// uncomment code for absolute positioning tweek see top comment in css
        //$('.absolute-wrapper').toggleClass('slide-in');
        
    });

   $(".side-nav-link").click(function() {
      // remove classes from all
      $(".side-nav-link").removeClass("active");
      // add class to the one we clicked
      $(this).addClass("active");
   });
});