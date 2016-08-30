"use strict";

const ipc = require('electron').ipcRenderer;

const openSociogramBtn = document.getElementById('open-sociogram');

openSociogramBtn.addEventListener('click', function (event) {
	console.log('Open Sociogram');
	ipc.send('open-sociogram-dialog');
});

ipc.on('sociogram-opened', function (event, [path]) {
	addToRecentSociograms(path);
});

function addToRecentSociograms(path) {
	let recentSociograms = document.getElementById('recent-sociograms');
	const filename = path.split('/').pop(0);
	const listItem = document.createElement("li");
	listItem.class = "list-group-item";
	listItem.innerHTML =
	`<div class="media-body">
		<strong>${filename}</strong>
		<p>${path}</p>
	</div>`;
	recentSociograms.appendChild(listItem);
}
