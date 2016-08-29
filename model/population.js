"use strict";

const Individual = require('./individual.js');
const StudyVariable = require('./studyVariable.js');

class Population {
	constructor() {
		this.individuals = [];
		this.variables = [];
	}

	getPopulationSize() {
		return this.individuals.length;
	}

	addIndividual(newIndividualName) {
		this.individuals.push(new Individual({
			name: newIndividualName,
			id: this.individuals.length
		}));
	}

	getOrderedPopulation() {
		return this.individuals;
	}

	getVariableCount() {
		return 0;
	}

	addVariable(name, values) {
		this.variables.push(new StudyVariable(name, values));
	}

	getVariableList() {
		return this.variables;
	}
}

module.exports = Population;
