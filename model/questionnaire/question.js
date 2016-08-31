"use strict";

class Question {
	constructor({name = "", choices = 0}) {
		this.name = name;
		this.choices = choices;
	}

	getNumChoices() {
		return this.choices;
	}

	getTitle() {
		return this.name;
	}
}

module.exports = Question;
