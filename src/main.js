'use strict';

const electron = require('electron');
const { app, BrowserWindow } = electron;

const menu = require('./menu');

let mainWindow = null;
const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
    });

    mainWindow.setMenu(menu.build(mainWindow));
    mainWindow.loadURL(`file://${__dirname}/../index.html`);
    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

app.on('ready', createWindow);

app.on('activate', () => {
    if (!mainWindow) createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
