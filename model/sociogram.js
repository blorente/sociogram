"use strict";

const PopulationBuilder = require('./population/builder.js');
const QuestionnaireBuilder = require('./questionnaire/builder.js');

class Sociogram {
	constructor({name = "", date = "", groupCode = "", template}) {
		this.name = name;
		this.date = date;
		this.groupCode = groupCode;
		if (template) {
			this.population = PopulationBuilder.buildFromJSON(template.population);
			this.questionnaire = QuestionnaireBuilder.buildFromJSON(template.questionnaire);
		}
	}

	getName() {
		return this.name;
	}

	getDate() {
		return this.date;
	}

	getGroupCode() {
		return this.groupCode;
	}

	getTitle() {
		return `${this.getName()}-${this.getGroupCode()}-${this.getDate()}`
	}

	updateQuestionnaire(newQuestionnaire) {
		this.questionnaire = newQuestionnaire;
	}

	toJSON() {
		let json = {
			name: this.name,
			date: this.date,
			groupCode: this.groupCode
		};
		json.template = {};
		if (this.questionnaire) {
			json.template.questionnaire = this.questionnaire.toJSON();
		}
		return json;
	}

	hasPopulation() {
		if (this.population) {
			return this.population.getPopulationSize() > 0;
		} else {
			return false;
		}
	}

	hasQuestionnaire() {
		if (this.questionnaire) {
			return this.questionnaire.getNumQuestions() > 0;
		} else {
			return false;
		}
	}

	createTemplate() {
		return {
			name: "",
			date: "",
			groupCode: "",
			template: {
				population: PopulationBuilder.createTemplate(),
				questionnaire: QuestionnaireBuilder.createTemplate()
			}
		}
	}
}

module.exports = Sociogram;
