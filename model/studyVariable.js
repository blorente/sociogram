class StudyVariable {
	constructor({name = "", values = []}) {
		this.name = name;
		this.values = values.slice(0);
	}

	getName() {
		return this.name;
	}

	getPossibleValues() {
		return this.values;
	}

	getPossibleValueCount() {
		return this.values.length;
	}

	addPossibleValue(newValue) {
		this.values.push(newValue);
	}
}

module.exports = StudyVariable;
