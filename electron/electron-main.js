require("dotenv").config();
const { app, BrowserWindow } = require("electron");
const url = require("url");

const { SERVER_URL } = process.env;

function createWindow() {
  let win = new BrowserWindow({
    width: 960,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
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
  setTimeout(() => win.loadURL(indexPath), 1000);
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
