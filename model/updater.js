"use strict";

const Sociogram = require('./sociogram.js');
const Questionnaire = require('./questionnaire/questionnaire.js');
const Population = require('./population/population.js');
const PopulationBuilder = require('./population/builder.js');

const Updater = {
	updateSociogram(original, newData) {
		let updated = original;
		if (newData.metadata) {
			updated = Updater.updateMetaData(updated, newData.metadata);
		}
		if (newData.questionnaire) {
			updated = Updater.updateQuestionnaire(updated, newData.questionnaire);
		}
		if (newData.study) {
			updated = Updater.updateVariables(updated, newData.study);
		}
		return updated;
	},

	updateMetaData(original, newData) {
		let updated = original;
		for (let i = 0; i < newData.headers.length; i++) {
			updated[newData.headers[i]] = newData.values[0][i];
		}
		return updated;
	},

	updateQuestionnaire(original, newData) {
		let newQuestionnaire = new Questionnaire({});
		newData.values.forEach(function(question) {
			const name = question[0];
			const choices = parseInt(question[1]);
			newQuestionnaire.addQuestion(name, choices);
		});
		let updated = original;
		updated.updateQuestionnaire(newQuestionnaire);
		return updated;
	},

	updateVariables(original, newData) {
		let newPopulation = PopulationBuilder.buildFromJSON(original.population);
		let newVars = [];
		newData.values.forEach(function(elem) {
			const newName = elem[0];
			const newValues = elem.slice(1);
			newVars.push({name: newName, values: newValues});
		});
		newPopulation.variables = newVars;
		let updated = original;
		updated.population = newPopulation;
		return updated;
	}
}

module.exports = Updater;
