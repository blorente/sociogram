"use strict";

const ipc = require('electron').ipcRenderer;
const Composer = require('./composer.js');

const mainWindow = document.getElementById('content-pane');
const openSociogramBtn = document.getElementById('open-sociogram');
const newSociogramBtn = document.getElementById('create-sociogram');

openSociogramBtn.addEventListener('click', function(event) {
	ipc.send('open-sociogram-dialog');
});

newSociogramBtn.addEventListener('click', function(event) {
	ipc.send('create-sociogram');
});

ipc.on('sociogram-open-done', function(event, [path], sociogram) {
	displaySociogramTemplate(sociogram);
	displaySociogramOperationsTree(sociogram);
});

ipc.on('display-sociogram-creation', function(event, template) {
	displayCreateSociogramPage(template);
});

function displaySociogramTree(sociogram) {
	alert('STUB: Add tree view of sociogram operations?');
}

function displaySociogramTemplate(data) {
	mainWindow.innerHTML = '';
	mainWindow.innerHTML += '<p>';
	mainWindow.innerHTML += Composer.composeData(data);
	mainWindow.innerHTML += '</p>';
}

function displayCreateSociogramPage(template) {
	mainWindow.innerHTML = Composer.createSociogramForm(template);
	document.getElementById('save-sociogram').addEventListener('click', function() {
		ipc.send('update-sociogram');
	});
}
