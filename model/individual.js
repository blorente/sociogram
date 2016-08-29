"use strict";

class Individual {
	constructor({name = "", id = -1}) {
		this.name = name;
		this.id = id;
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
