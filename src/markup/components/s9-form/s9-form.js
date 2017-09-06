import 'magnific-popup';

$('.s9-form__cross').on('click', function () {
    $(this).prev('input').val('');
});

$('.js-popup-close').on('click', function () {
    $.magnificPopup.close();
});

$('input[name="privacy"]').on('change', function () {
    let $self = $(this);

    if ($self.closest('label').hasClass('error') && $self.prop('checked')) {
        $self.closest('label').removeClass('error');
    }
});

$('.data__input').on('change', function () {
    let $self = $(this);

    if ($self.val() !== '') {
        $self.removeClass('error');
    }
});

$('.s9-form').on('submit', function (e) {
    e.preventDefault();

    let $inputs = $(this).find('.data__input'),
        $privacy = $('input[name="privacy"]'),
        error = false;

    if (!$privacy.prop('checked')) {
        $privacy.closest('label').addClass('error');
        error = true;
    }

    $inputs.each(function() {
        let $self = $(this);
        if ($self.val() === '') {
            $self.addClass('error');
            error = true;
        }
    });

    if (error) {
        $('.s9-form__text').show();
    } else {
        let nome = $('input[name="nome"]').val(),
            azienda = $('input[name="azienda"]').val(),
            piva = $('input[name="piva "]').val(),
            telefono = $('input[name="telefono"]').val(),
            email = $('input[name="email"]').val(),
            regione = $('input[name="regione"]').val(),
            provincia = $('input[name="provincia"]').val(),
            citta = $('input[name="citta"]').val(),
            indirizzo = $('input[name="indirizzo"]').val(),
            cap = $('input[name="cap"]').val(),
            messaggio = $('textarea[name="messaggio"]').val(),
            catalogo = $('input[name="catalogo"]').prop('checked'),
            libro = $('input[name="libro"]').prop('checked');

        if (catalogo) {
            catalogo = 'yes';
        } else {
            catalogo = 'no';
        }

        if (libro) {
            libro = 'yes';
        } else {
            libro = 'no';
        }

        $.ajax({
            url: 'https://us10.api.mailchimp.com/3.0/lists/5a1915bff9/members',
            type: 'POST',
            headers: {
                'Authorization': 'apikey 5cb8f5370d53e9549ed43b39e0a19327-us10',
                'Content-Type': 'application/json'
            },
            body: {
                'email_address': email,
                'status': 'subscribed',
                'merge_fields': {
                    'NOME': nome,
                    'AZIENDA': azienda,
                    'PIVA': piva,
                    'TELEFONO': telefono,
                    'EMAIL': email,
                    'REGIONE': regione,
                    'PROVINCIA': provincia,
                    'CITTA': citta,
                    'INDIRIZZO': indirizzo,
                    'CAP': cap,
                    'MESSAGGIO': messaggio,
                    'CATALOGO': catalogo,
                    'LIBRO': libro,
                    'SOURCE': '',
                    'MEDIUM': '',
                    'CAMPAIGN': ''
                }
            },
            success: function () {
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
            },
            error: function (data) {
                console.log(data);
            }
        });

        $('.s9-form__text').hide();
    }
});
