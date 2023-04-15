const electron = require("electron")
const ipcr = electron.ipcRenderer;

ipcr.on("reload", () => {
    console.log("Reloading!")
    window.location = ''
})