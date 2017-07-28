import 'slick-carousel';

function makeSlider() {
    if ($(window).width() <= 640) {

        let $sliderCont = $('.slider');

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
        if ($('.slick-slider').length) {
            $('.slick-slider').slick('unslick');
        }
    }
}

makeSlider();

$(window).resize(function(){
    makeSlider();
});
