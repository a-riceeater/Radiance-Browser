const remote = require("@electron/remote")
const r = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
const urlRegex = new RegExp(r);

document.getElementById("navigatorSearch").addEventListener("keydown", (e) => {
    const search = document.getElementById("navigatorSearch");
    const placeholder = document.getElementById("navsPlaceholder")
    
    if (search.contains(placeholder)) {
       placeholder.remove(); 
    } else {
        setTimeout(() => {
            if (search.innerText.length == 0) {
                const phe = document.createElement("span")
                phe.id = 'navsPlaceholder';
                phe.innerText = 'Search or enter address'
                search.appendChild(phe)
            }
        })
    }

    if (e.key == "Enter") {
        const win = remote.getCurrentWindow();
        if (urlRegex.test(search.innerText)) {
            win.loadURL(search.innerText)
        } else {
            win.loadURL(`https://google.com/search?q=${search.innerText}`)
        }
    }
})