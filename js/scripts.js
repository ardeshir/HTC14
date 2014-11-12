// JS SCRIPTS

// IIFE (Immediately Invoked Function Expression) to locally scope jQuery 
(function ($, root, undefined) {

// The $ is now locally scoped 
$(function () {
	'use strict';
	

    // FIX/UNFIX HEADER/FOOTER ELEMENTS
    // --------------------------------------------------

    // Get current page scroll height
    function getCurrentScroll() {
        return window.pageYOffset || document.documentElement.scrollTop;
    }

    function fixElementTop(fixAtPx, fixedElement, addClass) {
        $(document).ready(function() {
            setFixedClass();
        });
        $(window).scroll($.throttle( 50, function() {
            setFixedClass();
        }));
        function setFixedClass() {
            var scroll = getCurrentScroll();
            if ( scroll >= fixAtPx ) {
                $(fixedElement).addClass(addClass);
            }
            else {
                $(fixedElement).removeClass(addClass);
            }
        }
    }

    function fixElementBottom(fixedElement, fixerElement, addClass) {
        $(document).ready(function() {
            setFixedClass();
        });
        $(window).scroll(50, function() {
            setFixedClass();
        });
        function setFixedClass() {
            var elementFixerHeight = $('footer').height();
            var pageHeight = $(document).height();
            if (($(window).scrollTop() + $(window).height()) >= pageHeight - elementFixerHeight) {
                $(fixedElement).addClass(addClass);
            }
            else {
                $(fixedElement).removeClass(addClass);
            }
        }
    }

    // fix the header on scroll
    fixElementTop(32, '#header', 'header-fix');

    // fix the footer on scroll
    fixElementBottom('.footer-level-1', 'footer', 'footer-unfix');


    // HOME PAGE FEATURE AREA
    // --------------------------------------------------

    // load a random image for the home page feature area background
    // Set 'numberOfPhotos' to the number of available feature images
    var numberOfPhotos = 12;
    var rand = Math.floor(Math.random() * numberOfPhotos) + 1;
    var baseImgPath = "img/HTC_Homepage_Feature";   
    $('#home-feature-background').css('background-image', 'url(' + baseImgPath + rand + '.jpg)');

    // call the feature content slider plugin
    $('#home-feature-slider').bxSlider({
        mode: 'vertical',
        controls: false,
        pager: false,
        auto: true,
        pause: 5000,
        speed: 250,
        autoHover: true,
        touchEnabled: false,
        minSlides: 3,
        maxSlides: 3,
        moveSlides: 1,
        onSlideBefore: function (slideElement, oldIndex, newIndex) {
            $('#home-feature-slider li').removeClass('active');
            $('#home-feature-slider li').eq(newIndex + 3).addClass('active');
        },
        onSlideAfter: function (slideElement, oldIndex, newIndex) {
            //$(slideElement).addClass('active');
        },
        onSliderLoad: function (currentIndex) {
            $('#home-feature-slider li').eq(currentIndex + 3).addClass('active');
        }
    });


    // HOME PAGE DATA SLIDERS
    // --------------------------------------------------

    // set up data slides interval to control slide movement
    var slideTimer;
    var slideTimeOut1;
    var slideTimeOut2;
    var intervalActive = 0;
    function dataSlidesTimer() {
        if (intervalActive !== 1) {
            slideTimer = setInterval(function(){ 
                dpSlider1.goToNextSlide();
                slideTimeOut1 = setTimeout(function() {
                    dpSlider2.goToNextSlide();
                }, 2000);
                slideTimeOut2 = setTimeout(function() {
                    dpSlider3.goToNextSlide();
                }, 4000);  
            }, 8000);
            intervalActive = 1;
        }
    }

    // activate sliders if visible
    function activateSlider(scrollObject, activateObject, delay) {
        $(scrollObject).find(activateObject).each(function(i, el) {
            var el = $(el);
            if (el.visible(true)) {
                dataSlidesTimer();
                // set active state of initial slide on visible
                setTimeout(function() {
                    $(scrollObject).find('li:first-child').addClass('active');
                }, delay);
            } 
        }); 
    }

    // pause data sliders on hover, then resume in set interval
    $('.data-point-slider').hover(function(ev){
        clearTimeout(slideTimeOut1);
        clearTimeout(slideTimeOut2);
        clearInterval(slideTimer);
    }, function(ev){
        intervalActive = 0;
        dataSlidesTimer();
    });

    // call the home data slider #1
    var dpSlider1 = $('#data-point-slider-1').bxSlider({
        mode: 'fade',
        controls: false,
        pager: false,
        auto: false,
        pause: 8000,
        speed: 500,
        autoHover: true,
        touchEnabled: false,
        onSlideBefore: function (slideElement, oldIndex, newIndex) {
            $('#data-point-slider-1 li').removeClass('active');
        },
        onSlideAfter: function (slideElement, oldIndex, newIndex) {
            $(slideElement).addClass('active');
        }
    });

    // call the home data slider #1
    var dpSlider2 = $('#data-point-slider-2').bxSlider({
        mode: 'fade',
        controls: false,
        pager: false,
        auto: false,
        pause: 8000,
        speed: 500,
        autoHover: true,
        touchEnabled: false,
        onSlideBefore: function (slideElement, oldIndex, newIndex) {
            $('#data-point-slider-2 li').removeClass('active');
        },
        onSlideAfter: function (slideElement, oldIndex, newIndex) {
            $(slideElement).addClass('active');
        }
    });

    // call the home data slider #1
    var dpSlider3 = $('#data-point-slider-3').bxSlider({
        mode: 'fade',
        controls: false,
        pager: false,
        auto: false,
        pause: 8000,
        speed: 500,
        autoHover: true,
        touchEnabled: false,
        onSlideBefore: function (slideElement, oldIndex, newIndex) {
            $('#data-point-slider-3 li').removeClass('active');
        },
        onSlideAfter: function (slideElement, oldIndex, newIndex) {
            $(slideElement).addClass('active');    
        }
    });

    // activate data sliders only when visible
    $(window).scroll($.debounce( 250, function(event) {
       activateSlider('#data-point-slider-1', '.dps-text', 0);   
       activateSlider('#data-point-slider-2', '.dps-text', 2000);   
       activateSlider('#data-point-slider-3', '.dps-text', 4000);   
    }));
    activateSlider('#data-point-slider-1', '.dps-text', 0);   
    activateSlider('#data-point-slider-2', '.dps-text', 2000);   
    activateSlider('#data-point-slider-3', '.dps-text', 4000);  


    //disable the data slide show hover during page scroll
    var hoverElement = $('#data-point-slider-wrap'), timer;

    $(window).scroll($.throttle( 250, function(event) {
      clearTimeout(timer);
      if(!hoverElement.hasClass('disable-hover') && !hoverElement.is(":hover")) {
        hoverElement.addClass('disable-hover');
      }
      
      timer = setTimeout(function(){
        hoverElement.removeClass('disable-hover');
      },500);
    }));


    // ACCORDION MODULE SCRIPTS
    // --------------------------------------------------

    $(".acc-header.active").next(".acc-content").addClass('active');
    
    $('.acc-section > .acc-header').click(function() {
        var clicked = $(this);
        var allPanels = clicked.parent().parent().find('.acc-content');
        var allHeaders = clicked.parent().parent().find('.acc-header');
        if(!clicked.hasClass('active') && clicked.parents().hasClass('connected')){
            allHeaders.removeClass('active');
            allPanels.slideUp(300);
            clicked.addClass('active').next().slideDown(300);
        } else if(!clicked.hasClass('active')){
            clicked.addClass('active').next().slideDown(300);
        } else {
            clicked.next().slideUp(function() {
                clicked.removeClass('active');
            });
        }
        return false;
    });


    // PROGRAM OVERVIEW SLIDER
    // --------------------------------------------------

    $('#program-slider').bxSlider({
        mode: 'fade',
        controls: false,
        pager: true,
        auto: true,
        pause: 5000,
        speed: 250,
        autoHover: true,
        touchEnabled: true
    });

    $('#degree-program-slider').bxSlider({
        mode: 'fade',
        controls: false,
        pager: true,
        auto: true,
        pause: 5000,
        speed: 250,
        autoHover: true,
        touchEnabled: true,
        captions: true,
        pagerSelector: '.program-slider-pager'
    });


    // TAB SCRIPTS
    // --------------------------------------------------
    $('#degree-program-tabs a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    });


    // ALPHBETICAL LIST SCRIPTS
    // --------------------------------------------------
    $('#alpha-list-tab').on('shown.bs.tab', function (e) {
        $('#degrees-programs-alpha-nav').affix({
            offset: {
                top: 600
            }
        }); 
    })


	// GENERAL SCRIPTS AND FUNCTION/PLUGIN CALLS
    // --------------------------------------------------
    
    //detect adroif browsers adn add class to body 
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
    if(isAndroid) {
        $('body').addClass('android');
    }

	//svg detect
    if(!Modernizr.svg) {
        $('img[src*="svg"]').attr('src', function() {
            return $(this).attr('src').replace('.svg', '.png');
        });
    }

    // search box placeholder text polyfill
    

    // search box open/close
    $('#search-trigger').click(function() {
        // open the search bar and focus to the input
        $('#search-trigger').hide();
        $('#header-search-form').addClass('active').show();
        $('#header-search-form .search-form-input').focus();
    });
    /*$('#search-trigger').click(function() {
        // close the main menu on search open
        if (!$('#search-bar, #search-trigger').hasClass('active') && $('.primary-navigation .dropdown').hasClass('open')) {
            $('.primary-navigation .dropdown-toggle').dropdown('toggle')
        }
        // open the search bar and focus to the input
        $('#search-bar, #search-trigger').toggleClass('active');
        $('#search-bar .search-input').focus();
    });
    // close search bar if clicked off, or main menu icon is clicked
    $('html, .primary-navigation .dropdown-toggle').click(function() {
        if ($('#search-bar, #search-trigger').hasClass('active')) {
            $('#search-bar, #search-trigger').removeClass('active');
        }
    });
    // prevent click from bubbling up - alows 'click off' script to work
    $('#search-trigger, #search-bar').click(function(event){
        event.stopPropagation();
    });*/

    // close HTC navigation if clicked off
    $('.my-htc-navigation').nextAll().click(function() {
        if ($('.my-htc-navigation .navbar-collapse').hasClass('in')) {
            $('.my-htc-navigation .navbar-collapse').collapse('hide');
        }
    });

     // call the image caption plugin
    $('img.showalt').jcaption();

}); // function

})(jQuery, this); //IIFE
