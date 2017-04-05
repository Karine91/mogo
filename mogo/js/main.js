$(function () {

    //header slider
    var slidesBGContainer = $('.header .header-slides');
    var slidesBG = $('.header .header-slides-item');
    var slidesTXTContainer = $('.header .header-slides-text');
    var slidesTXT = $('.header .header-slides-text-item');
    var slidesNAVContainer = $('.header .header-slides-nav-ul');
    var slidesNAV = $('.header .header-slides-nav-ul-li');
    var slidesProgressBars = slidesNAVContainer.find('.header-slides-nav-ul-li-progress-bar');
    var slideNum = 0;
    var duration = 5000;
    slidesBG.eq(0).show().addClass('active');
    slidesTXT.eq(0).addClass('active').css({display:'flex'});
    slidesNAV.eq(0).addClass('active');
    slidesNAV.on('click', function () {

        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(autoPlay,duration);

        slideNum = $(this).index();

        //BG images
        slidesBGContainer.find('.active').fadeOut(500).removeClass('active');
        slidesBG.eq(slideNum).fadeIn(500).addClass('active');

        //Navs
        slidesNAVContainer.find('.active').removeClass('active');
        slidesNAV.eq(slideNum).addClass('active');

        //Texts
        slidesTXTContainer.find('.active').animate({opacity: 0}, 500, function () {
            $(this).css({display:'none'});
        }).removeClass('active');
        slidesTXT.eq(slideNum).css({
            display:'flex',
            opacity:0
        }).animate({opacity:1},500).addClass('active');

        //Progress Bars
        progressBars();
    });

    function autoPlay(){
        slideNum++;
        if(slideNum >= slidesBG.length) slideNum=0;
        slidesNAV.eq(slideNum).click();
    }

    function progressBars(){
        slidesProgressBars.stop().css({width:0});
        slidesProgressBars.eq(slideNum).stop().animate({width:"105%"}, duration);
    }

    var autoPlayInterval = setInterval(autoPlay,duration);
    progressBars();

    var countered = false;

    

    //Menu on scroll
    $(window).on('scroll', function () {
        if($(this).scrollTop() > $(window).height()*.8 && $(window).width()>780) {
            $('.header-navbar').addClass('scrolled');
        } else if ($(window).width()>780) {
            $('.header-navbar').removeClass('scrolled');
        }

        if($(this).scrollTop() > $('section.about footer').offset().top + $('section.about footer').outerHeight() - $(window).height()) {
            if(!countered) {
                countered = true;
                $('.counter .count').each(function () {
                    runCounter($(this));
                });
            }
        }
        
        $('section[id]').each(function (index,element) {
            if(
                $(window).scrollTop() > $(element).offset().top - $(window).height()/2
                &&
                $(window).scrollTop() < $(element).offset().top + $(element).outerHeight()
            ) {
                $('.header-navbar-menu a[href="#'+$(element).attr('id')+'"]').addClass('active');
            } else {
                $('.header-navbar-menu a[href="#'+$(element).attr('id')+'"]').removeClass('active');
            }
        });
    });
    
    function runCounter(element){
        var currentNumber = parseInt( element.find('span').text() );
        var endNumber = parseInt( element.find('span').attr('data-number') );
        if(currentNumber<endNumber) {
            element.find('span').text( currentNumber + 1);
            setTimeout(runCounter, Math.round(2000/endNumber), element);
        }
    }



    // services
    $('.services-block').on("click", function(){
            $(this).find('.services-icon>div').stop().effect( "bounce",{'direction': 'down', 'distance': '5', 'times': '2'}, 600);
        });
 //customScrollbar
    $(".acc-content").mCustomScrollbar({
        theme:"dark-thick"
    });

    $(".acc .acc-header").on('click', function(){
        if(!$(this).parent().hasClass('acc-opened')) {
            $(".acc li.acc-opened").removeClass('acc-opened');
            $(this).parent().addClass('acc-opened');
        }
    });

   // CAROUSEL BRANDS
    $('.owl-carousel').owlCarousel(
        {
            loop:true,
            margin:10,
            nav:true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 5
                }
            }}
    );
    $(document).find('.owl-prev').addClass('icon-left-open-big');
    $(document).find('.owl-next').addClass('icon-right-open-big');

    $('a[href^="#"]').click(function (e) {
        var id = $(this).attr('href');
        var y = $(id).offset().top;
        $('body,html').animate({
            scrollTop: y
        }, 1000);
        e.preventDefault();
        return false;
    });

    //PORTFOLIO AUTO WIDTH
    /*
     $('.portfolio-content-container figure').css({
     width: .25*$(window).width()
     });
     var figureCount = $('.portfolio-content-container figure').length + $('.portfolio-content-container figure.tall').length;
     if(figureCount%2!=0) figureCount++;
     var containerWidth = figureCount*(.25*$(window).width())/2;
     $('.portfolio-content-container').css({
     width:containerWidth
     });
     */

    $('.portfolio-content-container').masonry({
        // options
        itemSelector: 'figure',
        columnWidth: .25*$(window).width()
    });

    /*
     if($('.portfolio-content-container').width() > $('.portfolio-content').width()) {

     $('.portfolio-content-container').draggable({
     axis: 'x',
     cursor: 'move',
     containment: [parseInt($(window).width() - $('.portfolio-content-container').width()),0,0,0]
     });

     }*/


    $('.project-image-small li').click(function () {
        $('.project-image-small li.active').removeClass('active');
        $(this).addClass('active');
        var src = $(this).css('background-image');
        $('.project-image-big figure').css({
            backgroundImage: src
        });
    });

    $('button.portfolio-content-popup-close').click(function(){
        $('.portfolio-content-popup').hide('slow');
    })
    $('.portfolio-content-container figcaption i, .portfolio-content-container figcaption h4, .portfolio-content-container figcaption p').click(
        function(){
            $('.portfolio-content-popup').show('slow');
        }
    )
});