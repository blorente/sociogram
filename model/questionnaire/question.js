"use strict";

class Question {
	constructor({title = "", choices = 0}) {
		this.title = title;
		this.choices = choices;
	}

	getNumChoices() {
		return this.choices;
	}

	getTitle() {
		return this.title;
	}
}

module.exports = Question;
