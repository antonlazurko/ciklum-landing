const SHEET_URL = 'https://script.google.com/macros/s/AKfycbz8_epEb1QAtYaahUEAsSlwRdfTvaWfjTHarF82IzwuDobm9pqcRJf4hqwtlB5mk3rcWQ/exec';

const clickedLogosArray = [];

window.addEventListener('load', function() {
    const list = document.querySelector('#list');
    const form = document.querySelector('#form');
    const loader = document.querySelector('#loader');
    const scoreEl = document.querySelector('#score');

    list.addEventListener('click', onClickImg);
    form.addEventListener('submit', onSubmit);
    handleIconsVisible()

    function handleIconsVisible() {
        document.querySelectorAll('li').forEach((icon) => icon.style.opacity = 1);
    };

    function onClickImg(e) {
        if (e?.target?.nodeName === 'IMG' && e.target.id) {
            if (scoreEl.innerHTML) {
                scoreEl.innerHTML = ''
            }
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
            scoreEl.innerHTML = `Score: <b>${result}</b>`
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
})