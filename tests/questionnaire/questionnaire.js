"use strict";

const chai = require('chai');
const expect = chai.expect;
const Questionnaire = require('../../model/questionnaire.js');

describe('Questionnaire Tests', function() {
	describe('constructor', function() {
		it('An empty questionnaire has 0 questions', function() {
			const emptyQuestionnaire = new Questionnaire({});
			expect(emptyQuestionnaire.getNumQuestions()).to.be.a('number');
			expect(emptyQuestionnaire.getNumQuestions()).to.equal(0);
		});
	});

	describe('addQuestion', function() {
		const Question = require('../../model/questionnaireQuestion.js');

		it('Increases the result of getNumQuestions by one', function() {
			const emptyQuestionnaire = new Questionnaire({});
			let originalNumber = emptyQuestionnaire.getNumQuestions();
			emptyQuestionnaire.addQuestion(new Question({}));
			expect(emptyQuestionnaire.getNumQuestions()).to.equal(originalNumber + 1);
		});
	});
});
