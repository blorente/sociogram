"use strict";

const ipc = require('electron').ipcRenderer;
const Composer = require('./composer.js');

const openSociogramBtn = document.getElementById('open-sociogram');

openSociogramBtn.addEventListener('click', function (event) {
	ipc.send('open-sociogram-dialog');
});

ipc.on('sociogram-opened', function (event, [path], sociogram) {
	addToRecentSociograms(path);
	displaySociogramTemplate(sociogram);
});

function addToRecentSociograms(path) {
	let recentSociograms = document.getElementById('recent-sociograms');
	const filename = path.split('/').pop(0);
	const listItem = document.createElement("li");
	listItem.className = "list-group-item";
	listItem.innerHTML =
	`<div class="media-body">
		<strong>${filename}</strong>
		<p>${path}</p>
	</div>`;
	recentSociograms.appendChild(listItem);
}

function displaySociogramTemplate(data) {
	const mainWindow = document.getElementById('content-pane');
	mainWindow.innerHTML = '';
	mainWindow.innerHTML += '<p>';
	mainWindow.innerHTML += Composer.composeData(data);
	mainWindow.innerHTML += '</p>';
}
