const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzqlgBuV4Az8Z5rMq6p2oI-3587Q5HUJr5kBbKF65E870Sbj7oyq7FhAMvqsai8Xv0F2w/exec';

const clickedLogosArray = [];

const list = document.querySelector('#list');
const interactiveImage = document.querySelector('.interactive-image');
const submitButton = document.querySelector('#submit');
const result = document.querySelector('#result');

interactiveImage.addEventListener('load', () => {
    handleIconsVisible();
});
list.addEventListener('click', onClickImg);
submitButton.addEventListener('click', onSubmit);


function handleIconsVisible() {
    document.querySelectorAll('li').forEach((icon) => icon.style.opacity = 1);
};

function onClickImg(e) {
    result.innerText = ''
    if (e?.target?.nodeName === 'IMG' && e.target.id) {
        if (!clickedLogosArray.includes(e.target.id)) {
            clickedLogosArray.push(e.target.id)
            e.target.parentNode.style.opacity = 0
        }
    }
}
function onSubmit(event) {
    event.preventDefault();
    result.innerText = clickedLogosArray.length;
    clickedLogosArray.length = 0;
    handleIconsVisible();

    // sendDataToGoogleSheet(); TODO: add after form will be done
    // this.reset();
}

function sendDataToGoogleSheet() {

    const formData = new FormData(form)
    formData.append('result', clickedArray.length)

    fetch(SHEET_URL, {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (response.ok) {
        console.log('Data successfully sent to Google Sheet');
        result.innerText = `Total Strikes: ${clickedArray.length}`;
        clickedArray.length = 0;
        handleIconsVisible()
        } else {
        console.error('Error sending data to Google Sheet');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}