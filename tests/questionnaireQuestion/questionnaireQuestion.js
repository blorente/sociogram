"use strict";

const chai = require('chai');
const expect = chai.expect;
const QuestionnaireQuestion = require('../../model/questionnaireQuestion.js');

describe('Questionnaire Question Test', function() {
	it('An empty question has 0 choices', function() {
		const emptyQuestion = new QuestionnaireQuestion({});
		expect(emptyQuestion.getNumChoices()).to.be.a('number');
		expect(emptyQuestion.getNumChoices()).to.equal(0);
	});

	it('An empty question has "" as a title', function() {
		const emptyQuestion = new QuestionnaireQuestion({});
		expect(emptyQuestion.getTitle()).to.be.a('string');
		expect(emptyQuestion.getTitle()).to.equal("");
	});

	it('A question accepts a number of choices and a title in the constructor', function() {
		const arbitraryQuestionParams = require("./00_arbitraryQuestion.json");
		const arbitraryQuestion = new QuestionnaireQuestion(arbitraryQuestionParams);
		expect(arbitraryQuestion.getTitle()).to.be.a('string');
		expect(arbitraryQuestion.getTitle()).to.equal(arbitraryQuestionParams.title);
		expect(arbitraryQuestion.getNumChoices()).to.be.a('number');
		expect(arbitraryQuestion.getNumChoices()).to.equal(arbitraryQuestionParams.numberOfChoices);
	});
});
