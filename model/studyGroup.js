"use strict";

const Individual = require('./individual.js');

class StudyGroup {
	constructor() {
		this.individuals = [];
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
}

module.exports = StudyGroup;
