"use strict";

const Question = require('./question.js');

class Questionnaire {
	constructor({}) {
		this.questions = [];
	}

	getNumQuestions() {
		return this.questions.length;
	}

	addQuestion(name, choices) {
		this.questions.push(new Question({name, choices}));
	}
}

module.exports = Questionnaire;
