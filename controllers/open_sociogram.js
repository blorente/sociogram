"use strict";

const ipc = require('electron').ipcMain;
const dialog = require('electron').dialog;

ipc.on('open-sociogram-dialog', function (event) {
	dialog.showOpenDialog({
		properties: ['openFile']
	}, function (files) {
		if (files) event.sender.send('sociogram-opened', files);
	});
})
