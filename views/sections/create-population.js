"use strict";

const ipc = require('electron').ipcRenderer;
const htmlUtils = require('./../htmlutils.js');
const Collector = require('./../collector.js');
const index = require('./../index.js');

const createPopulation = {
	run() {
		htmlUtils.makeFormsExtendable(this.extendTableCallback);
		this.createVariableFields();

		document.getElementById('next').addEventListener('click', function(event) {
			const form = document.getElementById('create-population-form');
			const formData = Collector.collectFormData(form);
			ipc.send('update-sociogram', formData);
			index.displaySection('display-sociogram');
		});

		document.getElementById('cancel').addEventListener('click', function(event) {
			ipc.send('cancel-sociogram');
		});
	},

	extendTableCallback(table) {
		let lastRow = table.rows[table.rows.length - 2];
		let lastID = parseInt(table.rows[table.rows.length - 3].cells[1].innerHTML);
		lastRow.cells[1].innerHTML = lastID + 1;
	},

	createVariableFields() {
		let populationtable = document.getElementById('individuals-table');
		ipc.send('query-sociogram-variables');
		ipc.on('response-sociogram-variables', function(event, variables) {
			variables.forEach(function(variable) {
				if (variable.name) {
					const newTitle = populationtable.rows[0].insertCell(-1);
					newTitle.id = variable.name;
					newTitle.innerHTML = '<label>' + variable.name + '</label>';
					const newInput = populationtable.rows[1].insertCell(-1);
					let newChoice = '<select class="form-control">';
					variable.values.forEach(function(value) {
						newChoice += `<option>${value}</option>`;
					});
					newChoice += '</select>';
					newInput.innerHTML += newChoice;
				}
			});
		});
	}
}
module.exports = createPopulation;
