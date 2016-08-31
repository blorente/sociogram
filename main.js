"use strict";

const {app, BrowserWindow} = require('electron');
const path = require('path');
const glob = require('glob');

let win;

function createWindow() {
	win = new BrowserWindow({
		width: 800,
		height: 600
	});

	win.loadURL(`file://${__dirname}/views/index.html`);
	win.on('closed', () => {
		win = null;
	})
}

app.on('ready', function() {
	loadControllers();
	createWindow();
});

app.on('window-all-closed', () => {
	app.quit();
});

function loadControllers() {
	const files = glob.sync(path.join(__dirname, 'controllers/*.js'));
	files.forEach(function (file) {
    	require(file);
  	});
}
