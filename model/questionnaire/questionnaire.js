"use strict";

const Question = require('./question.js');

class Questionnaire {
	constructor({}) {
		this.questions = [];
	}

	getNumQuestions() {
		return this.questions.length;
	}

	addQuestion(title, answerCount) {
		this.questions.push(new Question(title, answerCount));
	}
}

module.exports = Questionnaire;
