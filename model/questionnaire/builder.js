"use strict";

const Questionnaire = require('./questionnaire.js');

let Builder = {
	buildFromJSON(template) {
		if (template && template.questions) {
			const result = new Questionnaire({});
			template.questions.forEach(function(elem) {
				result.addQuestion(elem.name, elem.choices);
			});
			return result;
		} else {
			return new Questionnaire({});
		}
	}
}

module.exports = Builder;
