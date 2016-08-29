"use strict";

class Questionnaire {
	constructor({}) {
		this.questions = [];
	}

	getNumQuestions() {
		return this.questions.length;
	}

	addQuestion(question) {
		this.questions.push(question);
	}
}

module.exports = Questionnaire;
