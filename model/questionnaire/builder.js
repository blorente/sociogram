"use strict";

const Questionnaire = require('./questionnaire.js');

let Builder = {
	buildFromJSON(json) {
		if (json.questions) {
			const result = new Questionnaire({});
			json.questions.forEach(function(elem) {
				result.addQuestion(elem.name, elem.numChoices);
			});
			return result;
		} else {
			return new Questionnaire({});
		}
	}
}

module.exports = Builder;
