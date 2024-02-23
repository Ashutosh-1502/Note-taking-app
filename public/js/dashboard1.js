const remainder = document.querySelector('.note-remainder');
const noteData = document.querySelector('.note-data');
if (parseInt(noteData.childElementCount) === 0) {
    remainder.classList.remove('hidden');
}
else {
    remainder.classList.add('hidden');
}