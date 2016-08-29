"use strict";

const QuestionnaireQuestion = require('./questionnaireQuestion.js');

class Questionnaire {
	constructor({}) {
		this.questions = [];
	}

	getNumQuestions() {
		return this.questions.length;
	}

	addQuestion(title, answerCount) {
		this.questions.push(new QuestionnaireQuestion(title, answerCount));
	}
}

module.exports = Questionnaire;
