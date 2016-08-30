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

	equals(other) {
		return this.getTitle() === other.getTitle();
	}

	toJSON() {
		return {
			name: this.name,
			date: this.date,
			groupCode: this.groupCode
		}
	}
}

module.exports = Sociogram;
