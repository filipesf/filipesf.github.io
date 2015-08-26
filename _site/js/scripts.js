$(document).ready(function() {

  // SCROLL MENU
  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
  });

  //  SOCIAL SHARE
  $("section.blog section.social-share a").click(function(e){
    e.preventDefault();
    var link = this.href;
    window.open(link, " ", "width=640, height=480");
  });

});
