"use strict";

class Individual {
	constructor({name = "", id = -1, variables = []}) {
		this.name = name;
		this.id = id;
		this.variables = variables;
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
