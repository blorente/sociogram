"use strict";

const ipc = require('electron').ipcRenderer;
const Composer = require('./../composer.js');

const content = document.getElementById('create-header');
ipc.send('query-sociogram-template');

ipc.on('response-sociogram-template', function(event, template) {
	displayCreateSociogramPage(template);
});

function displayCreateSociogramPage(template) {
	content.innerHTML = Composer.createSociogramForm(template);
	document.getElementById('save-sociogram').addEventListener('click', function() {
		ipc.send('update-sociogram');
	});
}
