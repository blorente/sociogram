"use strict";

const {app, BrowserWindow} = require('electron');

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
	console.log('Hello!');
	createWindow();
});

app.on('window-all-closed', () => {
	console.log("Bye!");
	app.quit();
});
