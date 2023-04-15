const tabs = document.querySelectorAll('.tab');
const pages = document.querySelectorAll('#pages > div');
const addressInput = document.querySelector('#address-input');
const goButton = document.querySelector('#go-button');

const remote = require('@electron/remote')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(tab => tab.classList.remove('active'));

        tab.classList.add('active');

        pages.forEach(page => page.style.display = 'none');

        const pageId = tab.getAttribute('data-page');
        const page = document.querySelector(`#${pageId}`);
        page.style.display = 'block';
    });
});

goButton.addEventListener('click', () => {
    const url = addressInput.value.trim();
    if (url) {
        const win = remote.getCurrentWindow();
        console.log("Loading url " + url)
        win.loadURL(url);
    }
});