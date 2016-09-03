"use strict";

const ipc = require('electron').ipcRenderer;
const Composer = require('./../composer.js');

document.querySelectorAll(`button`).forEach(function(elem) {
	if (elem.id.match(/extend-v-\w*/)) {
		const table = document.getElementById(elem.id.replace(/extend-v-/, ''));
		elem.addEventListener('click', function(event) {
			extendTableVertical(table);
		});
	} else if (elem.id.match(/extend-h-\w*/)) {
		const table = document.getElementById(elem.id.replace(/extend-h-/, ''));
		elem.addEventListener('click', function(event) {
			extendTableHorizontal(table);
		});
	}
});

function extendTableVertical(table) {
	let newRow = table.insertRow(table.rows.length - 1);
	newRow.innerHTML = table.rows[table.rows.length - 3].innerHTML;
}
