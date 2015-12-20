// Sticky Plugin v1.0.2 for jQuery
// =============
// Author: Anthony Garand
// Improvements by German M. Bravo (Kronuz) and Ruud Kamphuis (ruudk)
// Improvements by Leonardo C. Daronco (daronco)
// Created: 2/14/2011
// Date: 16/04/2015
// Website: http://labs.anthonygarand.com/sticky
// Description: Makes an element on the page stick on the screen as you scroll
//       It will only set the 'top' and 'position' of your element, you
//       might need to adjust the width in some cases.
 var imagefolder = "/vinfo/imgFiles/";
 $('#sticknav').css('background-image',' url(\"'+imagefolder+'arrowdown.png\")');
(function($) {
    var slice = Array.prototype.slice; // save ref to original slice()
    var splice = Array.prototype.splice; // save ref to original slice()
   
	
  var defaults = {
      topSpacing: 0,
      bottomSpacing: 0,
      className: 'is-sticky',
      wrapperClassName: 'sticky-wrapper',
      center: false,
      getWidthFrom: '',
      widthFromWrapper: true, // works only when .getWidthFrom is empty
      responsiveWidth: false
    },
    $window = $(window),
    $document = $(document),
    sticked = [],
    windowHeight = $window.height(),
    scroller = function() {
      var scrollTop = $window.scrollTop(),
        documentHeight = $document.height(),
        dwh = documentHeight - windowHeight,
        extra = (scrollTop > dwh) ? dwh - scrollTop : 0;

      for (var i = 0; i < sticked.length; i++) {
        var s = sticked[i],
          elementTop = s.stickyWrapper.offset().top,
          etse = elementTop - s.topSpacing - extra;

        if (scrollTop <= etse) {
          if (s.currentTop !== null) {
            s.stickyElement
              .css({
                'width': '',
                'position': '',
                'top': ''
              });
  $('#sticknav-sticky-wrapper').css('height','auto');

if($('.navcontent').css('display')=="none"){  
 $('#sticknav').css('height', 'auto'); 
  $('#sticknav-sticky-wrapper').removeClass('opensticknav1');
 $('#sticknav').removeClass('opensticknav1');
  $('#sticknav').css('background-image',' none');
}

 $('.navcontentDesktop').css('display','none');
  $('.navcontentDesktop').html(" Contents ");
  $('.navcontentDesktop').attr("data-id",0);
  
            s.stickyElement.parent().removeClass(s.className);
            s.stickyElement.trigger('sticky-end', [s]);
            s.currentTop = null;
          }
        }
        else {
          var newTop = documentHeight - s.stickyElement.outerHeight()
            - s.topSpacing - s.bottomSpacing - scrollTop - extra;
          if (newTop < 0) {
            newTop = newTop + s.topSpacing;
          } else {
            newTop = s.topSpacing;
          }
          if (s.currentTop != newTop) {
            var newWidth;
            if ( s.getWidthFrom ) {
                newWidth = $(s.getWidthFrom).width() || null;
            }
            else if(s.widthFromWrapper) {
                newWidth = s.stickyWrapper.width();
            }
            if ( newWidth == null ) {
                newWidth = s.stickyElement.width();
            }

/*if($('.navcontent').css('display')=='none'){
newWidth=215;
}else{
newWidth=50;

}*/

            s.stickyElement
              .css('width', newWidth)
              .css('position', 'fixed')
              .css('top', newTop);

            s.stickyElement.parent().addClass(s.className);
 $('#sticknav-sticky-wrapper').css('height', 15);
 $('#sticknav').css('height', 15);
$('.navcontentDesktop').css('display','block');
 $('#sticknav').css('background-image',' url(\"'+imagefolder+'arrowdown.png\")');

 
            if (s.currentTop === null) {
              s.stickyElement.trigger('sticky-start', [s]);
            } else {
              // sticky is started but it have to be repositioned
              s.stickyElement.trigger('sticky-update', [s]);

            }

            if (s.currentTop === s.topSpacing && s.currentTop > newTop || s.currentTop === null && newTop < s.topSpacing) {
              // just reached bottom || just started to stick but bottom is already reached
              s.stickyElement.trigger('sticky-bottom-reached', [s]);
            } else if(s.currentTop !== null && newTop === s.topSpacing && s.currentTop < newTop) {
              // sticky is started && sticked at topSpacing && overflowing from top just finished
              s.stickyElement.trigger('sticky-bottom-unreached', [s]);
            }

            s.currentTop = newTop;
          }
        }
      }
    },
    resizer = function() {
      windowHeight = $window.height();
     
if($window.width()>960){
	$('.mobilearticlenav').css('display','none');
}else{
	
	
	if($('.menuMobile').css('display')!='none' && $('#sticknav').text().length>5){
	
		$('.mobilearticlenav').css('display','block');
		$('.mobilearticlenav').html($('#sticknav').html()+"<div class=\"closenavarticle \">X</div>");
		$('.mobilearticlenav').attr('data-id',0);
		$('.mobilearticlenav ul').css('display','none');
		$('.mobilearticlenav').attr('data-id',0);
		$('.closenavarticle').css('display','none');
	
	}

}

      for (var i = 0; i < sticked.length; i++) {
        var s = sticked[i];
        var newWidth = null;
        if ( s.getWidthFrom ) {
            if ( s.responsiveWidth === true ) {
                newWidth = $(s.getWidthFrom).width();
            }
        }
        else if(s.widthFromWrapper) {
            newWidth = s.stickyWrapper.width();
        }
        if ( newWidth != null ) {
            s.stickyElement.css('width', newWidth);
        }
      }
    },
    methods = {
      init: function(options) {
        var o = $.extend({}, defaults, options);
        return this.each(function() {
          var stickyElement = $(this);

          var stickyId = stickyElement.attr('id');
          var stickyHeight = stickyElement.outerHeight();
          var wrapperId = stickyId ? stickyId + '-' + defaults.wrapperClassName : defaults.wrapperClassName
          var wrapper = $('<div></div>')
            .attr('id', wrapperId)
            .addClass(o.wrapperClassName);

          stickyElement.wrapAll(wrapper);

          var stickyWrapper = stickyElement.parent();

          if (o.center) {
            stickyWrapper.css({width:stickyElement.outerWidth(),marginLeft:"auto",marginRight:"auto"});
          }

          if (stickyElement.css("float") == "right") {
            stickyElement.css({"float":"none"}).parent().css({"float":"right"});
          }

		if (stickyElement.css("float") == "left") {
            stickyElement.css({"float":"left"}).parent().css({"float":"left"});
          }

          stickyWrapper.css('height', stickyHeight);
		
		  
		   $('#sticknav').prepend("<div class=\"navcontent\" data-id=\"0\"></div>");
		    $('#sticknav').prepend("<div class=\"navcontentDesktop\" data-id=\"0\"> Contents </div>");
          o.stickyElement = stickyElement;
          o.stickyWrapper = stickyWrapper;
          o.currentTop    = null;

          sticked.push(o);
        });
      },
      update: scroller,
      unstick: function(options) {
        return this.each(function() {
          var that = this;
          var unstickyElement = $(that);

          var removeIdx = -1;
          var i = sticked.length;
          while ( i-- > 0 )
          {
            if (sticked[i].stickyElement.get(0) === that)
            {
                splice.call(sticked,i,1);
                removeIdx = i;
            }
          }
          if(removeIdx != -1)
          {
            unstickyElement.unwrap();
            unstickyElement
              .css({
                'width': '',
                'position': '',
                'top': '',
                'float': ''
              })
            ;
          }
        });
      }
    };

  // should be more efficient than using $window.scroll(scroller) and $window.resize(resizer):
  if (window.addEventListener) {
    window.addEventListener('scroll', scroller, false);
    window.addEventListener('resize', resizer, false);
  } else if (window.attachEvent) {
    window.attachEvent('onscroll', scroller);
    window.attachEvent('onresize', resizer);
  }

  $.fn.sticky = function(method) {
	  
    if (methods[method]) {
      return methods[method].apply(this, slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }
  };

  $.fn.unstick = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method ) {
      return methods.unstick.apply( this, arguments );
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }

  };
  $(function() {
    setTimeout(scroller, 0);
  });
})(jQuery);

$('.mobilearticlenav').css('display','none');
$('.navcontent').live('click',function(){

	if($(this).attr('data-id')==0){
		$(this).html(" ");
		$(this).css('float','right');
		$(this).attr('data-id',1)
		$('#sticknav').addClass("opensticknav1");
		$('#sticknav-sticky-wrapper').addClass("opensticknav1");
		 $('#sticknav').css('background-image',' url(\"'+imagefolder+'arrowup.png\")');
	}else{
		$(this).html(" ");
		$(this).css('float','none');
		$(this).attr('data-id',0)
		$('#sticknav').removeClass("opensticknav1");
		$('#sticknav-sticky-wrapper').removeClass("opensticknav1");	
		 $('#sticknav').css('background-image',' url(\"'+imagefolder+'arrowdown.png\")');
	}
})

$('.navcontentDesktop').live('click',function(){

	if($('.navcontentDesktop').attr('data-id')==0){
		$('.navcontentDesktop').html("Contents");
		$('.navcontentDesktop').attr('data-id',1)
		$('#sticknav').addClass("opensticknav1");
		$('#sticknav-sticky-wrapper').addClass("opensticknav1");
		 $('#sticknav').css('background-image',' url(\"'+imagefolder+'arrowup.png\")');
	}else{
		$('.navcontentDesktop').html("Contents");
		$('.navcontentDesktop').attr('data-id',0)
		$('#sticknav').removeClass("opensticknav1");
		 $('#sticknav').css('background-image',' url(\"'+imagefolder+'arrowdown.png\")');
		$('#sticknav-sticky-wrapper').removeClass("opensticknav1");	
	}
})

$('#sticknav a').on('click',function(){

	if($('#sticknav').css('height') != "15px" && $('.navcontentDesktop').attr('data-id')==0){
		$('.navcontentDesktop').attr('data-id',1);
	}


	if($('.navcontentDesktop').attr('data-id')==0){
		$('.navcontentDesktop').html("Contents");
		$('.navcontentDesktop').attr('data-id',1)
		$('#sticknav').addClass("opensticknav1");
		$('#sticknav-sticky-wrapper').addClass("opensticknav1");
		 $('#sticknav').css('background-image',' url(\"'+imagefolder+'arrowup.png\")');
	}else{
		$('.navcontentDesktop').html("Contents");
		$('.navcontentDesktop').attr('data-id',0)
		$('#sticknav').removeClass("opensticknav1");
		 $('#sticknav').css('background-image',' url(\"'+imagefolder+'arrowdown.png\")');
		$('#sticknav-sticky-wrapper').removeClass("opensticknav1");	
	}


	
setTimeout(function(){
	$('body').scrollTop($('body').scrollTop() - 80);
	$('#container').scrollTop($('#container').scrollTop() - 80);
	
	} ,200);

});


if($('.menuMobile').css('display')!='none' && $('#sticknav').text().length>5){

	$('.mobilearticlenav').css('display','block');
	$('.mobilearticlenav').html($('#sticknav').html()+"<div class=\"closenavarticle \">X</div>");
	$('.mobilearticlenav').attr('data-id',0);
	
}else{
	$('.mobilearticlenav').html('');
	$('.mobilearticlenav').attr('data-id',0);
	$('.mobilearticlenav').css('display','none');
		
}


$('.mobilearticlenav').live('click',function(){
	if($('.mobilearticlenav').attr('data-id')==0){
	    $('.mobilearticlenav ul').css('display','block');
		$('.mobilearticlenav').attr('data-id',1);
		$('.closenavarticle').css('display','block');
	}else{
		$('.mobilearticlenav ul').css('display','none');
		$('.mobilearticlenav').attr('data-id',0);
		$('.closenavarticle').css('display','none');
	}

})
