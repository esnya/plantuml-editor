'use strict';

const plantuml = require('node-plantuml');

const editor = document.getElementById('editor');
const viewer = document.getElementById('viewer');

plantuml.useNailgun();

let counter = 0;
let current = 0;
const generate = () => {
    const seqno = ++counter;

    const gen = plantuml.generate({ format: 'svg' });

    gen.in.write(editor.value);
    gen.in.end();

    const chunks = [];
    gen.out.on('data', (data) => {
        chunks.push(data);
    }).on('end', () => {
        if (seqno >= current) {
            current = seqno;
            const uml = Buffer.concat(chunks).toString();
            viewer.innerHTML = uml;
        }
    });
};
editor.addEventListener('input', generate);
generate();

module.exports.generate = generate;
