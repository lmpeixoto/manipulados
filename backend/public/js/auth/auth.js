const userMessages = document.querySelector('.user-messages');

if (userMessages) {
    setTimeout(function () {
        userMessages.className = 'hide';
    }, 5000);
}
