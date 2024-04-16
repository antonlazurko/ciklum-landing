const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzqlgBuV4Az8Z5rMq6p2oI-3587Q5HUJr5kBbKF65E870Sbj7oyq7FhAMvqsai8Xv0F2w/exec';

const clickedLogosArray = [];

const list = document.querySelector('#list');
const interactiveImage = document.querySelector('.interactive-image');
const form = document.querySelector('#form');
const loader = document.querySelector('#loader');

interactiveImage.addEventListener('load', () => {
    handleIconsVisible();
});
list.addEventListener('click', onClickImg);
form.addEventListener('submit', onSubmit);


function handleIconsVisible() {
    document.querySelectorAll('li').forEach((icon) => icon.style.opacity = 1);
};

function onClickImg(e) {
    if (e?.target?.nodeName === 'IMG' && e.target.id) {
        if (!clickedLogosArray.includes(e.target.id)) {
            clickedLogosArray.push(e.target.id)
            e.target.parentNode.style.opacity = 0
        }
    }
}
function onSubmit(event) {
    event.preventDefault();
    const result = clickedLogosArray.length
    sendDataToGoogleSheet(result);
    this.reset();
}

function sendDataToGoogleSheet(result) {

    const formData = new FormData(form)
    formData.append('result', result)
    loader.style.display = 'flex'
    form.style.display = 'none'

    fetch(SHEET_URL, {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (response.ok) {
        console.log('Data successfully sent to Google Sheet');
        clickedLogosArray.length = 0;
        handleIconsVisible()
        } else {
        console.error('Error sending data to Google Sheet');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    })
    .finally(() => {
        loader.style.display = 'none'
        form.style.display = 'flex'
    });
}