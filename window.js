const { app, BrowserWindow, ipcMain } = require('electron');
const { fstat } = require('original-fs');
require('@electron/remote/main').initialize()
const fs = require("fs")

function createWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      devTools: true
    },
    resizable: true,
    frame: false,
    devTools: true,
    contextIsolation: false,
    enableRemoteModule: true,
    //icon: path.join(__dirname + '/relico.ico'),
  })
  win.loadFile('web/frame.html');

  require('@electron/remote/main').enable(win.webContents)

  const debounce = require('debounce');

  const handleFileChange = debounce((eventType, filename) => {
    if (eventType === 'change') {
      console.log(`${filename} was updated. Reloading...`);
      win.webContents.send("reload")
    }
  }, 100);

  fs.watch('./web', (eventType, filename) => {
    handleFileChange(eventType, filename);
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});