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
})