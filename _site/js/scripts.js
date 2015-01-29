$(document).ready(function() {

  // SEND CONTACT FORM
  var form = $('#contactform');
  var submit = $('.button');
  var alert = $('.alert');

  form.on('submit', function(e) {
    e.preventDefault();

    $.ajax({
      url: 'mail.php',
      type: 'POST',
      dataType: 'html',
      data: form.serialize(),
      beforeSend: function() {
        alert.fadeOut();
        submit.html('Sending...');
      },
      success: function(data) {
        alert.html(data).fadeIn();
        form.trigger('reset');
        submit.html('Send');
      },
      error: function(e) {
        console.log(e)
      }
    });
  });

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

  // BACK TOP
  $(function(){
    var bar = $('.bk-top');
    var top = bar.css('top');
    $(window).scroll(function() {
      if($(this).scrollTop() > 140) {
        bar.stop().animate({'top' : '0px'}, 100);
      } else {
        bar.stop().animate({'top' : top}, 100);
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
