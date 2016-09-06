"use strict";

const ipc = require('electron').ipcRenderer;
const htmlUtils = require('./../htmlutils.js');
const Collector = require('./../collector.js');
const index = require('./../index.js');

const createHeader = {
	run() {
		htmlUtils.makeFormsExtendable();

		document.getElementById('next').addEventListener('click', function(event) {
			const form = document.getElementById('create-header-form');
			const formData = Collector.collectFormData(form);
			ipc.send('update-sociogram', formData);
			index.displaySection('create-population');
		});

		document.getElementById('cancel').addEventListener('click', function(event) {
			ipc.send('cancel-sociogram');
		});
	}
}

module.exports = createHeader;
