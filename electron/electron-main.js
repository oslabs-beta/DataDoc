const { app, BrowserWindow } = require("electron");
const url = require("url");
require("dotenv").config();

const { SERVER_URL } = process.env;

function createWindow() {
  let win = new BrowserWindow({
    width: 960,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  if (process.env.NODE_ENV === 'production') {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:9990',
      pathname: 'index.html',
      slashes: true
    })
  } else {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true
    })
  }
  win.loadURL(indexPath);
  win.once('ready-to-show', () => {
    win.show()
  })
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
