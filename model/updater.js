"use strict";

const Sociogram = require('./sociogram.js');
const Questionnaire = require('./questionnaire/questionnaire.js');
const Population = require('./population/population.js');
const PopulationBuilder = require('./population/builder.js');
const Individual = require('./population/individual.js');

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
		if (newData.individuals) {
			updated = Updater.updateIndividuals(updated, newData.individuals);
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
	},

	updateIndividuals(original, newData) {
		let newPopulation = PopulationBuilder.buildFromJSON(original.population);
		let newIndividuals = [];
		let varnames = newData.headers.slice(2);
		newData.values.forEach(function(row, rowindex) {
			const name = row[0];
			let variables = [];
			varnames.forEach(function(varname, varindex) {
				const newVar = {name: varname, value: row[varindex + 1]};
				variables.push(newVar);
			});
			const id = rowindex;
			newIndividuals.push(new Individual({name, id, variables}));
		});
		newPopulation.individuals = newIndividuals;
		let updated = original;
		updated.population = newPopulation;
		return updated;
	}
}

module.exports = Updater;
