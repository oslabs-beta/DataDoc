const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs");
require("dotenv").config();

const { SERVER_URL } = process.env;

console.log("ELECTRON RUNNING SMOOTH");

function createWindow() {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  console.log(fs.readdirSync("./dist"));
  win.loadFile("./dist/index.html");
  // win.loadURL("http://localhost:8080")
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
