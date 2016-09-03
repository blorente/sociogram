"use strict";

const ipc = require('electron').ipcRenderer;
const Composer = require('./composer.js');

const mainWindow = document.getElementById('content-pane');

ipc.on('display-sociogram-data', function(event, [path], sociogram) {
	displaySection('display-sociogram');
});

ipc.on('display-sociogram-creation', function(event) {
	displaySection('create-header');
});

function displaySection(name) {
	console.log("Display Section: ", name);
	mainWindow.innerHTML = '';
	const link = document.querySelector(`link[id="${name}-section"]`);

	// Clone the <template> in the import.
	const template = link.import.querySelector('template');
	const clone = document.importNode(template.content, true);

	mainWindow.appendChild(clone);
}

displaySection('welcome');
