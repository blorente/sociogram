"use strict";

const Sociogram = require('./sociogram.js');

const Updater = {
	updateSociogram(original, newData) {
		let updated = original;
		if (newData.metadata) {
			updated = Updater.updateMetaData(updated, newData.metadata);
		}
		return updated;
	},

	updateMetaData(original, newData) {
		let updated = original;
		for (let i = 0; i < newData.headers.length; i++) {
			updated[newData.headers[i]] = newData.values[0][i];
		}
		return updated;
	}
}

module.exports = Updater;
