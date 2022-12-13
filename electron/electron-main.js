const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');


console.log("ELECTRON RUNNING SMOOTH");

function createWindow() {

  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }

  })

  win.loadFile("./dist/index.html")

}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})