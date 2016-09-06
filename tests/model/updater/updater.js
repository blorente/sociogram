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

		it('If there is a questionnaire, it changes it', function() {
			const emptySociogram = new Sociogram({});
			const entryData = mockData.questions.entryData;
			const expected = mockData.questions.expected;
			const updated = Updater.updateSociogram(emptySociogram, entryData);
			expect(updated).to.deep.equal(expected);
		});

		it('If there are variables, it changes them', function() {
			const emptySociogram = new Sociogram({});
			const entryData = mockData.variables.entryData;
			const expected = mockData.variables.expected;
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

	describe('updateQuestionnaire', function() {
		it('Can fill an empty sociogram\'s questionnaire template', function() {
			const emptySociogram = new Sociogram({});
			const entryData = mockData.questions.entryData;
			const expected = mockData.questions.expected;
			const updated = Updater.updateQuestionnaire(emptySociogram, entryData.questionnaire);
			expect(updated).to.deep.equal(expected);
		});
	});

	describe('updateVariables', function() {
		it('Can fill an empty sociogram\'s variable list', function() {
			const emptySociogram = new Sociogram({});
			const entryData = mockData.variables.entryData;
			const expected = mockData.variables.expected;
			const updated = Updater.updateVariables(emptySociogram, entryData.study);
			expect(updated).to.deep.equal(expected);
		});
	});
});
