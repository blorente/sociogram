"use strict";

const ipc = require('electron').ipcRenderer;
const Composer = require('./../composer.js');

const displaySociogram = {
	run() {
		const content = document.getElementById('display-sociogram');

		ipc.send('query-sociogram-state');
		ipc.on('response-sociogram-state', function(event, data) {
			displaySociogram(data);
		});

		function displaySociogram(data) {
			content.innerHTML += Composer.composeData(data);
		}
	}
}

module.exports = displaySociogram;
