"use strict";

const chai = require('chai');
const expect = chai.expect;
const Sociogram = require('../../../model/sociogram.js');
const Updater = require('../../../model/updater.js');

describe('Sociogram Updater Tests', function() {
	const mockData = require('./updater.mock.json');

	describe('updateSociogram', function() {
		it('If there is no data, it doesn\'t change de sociogram', function() {
			const emptySociogram = new Sociogram({});
			const updated = Updater.updateSociogram(emptySociogram, {});
			expect(updated).to.deep.equal(emptySociogram);
		});

		it('If there is metadata, it changes it', function() {
			const emptySociogram = new Sociogram({});
			const entryData = mockData.onlyMetaData.entryData;
			const expected = mockData.onlyMetaData.expected;
			const updated = Updater.updateSociogram(emptySociogram, entryData);
			expect(updated).to.deep.equal(expected);
		});
	});

	describe('updateMetaData', function() {
		it('Can fill an empty sociogram\'s metadata', function() {
			const emptySociogram = new Sociogram({});
			const entryData = mockData.onlyMetaData.entryData;
			const expected = mockData.onlyMetaData.expected;
			const updated = Updater.updateMetaData(emptySociogram, entryData.metadata);
			expect(updated).to.deep.equal(expected);
		});
	});
});
