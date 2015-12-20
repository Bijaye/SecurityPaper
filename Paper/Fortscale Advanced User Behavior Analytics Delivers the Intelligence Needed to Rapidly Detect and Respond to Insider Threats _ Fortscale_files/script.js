jQuery( document ).ready(function() {

    jQuery('#menu-primary-navigation .dropdown-toggle').each(function(){
        jQuery(this).attr({'data-target': jQuery(this).attr('href')});
    });
    jQuery('ul.dropdown-menu').hide();
    jQuery('li.dropdown').mouseover(function(){
        jQuery(this).find('ul.dropdown-menu').toggle();
    });
    jQuery('li.dropdown').mouseout(function(){
       jQuery('ul.dropdown-menu').hide();
    });

    if( jQuery(window).width() <= 768 ){
      jQuery('li.dropdown > a').click(function(){
//        jQuery('.navbar-nav li.active').children('.dropdown-menu').hide();
        jQuery(this).parent().children('.dropdown-menu').show();
        return false;
      });
    }
//    jQuery('ul.dropdown-menu').hover(function(){
//        jQuery(this).show();
//    },function(){
//        jQuery(this).hide();
//    });

//------------------------------------------------------------------------
// Removing the "cintact us" side button's form functionality
/*
    if( jQuery('.join-form .frm_error_style').length ){
        jQuery('.join-program').animate({
              right: 0
          });
    }
    if( jQuery('.join-form .frm_message').length ){
        jQuery('.join-program').animate({
              right: 0
          });
    }
    jQuery('.join-program .btn-join').click(function(e) {
        value = jQuery('.join-program').css('right') === '-280px' ? 0 : '-280px';
          jQuery('.join-program').animate({
              right: value
          });
    });
    
    if( jQuery('#mc_signup_form').length ){
        jQuery('#mc_mv_FNAME').attr('placeholder', 'NAME');
        jQuery('#mc_mv_EMAIL').attr('placeholder', 'EMAIL ADDRESS');
    }
    */

// Removing the "cintact us" side button's form functionality - END
//------------------------------------------------------------------------

//    jQuery('#credits').popover();
var pp;
    jQuery('#credits').mouseenter(function (){
        jQuery(this).popover('show');
    })
    jQuery('.cr-container').mouseleave(function() {
        jQuery('#credits').popover('hide');
    });

    if(jQuery('#nme_accordion_open').length ){
        jQuery('#nme_accordion_open').collapse({
          toggle: false
        });
        jQuery('#nme_accordion_open').on('shown.bs.collapse', function () {
            var opened = jQuery(this).children().find('.panel-collapse.in');
            jQuery(opened).prev('.panel-heading').css({height:0});
            jQuery(opened).parent('.panel-default').css({marginTop : 0});
        });
        jQuery('#nme_accordion_open').on('hidden.bs.collapse', function () {
            var opened = jQuery(this).children().find('.panel-collapse').not(('.panel-collapse.in'));
            jQuery(opened).prev('.panel-heading').css({height:'auto'});
            jQuery(opened).parent('.panel-default').css({marginTop : 10});
        });
    }
    jQuery('[data-toggle="nmecollapse"]').on( 'click', function (){
        var parent = jQuery(this).data('parent');
        var self = jQuery(this);
        if( !jQuery(this).hasClass('close')){
            jQuery(jQuery(this).attr('href')).slideDown(300, function(){
                jQuery(self).addClass('close');
            });
            jQuery(parent).children().find('.nme-panel-collapse').not(jQuery(this).attr('href')).slideUp();
            jQuery('[data-toggle="nmecollapse"]').not(self).removeClass('close');
        }
        else{
            jQuery(parent).children().find('.nme-panel-collapse').slideUp();
            jQuery('[data-toggle="nmecollapse"]').removeClass('close');
        }
        
        return false;
    });
    
    //Get Width Form Home page logos 
    
    $('#contact1').on('shown.bs.modal', function () {
        $('#contact1 .modal-body').html('<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1576.4740723820073!2d-122.39800199999998!3d37.79125499999999!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858063ae3761c1%3A0x2b7c81e70d2605cf!2sRegus+San+Francisco!5e0!3m2!1sen!2sin!4v1424097757738&z=20" width="100%" height="450" frameborder="0" style="border:0"></iframe>');
    });
    
   $('#contact2').on('shown.bs.modal', function () {
        $('#contact2 .modal-body').html('<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3379.5581931342404!2d34.838567999999995!3d32.108224299999996!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d49949c4907c3%3A0x97875f553f9d7508!2sHaBarzel+St+19%2C+Tel+Aviv-Yafo%2C+Israel!5e0!3m2!1sen!2s!4v1424366103461&z=20" width="100%" height="450" frameborder="0" style="border:0"></iframe>');
    });
    
});

jQuery( window ).load(function() {
        var container_width = jQuery('.container-box').width();
    var totalimgwidth = 0;
    jQuery('body').find('.container-box a').each(function() {
        totalimgwidth += jQuery(this).innerWidth();
    });
    
    var calc_width = container_width - totalimgwidth;
    var margin_value = calc_width / 5;
    jQuery('.home-sidebar-container a').css('margin-right',margin_value);
    jQuery('.home-sidebar-container a:last-child').css('margin-right', '0');
    });