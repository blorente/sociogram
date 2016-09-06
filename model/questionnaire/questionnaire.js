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

	toJSON() {
		let json = {};
		json.questions = [];
		this.questions.forEach(function(elem) {
			json.questions.push(elem);
		});
		return json;
	}
}

module.exports = Questionnaire;
