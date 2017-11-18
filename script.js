var modal = document.querySelector('.modal');
var loginLink = document.querySelector('.login');
var closeModal = document.querySelector('.close-modal')
var tint = document.querySelector('.tint')
var form = modal.querySelector('form')
var login = form.querySelector('[name="login"]')
var password = form.querySelector('[name="password"]')
var remember = form.querySelector('[type = "checkbox"]')
var send = form.querySelector('.btn')

var loginFocus = false;
var passwordFocus = false;
var sendFocus = false;


function closeModalFunc() {
    modal.style.marginTop = '-1000px';
    setTimeout(function() {
        modal.classList.remove('opened');
    }, 500);
    tint.classList.remove('tint-active');
}

function openModalFunc() {
    modal.style.marginTop = '-200px';
    modal.classList.add('opened');
    tint.classList.add('tint-active');
}

loginLink.addEventListener('click', function(event) {
    event.preventDefault();
    openModalFunc();
    if (localStorage.getItem('remember') == 'true') {
        remember.checked = true;
    }

    if (localStorage.getItem('login')) {
        login.value = localStorage.getItem('login');
        password.focus();
    } else {
        login.focus();
    }
    if (localStorage.getItem('password') && localStorage.getItem('remember') == 'true') {
        password.value = localStorage.getItem('password');
        send.focus();
    }
});



function loginCorrect() {
    login.placeholder = "Логин";
    login.classList.add('correct');
    login.classList.remove('incorrect');
}

function passwordCorrect() {
    password.placeholder = "Пароль";
    password.classList.add('correct');
    password.classList.remove('incorrect');
}

function loginIncorrect() {
    login.placeholder = "Заполните это поле";
    login.classList.add('incorrect');
    login.classList.remove('correct');
}

function passwordIncorrect() {
    password.placeholder = "Заполните это поле";
    password.classList.add('incorrect');
    password.classList.remove('correct');
}

closeModal.addEventListener('click', function() {
    closeModalFunc();
    loginCorrect();
    passwordCorrect();
})

form.addEventListener('submit', function(event) {
    if (!login.value || !password.value) {
        event.preventDefault();
        if (!login.value) {
            loginIncorrect();
        }
        if (!password.value) {
            passwordIncorrect();
        }
    } else {
        localStorage.setItem('login', login.value);
        localStorage.setItem('password', password.value);
        localStorage.setItem('remember', remember.checked);
    }
})

window.addEventListener('keydown', function(es) {
    if (es.keyCode == '27') {
        closeModalFunc();
    }
    if (es.keyCode == '38') {
        es.preventDefault();
        if (passwordFocus == true) {
            login.focus();
        } else
        if (loginFocus == true) {
            send.focus();
        } else
        if (sendFocus == true) {
            password.focus();
        }
    }
    if (es.keyCode == '40') {
        es.preventDefault();
        if (loginFocus == true) {
            password.focus();
        } else
        if (passwordFocus == true) {
            send.focus();
        } else
        if (sendFocus == true) {
            login.focus();
        }
    }
    if (es.keyCode == '32') {
        es.preventDefault();
        send.focus();
    }
})


login.addEventListener('focus', function() {
    loginCorrect();
    loginFocus = true;
    passwordFocus = false;
    sendFocus = false;
})

password.addEventListener('focus', function() {
    passwordCorrect();
    loginFocus = false;
    passwordFocus = true;
    sendFocus = false;
})

send.addEventListener('focus', function() {
    loginFocus = false;
    passwordFocus = false;
    sendFocus = true;
})

login.addEventListener('input', function() {
    loginCorrect();
})

password.addEventListener('input', function() {
    passwordCorrect();
})


window.addEventListener('keydown', function(keyEvent) {
    if (keyEvent.keyCode == 13) {
        keyEvent.preventDefault();
        if (passwordFocus == true) {
            if (password.value) {
                send.focus();
            }
            if (!password.value) {
                passwordIncorrect();
            }
        }
        if (loginFocus == true) {
            if (login.value) {
                password.focus();
            }
            if (!login.value) {
                loginIncorrect();
            }
        }
        if (sendFocus == true) {
            if (login.value && password.value) {
                form.submit();
            } else {
                login.focus();
                if (!login.value) { loginIncorrect(); }
                if (!password.value) { passwordIncorrect(); }
            }
        }
    }
})