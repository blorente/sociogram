"use strict";

const chai = require('chai');
const expect = chai.expect;
const Builder = require('../../../model/questionnaire/builder.js');
const Questionnaire = require('../../../model/questionnaire/questionnaire.js');

describe('Questionnaire Builder Tests', function() {
	describe('buildFromJSON', function() {
		const mockQuestionnaires = require('./builder.mock.json');

		it('Returns an empty questionnaire with an empty object', function() {
			const emptyQuestionnaire = Builder.buildFromJSON({});
			expect(emptyQuestionnaire.getNumQuestions()).to.equal(0);
		});

		it('Accepts a list of questions', function() {
			expect(mockQuestionnaires.twoQuestions.questions).to.be.an('array');
			const fullQuestionnaire = Builder.buildFromJSON(mockQuestionnaires.twoQuestions);
			expect(fullQuestionnaire.getNumQuestions()).to.equal(2);
		});
	});
});
