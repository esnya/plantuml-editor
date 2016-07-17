'use strict';

const { Menu } = require('electron');

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New',
                accelerator: 'CmdOrCtrl+N',
                role: 'new',
            },
            {
                label: 'Open',
                accelerator: 'CmdOrCtrl+O',
                role: 'open',
            },
            {
                label: 'Save',
                accelerator: 'CmdOrCtrl+S',
                role: 'save',
            },
            {
                label: 'Save As',
                accelerator: 'Shift+CmdOrCtrl+S',
                role: 'save-as',
            },
            {
                label: 'Quit',
                role: 'quit',
            },
        ],
    },
    {
        label: 'Edit',
        submenu: [
        ],
    },
    {
        label: 'Help',
        submenu: [
        ],
    },
];

const bind = (mainWindow, template) =>
    template.map((value) => {
        const submenu = value.submenu &&
            bind(mainWindow, value.submenu);

        return Object.assign({}, value, {
            submenu,
            click: () => {
                mainWindow.webContents.send(value.role);
            },
        });
    });

module.exports.build = (mainWindow) =>
    Menu.buildFromTemplate(bind(mainWindow, menuTemplate));
