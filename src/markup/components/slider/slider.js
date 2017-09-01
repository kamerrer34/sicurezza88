import 'slick-carousel';

function makeSlider() {
    let $sliderCont;

    if ($(window).width() <= 640) {

        $sliderCont = $('.slider');

        $sliderCont.each(function() {
            let $slider = $(this).children();

            if ($slider.hasClass('slick-slider')) {
                $slider.slick('unslick');
            }

            $slider.slick({
                infinite: false,
                arrows: false,
                dots: true
            });
        });
    } else {
        $sliderCont = $('.slider_desktop');
        $sliderCont.each(function() {
            let $slider = $(this).children();

            if ($slider.hasClass('slick-slider')) {
                $slider.slick('unslick');
            }

            $slider.slick({
                infinite: true,
                arrows: true,
                dots: false,
                slidesToShow: 3
            });
        });

        if ($('.slider:not(.slider_desktop) .slick-slider').length) {
            $('.slider:not(.slider_desktop) .slick-slider').slick('unslick');
        }
    }
}

makeSlider();

$(window).resize(function(){
    makeSlider();
});
