var modal = document.querySelector('.modal');
var loginLink = document.querySelector('.login');
var closeModal = document.querySelector('.close-modal')

loginLink.addEventListener('click', function(event) {
    event.preventDefault();
    modal.classList.add('opened');
});

closeModal.addEventListener('click', function() {
    modal.classList.remove('opened')
})