//@ts-nocheck
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import dotenv from 'dotenv';
import { buildListeners } from './listeners';
import {detectGame, loadConfig, logger } from '../helpers';
logger.init();
detectGame();

dotenv.config();
loadConfig();

let mainWindow;


function createWindow() {

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, './bridge.js'),
    },
  });

  mainWindow.loadFile(path.join(__dirname, '../public/init.html'));

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null as any;
  });
}

async function registerListeners () {
  buildListeners(ipcMain);
}

app.on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .then(() => {
    app.on('activate', function () {

    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    };
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  };
});
