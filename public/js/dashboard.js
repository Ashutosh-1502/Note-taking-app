document.addEventListener('DOMContentLoaded', function () {
    const input = document.querySelector('.form-data input');
    const textarea = document.querySelector('.form-data textarea');
    const form = document.querySelector('.form-data');
    const span = document.querySelector('.form-data span');
    form.addEventListener('submit', function (e) {
        if (input.value.length <= 0 || textarea.value.length <= 0) {
            e.preventDefault();
            alert('Please Fill all the required fields');
        }
    });
});