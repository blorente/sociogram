"use strict";

const ipc = require('electron').ipcRenderer;

const welcome = {
	run() {
		let openSociogramBtn = document.getElementById('open-sociogram');
		let newSociogramBtn = document.getElementById('create-sociogram');

		openSociogramBtn.addEventListener('click', function(event) {
			ipc.send('open-sociogram-dialog');
		});

		newSociogramBtn.addEventListener('click', function(event) {
			ipc.send('create-sociogram');
		});
	}
}

module.exports = welcome;
