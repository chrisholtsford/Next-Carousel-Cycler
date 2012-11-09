var nextCarousel = nextCarousel || {

  height : 'auto',
  $carousel : {},

  // "A noble spirit enbiggens the smallest man" - Jebediah Springfield
  embiggen : function($item) {
    var origWidth = $item.width(),
        newWidth = origWidth + 50,
        caption = ('<p class="karla"><div>' + $item.attr('data-text') + '<br><span>' + $item.attr('data-selected') + '</span></div><p>');
  
    $item.addClass('selected')
         .css({"z-index": 10})
         .animate(
          {
            "width"       : newWidth,
            "marginLeft"  : "-25px",
            "marginRight" : "-25px"          
          }, function() {
            // Adding this to the animation callback to prevent interruption
            $item.on('click', function() {window.location = $item.attr('data-url')});
          })
          .find('p').empty()
                    .html(caption);
  },

  // http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=82973&type=card
  enfeeble : function($item) {
    var origWidth = $item.width() - 50,
        caption = $item.attr('data-text');
  
    $item.removeClass('selected')
         .css({"z-index": 1})
         .animate(
          {
            "width" : origWidth,
            "marginLeft" : "0",
            "marginRight" : "0"
          })
          .find('p').empty()
                    .html(caption);
  },

  beforeMove : function(carousel, li, index, state) {
  
      // Figure out the new and previous slected carousel items
      // Set them as jQuery objects
    var $previousSelected = nextCarousel.$carousel.find('li.selected'),
        newSelectedIndex = (state === 'next') ? (index + 1) : (index - 1),
        $newSelected = nextCarousel.$carousel.find('li:eq(' + newSelectedIndex + ')');
      
    // Clear All item events
    nextCarousel.$carousel.find('li').off();

    // Record and lock height of UL to prevent change during animation
    nextCarousel.height = nextCarousel.$carousel.height();
    nextCarousel.$carousel.height(nextCarousel.height);

    nextCarousel.enfeeble($previousSelected);
    nextCarousel.embiggen($newSelected);
  },

  afterMove : function(carousel, li, index, state) {
    nextCarousel.$carousel.find('li.selected').next().on('click', nextCarousel.next)
                                        .end().prev().on('click', nextCarousel.prev);
                                      
    nextCarousel.$carousel.css({'height': 'auto'});
  },

  initBefore : function() {
    //Add the data-text attributes to the captions
    var placeholder = 
        placeholder2 = 
        '<li data-text="&nbsp;" data-selected="&nbsp;" data-url="#" class="placeholder"><img src="images/carousel/placeholder.png"></li>';

    $('#carousel').append(placeholder)
                  .find('li:eq(0)').before(placeholder2);
  },

  next : function() {
    $('#triggerNext').trigger('click');
  },

  prev : function() {
    $('#triggerPrev').trigger('click');
  },

  initAfter : function(carousel) {
    nextCarousel.$carousel = $('#carousel');
    //Add the data-text attributes to the captions
    nextCarousel.$carousel.find('li').each(function(i){
      var $this = $(this),
          caption = $this.attr('data-text');
        
      $('<p class="karla">' + caption + '</p>').appendTo($this);
    });
  
    // '#carousel li:eq(1)' is the initial center carousel item 
    nextCarousel.embiggen(nextCarousel.$carousel.find('li:eq(1)'));

    // '#carousel li:eq(2)' is the initial rightmost carousel item 
    nextCarousel.$carousel.find('li:eq(2)').one('click', nextCarousel.next);
  
    // Keyboard accessibility
    $('html').keydown(function(e) {
      if(e.which == 39){
        carousel.next();
      } else if(e.which == 37) {
        carousel.prev();
      }
    });
  }
};
$(document).ready(function() {
    nextCarousel.initBefore();
        
    nextCarousel.$carousel = $('#carousel').jcarousel({
        scroll: 1,
        visible: 3,
        buttonNextHTML: '<img id="triggerNext" src="images/next.png">',
        buttonPrevHTML: '<img id="triggerPrev" src="images/prev.png">',
        setupCallback: nextCarousel.initAfter,
        itemFirstOutCallback: {
          onBeforeAnimation: nextCarousel.beforeMove,
          onAfterAnimation: nextCarousel.afterMove
        }
    });
});