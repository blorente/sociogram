"use strict";

const ipc = require('electron').ipcRenderer;
const Composer = require('./../composer.js');
const Forms = require('./../forms.js');

const content = document.getElementById('create-header');
let form = {};

ipc.send('query-sociogram-template');
ipc.on('response-sociogram-template', function(event, template) {
	form = template;
	displayCreateSociogramPage(form);
});

function displayCreateSociogramPage(form) {
	content.innerHTML = Composer.createSociogramForm(form);
	document.getElementById('save-sociogram').addEventListener('click', function() {
		ipc.send('update-sociogram');
	});
	document.querySelectorAll(`button`).forEach(function(elem) {
		if (elem.id.match(/extend-\w*/)) {
			elem.addEventListener('click', function() {
				const name = this.id.replace(/extend-/, '');
				console.log(name);
			});
		}
	});
}
