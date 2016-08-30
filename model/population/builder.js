"use strict";

const Population = require('./population.js');

let Builder = {
	buildFromJSON(template) {
		let population = new Population({});
		if (template) {
			if (template.variables) {
				template.variables.forEach(function(elem) {
					population.addVariable(elem.name, elem.values);
				});
			}
			if (template.individuals) {
				template.individuals.forEach(function(elem) {
					population.addIndividual(elem.name);
				});
			}
		}
		return population;
	}
}

module.exports = Builder;
