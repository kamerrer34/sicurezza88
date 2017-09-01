import 'magnific-popup';

$('.s9-form__cross').on('click', function () {
    $(this).prev('input').val('');
});

$('.s9-form').on('submit', function (e) {
    e.preventDefault();

    $.magnificPopup.open({
        showCloseBtn: false,
        items: {
            src: '#popup',
            type: 'inline'
        },
        callbacks: {
            open: function() {
                $('body').addClass('open-popup');
            },
            close: function() {
                $('body').removeClass('open-popup');
            }
        }
    });
});

$('.js-popup-close').on('click', function () {
    $.magnificPopup.close();
});
