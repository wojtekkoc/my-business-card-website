// Loading
document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        setTimeout(function () {
            $('#loading').toggleClass('active');
        }, 1500);
        setTimeout(function () {
            $('#loading').hide();
        }, 2500);
    }
}

// Menu mobile
const secNavMobile = document.querySelector('section.nav_mobile div.wrapper');
const btnMenuMobile = document.querySelector('.nav_mobile_button');
const btnMenuMobileElement1 = document.querySelector('.nav_mobile_button_div_1');
const btnMenuMobileElement2 = document.querySelector('.nav_mobile_button_div_2');
const btnMenuMobileElement3 = document.querySelector('.nav_mobile_button_div_3');

btnMenuMobile.addEventListener("click", function () {
    btnMenuMobileElement1.classList.toggle('active');
    btnMenuMobileElement2.classList.toggle('active');
    btnMenuMobileElement3.classList.toggle('active');
    secNavMobile.classList.toggle('active');
})

secNavMobile.addEventListener("click", function () {
    btnMenuMobileElement1.classList.toggle('active');
    btnMenuMobileElement2.classList.toggle('active');
    btnMenuMobileElement3.classList.toggle('active');
    secNavMobile.classList.toggle('active');
})

// Swipper slider
const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 60,
    loop: true,
    simulateTouch: true,
    allowTouchMove: true,
    autoplay: {
        delay: 2000,
    },

    breakpoints: {
        500: {
            slidesPerView: 1.2,
            spaceBetween: 60,
            loop: true,
            simulateTouch: true,
            allowTouchMove: true,
            autoplay: {
                delay: 2000,
            },
        },
    }
});

// Steps

const stepsElement = document.querySelectorAll('section.steps div.step div.info');
const stepsNumbers = [...document.querySelectorAll('section.steps div.step div.number')];

const stepsElementArray = Array.from(stepsElement);
let counter = 1;

stepsElement.forEach((element, index) => {
    element.addEventListener("click", () => {
        stepsElement.forEach((element) => {
            element.classList.remove('active');
            for (let i = 0; i < stepsNumbers.length; i++) {
                stepsNumbers[i].classList.remove('active');
            }
        });
        element.classList.toggle('active');
        stepsNumbers[index].classList.toggle('active');
        clearInterval(changeStepsInterval);
        counter = index;
    })
});

function changeSteps() {
    for (let i = 0; i < stepsElementArray.length; i++) {
        stepsElementArray[i].classList.remove('active');
        stepsNumbers[i].classList.remove('active');
    }
    stepsElementArray[counter].classList.add('active');
    stepsNumbers[counter].classList.add('active');
    counter++;
    if (counter == stepsElementArray.length) {
        counter = 0
    }
}

const changeStepsInterval = setInterval(changeSteps, 3000);

// Form
$('#form').on('submit', function (event) {
    event.preventDefault();
    let name = $('input[name="name"]').val();
    let tel = $('input[name="tel"]').val();
    let email = $('input[name="email"]').val();
    let message = $('textarea[name="message"]').val();

    if (validate_name(name) && validate_tel(tel) && validate_email(email) && validate_message(message) && validate_checkbox()) {
        var formData = new FormData();

        formData.append('name', name);
        formData.append('email', email);
        formData.append('tel', tel);
        formData.append('message', message);

        $.ajax({
            url: 'send_form.php',
            type: 'POST',
            contentType: false,
            processData: false,
            data: formData,
            success: function (response) {
                if (response == '1') {
                    $('form')[0].reset();
                    console.log('Formularz przesłany pomyślnie.');
                    $('#message_after_sending').show();
                    setInterval(() => {
                        window.location.href = "index.html"
                    }, 2500)
                } else {
                    alert('Wystąpił błąd');
                    console.log(response)
                }
            }
        });
    } else {
        console.log("Formularz nie zostanie wysłany dopóki wszystkie pola nie zostaną wypełnione poprawnie!")
    }
})

//Validate

$('input[name="name"]').on('keypress', function (e) {
    if ((e.charCode > 32 || e.charCode > 32) && (e.charCode < 65 || e.charCode > 90) && (e.charCode < 97 || e.charCode > 122)) {
        return false;
    }
})

$('input[name="tel"]').on('keypress', function (e) {
    let val = $(this).val();
    if ((val.toString().length > 8) || (e.charCode < 48 || e.charCode > 57)) {
        return false;
    }
})

function validate_name(name) {
    if (name == "") {
        $('input[name="name"]').css({
            'border': '1px solid #c91456'
        });
        $('input[name="name"]').focus();
        $('#name_alert').show();
        $('#surname_alert').hide();
        $('#tel_alert').hide();
        $('#email_alert').hide();
        $('#message_alert').hide();
        $('input[name="surname"]').css({
            'border': '1px solid #d1e8ff00'
        });
        $('input[name="tel"]').css({
            'border': '1px solid #d1e8ff00'
        });
        $('input[name="email"]').css({
            'border': '1px solid #d1e8ff00'
        });
        $('input[name="message"]').css({
            'border': '1px solid #d1e8ff00'
        });
        return false
    } else {
        $('input[name="name"]').css({
            'border': '1px solid #d1e8ff00'
        });
        $('#name_alert').hide();
        return true
    }
}

function validate_tel(tel) {
    if (tel == "" || tel.length < 9) {
        $('input[name="tel"]').css({
            'border': '1px solid #c91456'
        });
        $('input[name="tel"]').focus();
        $('#tel_alert').show();
        $('#name_alert').hide();
        $('#surname_alert').hide();
        $('#email_alert').hide();
        $('#message_alert').hide();
        $('input[name="name"]').css({
            'border': '1px solid #d1e8ff00'
        });
        $('input[name="surname"]').css({
            'border': '1px solid #d1e8ff00'
        });
        $('input[name="email"]').css({
            'border': '1px solid #d1e8ff00'
        });
        $('input[name="message"]').css({
            'border': '1px solid #d1e8ff00'
        });
        return false
    } else {
        $('input[name="tel"]').css({
            'border': '1px solid #d1e8ff00'
        });
        $('#tel_alert').hide();
        return true
    }
}

function validate_email(value) {
    const reg_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    value.replace(/\s/g, "");

    if (value == "" || (!reg_email.test(value))) {
        $('input[name="email"]').css({
            'border': '1px solid #c91456'
        });
        $('input[name="email"]').focus();
        $('#email_alert').show();
        $('#name_alert').hide();
        $('#surname_alert').hide();
        $('#tel_alert').hide();
        $('#message_alert').hide();
        $('input[name="name"]').css({
            'border': '1px solid #d1e8ff00'
        });
        $('input[name="surname"]').css({
            'border': '1px solid #d1e8ff00'
        });
        $('input[name="tel"]').css({
            'border': '1px solid #d1e8ff00'
        });
        $('input[name="message"]').css({
            'border': '1px solid #d1e8ff00'
        });
        return false
    } else {
        $('input[name="email"]').css({
            'border': '1px solid #d1e8ff00'
        });
        $('#email_alert').hide();
        return true
    }

}

function validate_message(message) {
    if (message == "" || message.length < 4) {
        $('textarea[name="message"]').css({
            'border': '2px solid #c91456'
        });
        $('textarea[name="message"]').focus();
        $('#message_alert').show();
        $('#name_alert').hide();
        $('#sur_alert').hide();
        $('#tel_alert').hide();
        $('#email_alert').hide();
        $('input[name="name"]').css({
            'border': '1px solid #d1e8ff00'
        });
        $('input[name="surname"]').css({
            'border': '1px solid #d1e8ff00'
        });
        $('input[name="tel"]').css({
            'border': '1px solid #d1e8ff00'
        });
        $('input[name="email"]').css({
            'border': '1px solid #d1e8ff00'
        });
        return false
    } else {
        $('textarea[name="message"]').css({
            'border': '1px solid #d1e8ff00'
        });
        $('#message_alert').hide();
        return true
    }
}

function validate_checkbox() {
    if (document.getElementById('checkbox').checked) {
        $('input:checked~.checkmark').css({
            'border': '1px solid #d1e8ff00'
        });
        return true
    } else {
        $('div .checkmark').css({
            'border': '1px solid #c91456'
        });
        return false
    }
}