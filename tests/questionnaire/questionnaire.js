const chai = require('chai');
const expect = chai.expect;
const Questionnaire = require('../../model/questionnaire.js');

describe('Questionnaire Tests', function() {
	it('An empty questionnaire has 0 questions', function() {
		const emptyQuestionnaire = new Questionnaire({});
		expect(emptyQuestionnaire.getNumQuestions()).to.be.a('number');
		expect(emptyQuestionnaire.getNumQuestions()).to.equal(0);
	});
});
