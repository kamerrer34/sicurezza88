$('.header-nav__btn').on('click', function () {
    $(this).closest('.header-nav').toggleClass('active');
});

$('.header-nav__link, .js-anchor-link').on('click', function (e) {
    e.preventDefault();
    let anchor = $(this).attr('href'),
        top = $(anchor).offset().top;

    $('body, html').animate({ scrollTop: top }, 500);
});
