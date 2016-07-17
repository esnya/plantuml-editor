'use strict';

const electron = require('electron');
const { ipcRenderer } = electron;
const { dialog } = electron.remote;

const { readFile, writeFile } = require('fs');
const { generate } = require('./generator');

const editor = document.getElementById('editor');

ipcRenderer.on('new', () => {
    editor.value = '@startuml\n\n@enduml';
    generate();
});

let currentFilename = null;
const setCurrentFilename = (filename) => {
    document.title = `${filename || '(New File)'} - PlantUML Editor`;
    currentFilename = filename;
};
const open = (filename) => {
    readFile(filename, (e, data) => {
        if (e) {
            alert(e.toString());
            return;
        }

        editor.value = data.toString();
        generate();
        setCurrentFilename(filename);
    });
};
const save = (filename) => {
    writeFile(filename, editor.value, (e) => {
        if (e) {
            alert(e.toString());
            return;
        }

        setCurrentFilename(filename);
    });
};
const saveAs = () => {
    dialog.showSaveDialog({
        title: 'Save As',
    }, save);
};

ipcRenderer.on('open', () => {
    dialog.showOpenDialog({
        title: 'Open',
    }, (filenames) => open(filenames[0]));
});
ipcRenderer.on('save', () => {
    if (currentFilename) save(currentFilename);
    else saveAs();
});
ipcRenderer.on('save-as', saveAs);
