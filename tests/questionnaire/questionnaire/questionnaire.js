"use strict";

const chai = require('chai');
const expect = chai.expect;
const Questionnaire = require('../../../model/questionnaire/questionnaire.js');

describe('Questionnaire Tests', function() {
	describe('constructor', function() {
		it('An empty questionnaire has 0 questions', function() {
			const emptyQuestionnaire = new Questionnaire({});
			expect(emptyQuestionnaire.getNumQuestions()).to.be.a('number');
			expect(emptyQuestionnaire.getNumQuestions()).to.equal(0);
		});
	});

	describe('getNumQuestions', function() {
		const questionNames = require('./questionnaire.mock.json').questionNames;

		it('Returns the number of times addQuestion has been called', function() {
			const filledQuestionnaire = new Questionnaire({});
			questionNames.forEach(function(name, index) {
				expect(filledQuestionnaire.getNumQuestions()).to.equal(index);
				filledQuestionnaire.addQuestion(name);
			});
		});
	});

	describe('addQuestion', function() {
		const questionNames = require('./questionnaire.mock.json').questionNames;

		it('Increases the result of getNumQuestions by one', function() {
			const emptyQuestionnaire = new Questionnaire({});
			let originalNumber = emptyQuestionnaire.getNumQuestions();
			emptyQuestionnaire.addQuestion(questionNames[0]);
			expect(emptyQuestionnaire.getNumQuestions()).to.equal(originalNumber + 1);
		});

		it('Accepts a name and optionally the number of questions', function() {
			const twoQuestionQuestionnaire = new Questionnaire({});
			twoQuestionQuestionnaire.addQuestion(questionNames[0]);
			expect(twoQuestionQuestionnaire.getNumQuestions()).to.equal(1);
			twoQuestionQuestionnaire.addQuestion(questionNames[1], 3);
			expect(twoQuestionQuestionnaire.getNumQuestions()).to.equal(2);
		});
	});
});
