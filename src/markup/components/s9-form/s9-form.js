import 'magnific-popup';

let utmArr = window.location.search.slice(1).split('&');
let utm = [];
for (let i = 0; i < utmArr.length; i++) {
    let item = utmArr[i].split('=');
    utm[item[0]] = item[1];
}

$('input[name="source"]').val(utm.utm_source);
$('input[name="medium"]').val(utm.utm_medium);
$('input[name="campaign"]').val(utm.utm_campaign);

$('.s9-form__cross').on('click', function () {
    $(this).prev('input').val('');
});

$('.js-popup-close').on('click', function () {
    $.magnificPopup.close();
});

$('.js-open-privacy').magnificPopup({
    showCloseBtn: false,
    items: {
        src: '#popup-privacy',
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
        errorEmpty = false,
        errorPrivacy = false;

    if (!$privacy.prop('checked')) {
        $privacy.closest('label').addClass('error');
        errorPrivacy = true;
    }

    $inputs.each(function() {
        let $self = $(this);
        if ($self.val() === '') {
            $self.addClass('error');
            errorEmpty = true;
        }
    });

    if (errorEmpty || errorPrivacy) {
        if (errorEmpty) {
            $('.s9-form__text.empty').show();
            $('.s9-form__text.privacy').hide();
        } else {
            $('.s9-form__text.empty').hide();
            $('.s9-form__text.privacy').show();
        }
    } else {
        let nome = $('input[name="nome"]').val(),
            azienda = $('input[name="azienda"]').val(),
            piva = $('input[name="piva"]').val(),
            telefono = $('input[name="telefono"]').val(),
            email = $('input[name="email"]').val(),
            regione = $('input[name="regione"]').val(),
            provincia = $('input[name="provincia"]').val(),
            citta = $('input[name="citta"]').val(),
            indirizzo = $('input[name="indirizzo"]').val(),
            cap = $('input[name="cap"]').val(),
            messaggio = $('textarea[name="messaggio"]').val(),
            source = $('input[name="source"]').val(),
            medium = $('input[name="medium"]').val(),
            campaign = $('input[name="campaign"]').val(),
            catalogo = $('input[name="catalogo"]').prop('checked'),
            libro = $('input[name="libro"]').prop('checked');

        if(!source) {
            source = ' ';
        }

        if(!medium) {
            medium = ' ';
        }

        if(!campaign) {
            campaign = ' ';
        }

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

        $.post("mailchimp.php", {
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
                'SOURCE': source,
                'MEDIUM': medium,
                'CAMPAIGN': campaign
            }
        }).done(function(data) {
           $.magnificPopup.open({
               showCloseBtn: false,
               items: {
                   src: '#popup-success',
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

        $('.s9-form__text').hide();
    }
});
