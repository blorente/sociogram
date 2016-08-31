"use strict";

const ipc = require('electron').ipcMain;
const dialog = require('electron').dialog;
const fs = require('fs');
const Reporter = require('../model/reporter.js');
const Sociogram = require('../model/sociogram.js');

ipc.on('open-sociogram-dialog', function (event) {
	dialog.showOpenDialog({
		properties: ['openFile'],
		filters: [{name: 'All files', extensions: ['soc']}]
	}, function (file) {
		if (file) {
			fs.readFile(file.toString(), 'utf-8', function(err, raw) {
				const sociogram = new Sociogram(JSON.parse(raw));
				const data = Reporter.reportSociogram(sociogram);
				event.sender.send('sociogram-opened', file, data);
			});
		} else {
			event.sender.send('sociogram-open-cancel');
		}
	});
})
