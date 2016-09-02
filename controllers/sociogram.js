"use strict";

const ipc = require('electron').ipcMain;
const dialog = require('electron').dialog;
const fs = require('fs');
const Reporter = require('../model/reporter.js');
const Sociogram = require('../model/sociogram.js');

let currentSociogram;
let savePath;

ipc.on('open-sociogram-dialog', function (event) {
	dialog.showOpenDialog({
		properties: ['openFile'],
		filters: [{name: 'All files', extensions: ['soc']}]
	}, function (file) {
		if (file) {
			fs.readFile(file.toString(), 'utf-8', function(err, raw) {
				currentSociogram = new Sociogram(JSON.parse(raw));
				event.sender.send('display-sociogram-data', file);
			});
		} else {
			event.sender.send('sociogram-open-cancel');
		}
	});
});

ipc.on('create-sociogram', function(event) {
	if (currentSociogram) {
		askSaveSociogram(currentSociogram);
	}
	initValues();
	event.sender.send('display-sociogram-creation');
});

ipc.on('query-sociogram-template', function(event) {
	event.sender.send('response-sociogram-template',
		Reporter.reportSociogramForm(currentSociogram.createTemplate()));
});

ipc.on('query-sociogram-state', function(event) {
	event.sender.send('response-sociogram-state', Reporter.reportSociogram(currentSociogram));
});

ipc.on('update-sociogram', function(event) {
	askSaveSociogram(currentSociogram);
});

function initValues() {
	currentSociogram = new Sociogram({});
	savePath = '';
}

function askSaveSociogram(sociogram) {
	if (savePath) {
		saveSociogram(savePath, sociogram);
	} else {
		dialog.showSaveDialog({
			filters: [{name: 'All Files', extensions: ['soc']}]
		}, function(filepath) {
			saveSociogram(filepath, sociogram);
			savePath = filepath;
		});
	}
}

function saveSociogram(path, sociogram) {
	if (path) {
		fs.writeFile(path, JSON.stringify(sociogram), function (err) {
			if(err){
				dialog.showErrorBox('ERROR', 'An error ocurred creating the file ' + err.message);
			}
		});
	}
}
