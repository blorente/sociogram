"use strict";

class Individual {
	constructor({name = "", id = -1, variables = []}) {
		this.name = name;
		this.id = id;
		this.variables = {};
		for (let i = 0; i < variables.length; i++) {
			let variable = variables[i];
			this.variables[variable.name] = variable.value;
		}
	}

	getName() {
		return this.name;
	}

	getID() {
		return this.id;
	}

	setID(newID) {
		if (newID >= 0) {
			this.id = newID;
		}
	}
}

module.exports = Individual;
