"use strict";

const chai = require('chai');
const expect = chai.expect;
const Reporter = require('../../../model/reporter.js');
const Sociogram = require('../../../model/sociogram.js');

describe('Reporter Tests', function() {
	const sociograms = require('./reporter.mock.json').sociograms;
	const forms = require('./reporter.mock.json').forms;

	describe('reportSociogram', function() {

		it('Returns an empty object if an empty object was passed', function() {
			expect(Reporter.reportSociogram()).to.deep.equal([]);
		});

		it('Formats correctly an empty sociogram', function() {
			const headerOnly = new Sociogram(sociograms.headerOnly.original);
			expect(Reporter.reportSociogram(headerOnly))
				.to.deep.equal(sociograms.headerOnly.expected);
		});

		it('Formats a sociogram with a population', function() {
			const withPopulation = new Sociogram(sociograms.withPopulation.original);
			expect(Reporter.reportSociogram(withPopulation))
				.to.deep.equal(sociograms.withPopulation.expected);
		});

		it('Formats a sociogram with a questionnaire', function() {
			const withQuestions = new Sociogram(sociograms.withQuestions.original);
			expect(Reporter.reportSociogram(withQuestions))
				.to.deep.equal(sociograms.withQuestions.expected);
		});
	});

	describe('reportSociogramForm', function() {
		it('Sould convert the sociogram\'s header', function() {
			const template = new Sociogram(sociograms.headerOnly.original).createTemplate();
			const report = Reporter.reportSociogramForm(template);
			forms.headerOnly.forEach(function(elem) {
				expect(report).to.deep.contain(elem);
			});
		});

		it('Should have a field for questions', function() {
			const template = new Sociogram(sociograms.withQuestions.original).createTemplate();
			const report = Reporter.reportSociogramForm(template);
			forms.withQuestions.forEach(function(elem) {
				expect(report).to.deep.contain(elem);
			});
		});
	});

	describe('constructSingleField', function() {
		it('Should convert a name into a single field', function() {
			const expected = forms.singleField;
			const field = Reporter.constructSingleField(expected.title);
			expect(field).to.deep.equal(expected);
		});
	});
});
