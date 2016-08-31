"use strict";

const chai = require('chai');
const expect = chai.expect;
const Builder = require('../../../../model/questionnaire/builder.js');
const Questionnaire = require('../../../../model/questionnaire/questionnaire.js');

describe('Questionnaire Builder Tests', function() {
	const mockQuestionnaires = require('./builder.mock.json');

	describe('buildFromJSON', function() {

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

	describe('createTemplate', function() {
		it('Returns a questionnaire with all fields empty', function() {
			const emptyTemplate = mockQuestionnaires.emptyTemplate;
			expect(Builder.createTemplate()).to.deep.equal(emptyTemplate);
		});
	});
});
