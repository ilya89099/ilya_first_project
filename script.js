var modal = document.querySelector('.modal');
var loginLink = document.querySelector('.login');
var closeModal = document.querySelector('.close-modal')
var tint = document.querySelector('.tint')
var form = modal.querySelector('form')
var login = form.querySelector('[name="login"]')
var password = form.querySelector('[name="password"]')
var remember = form.querySelector('[type = "checkbox"]')


loginLink.addEventListener('click', function(event) {
    event.preventDefault();
    modal.classList.add('opened');
    tint.classList.add('tint-active');
    if (localStorage.getItem('remember') == 'true') {
        remember.checked = true;
    }
    if (localStorage.getItem('login') && localStorage.getItem('remember') == 'true') {
        login.value = localStorage.getItem('login');
        password.focus();
    } else {
        login.focus();
    }
});

function Correct() {
    login.placeholder = "Логин";
    login.classList.add('correct');
    login.classList.remove('incorrect');
    password.placeholder = "Пароль";
    password.classList.add('correct');
    password.classList.remove('incorrect');
}

closeModal.addEventListener('click', function() {
    modal.classList.remove('opened')
    tint.classList.remove('tint-active')
    Correct();
})

form.addEventListener('submit', function(event) {
    if (!login.value || !password.value) {
        event.preventDefault();
        if (!login.value) {
            login.classList.add('incorrect');
            login.classList.remove('correct');
            login.placeholder = "Заполните это поле";
        }
        if (!password.value) {
            password.classList.add('incorrect');
            password.classList.remove('correct');
            password.placeholder = "Заполните это поле";
        }
    } else {
        localStorage.setItem('login', login.value);
        localStorage.setItem('remember', remember.checked);
    }
})

login.addEventListener('focus', function() {
    login.placeholder = "Логин";
    login.classList.add('correct');
    login.classList.remove('incorrect');
})

password.addEventListener('focus', function() {
    password.placeholder = "Пароль";
    password.classList.add('correct');
    password.classList.remove('incorrect');
})