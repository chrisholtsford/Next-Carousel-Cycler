var navCircles = navCircles || {
  init: function($circles) {
    $circles.find('li').each(function(){
      $(this).find('a').append('<img class="on hidden" src="images/circles/circle_on.png">');
    });
  },
  embiggen: function() {
    $(this).animate({"maxWidth": "18.8%",
                     "marginRight": "0",
                     "marginLeft": "0",
                     "marginTop": "2%",
                     "marginBottom": "2%"})
           .addClass('active')
           .find('img.off').addClass('hidden')
                           .end()
           .find('img.on').removeClass('hidden')
                          .end()
           .find('span').animate({"top": "38%"});
  },
  enfeeble: function() {
    $(this).animate({"maxWidth": "15%",
                     "marginRight": "2%",
                     "marginLeft": "2%",
                     "marginTop": "4%",
                     "marginBottom": "4%"})
           .removeClass('active')
           .find('img.on').addClass('hidden')
                           .end()
           .find('img.off').removeClass('hidden')
                           .end()
           .find('span').animate({"top": "34%"});
  }
};
  
//RUN THIS CODE AFTER AL ELEMENTS ON PAGE HAVE LOADED
$(window).load(function() 
{
  navCircles.init($('ul.circles'));
  $('ul.circles li').css({
                          "maxWidth": "15%",
                          "marginRight": "2%",
                          "marginLeft": "2%",
                          "marginTop": "4%",
                          "marginBottom": "4%"})
                    .hover(navCircles.embiggen, navCircles.enfeeble);
});
