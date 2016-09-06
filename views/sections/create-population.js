"use strict";

const ipc = require('electron').ipcRenderer;
const htmlUtils = require('./../htmlutils.js');
const Collector = require('./../collector.js');
const index = require('./../index.js');

const createPopulation = {
	run() {
		htmlUtils.makeFormsExtendable();

		document.getElementById('next').addEventListener('click', function(event) {
			const form = document.getElementById('create-header-form');
			const formData = Collector.collectFormData(form);
			ipc.send('update-sociogram', formData);
			index.displaySection('display-sociogram');
		});

		document.getElementById('cancel').addEventListener('click', function(event) {
			ipc.send('cancel-sociogram');
		});
	}
}

module.exports = createPopulation;
