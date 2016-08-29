"use strict";

class Question {
	constructor({title = "", numberOfChoices = 0}) {
		this.title = title;
		this.numberOfChoices = numberOfChoices;
	}

	getNumChoices() {
		return this.numberOfChoices;
	}

	getTitle() {
		return this.title;
	}
}

module.exports = Question;
