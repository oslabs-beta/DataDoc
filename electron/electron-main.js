const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs");
require("dotenv").config();

const { SERVER_URL } = process.env;

function createWindow() {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
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
  console.log(indexPath)
  setTimeout(() => win.loadURL(indexPath), 1000);
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
