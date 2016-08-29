"use strict";

class Sociogram {
	constructor({name = "", date = "", groupCode = ""}) {
		this.name = name;
		this.date = date;
		this.groupCode = groupCode;
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
