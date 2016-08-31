"use strict";

const chai = require('chai');
const expect = chai.expect;
const Reporter = require('../../../model/reporter.js');
const Sociogram = require('../../../model/sociogram.js');

describe('Reporter Tests', function() {
	describe('reportSociogram', function() {
		const mocks = require('./reporter.mock.json').sociograms;

		it('Returns an empty object if an empty object was passed', function() {
			expect(Reporter.reportSociogram()).to.deep.equal([]);
		});

		it('Formats correctly an empty sociogram', function() {
			const headerOnly = new Sociogram(mocks.headerOnly.original);
			expect(Reporter.reportSociogram(headerOnly))
				.to.deep.equal(mocks.headerOnly.expected);
		});

		it('Formats a sociogram with a population', function() {
			const withPopulation = new Sociogram(mocks.withPopulation.original);
			expect(Reporter.reportSociogram(withPopulation))
				.to.deep.equal(mocks.withPopulation.expected);
		});

		it('Formats a sociogram with a questionnaire', function() {
			const withQuestions = new Sociogram(mocks.withQuestions.original);
			expect(Reporter.reportSociogram(withQuestions))
				.to.deep.equal(mocks.withQuestions.expected);
		});
	});
});
