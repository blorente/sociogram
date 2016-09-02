"use strict";

const Reporter = {
	reportSociogram(sociogram) {
		const formatted = [];
		if (sociogram) {
			formatted.push({type: "title", content: sociogram.getTitle()});
			if (sociogram.hasPopulation()) {
				formatted.push({type: "title", content: "Population"});
				formatted.push({type: "title", content: "Variables"});
				const varnames = [];
				const varvalues = [];
				sociogram.population.variables.forEach(function(elem) {
					varnames.push(elem.name);
					varvalues.push(elem.values);
				})
				formatted.push({type: "table-horizontal", headers: varnames, data: varvalues});
				formatted.push({type: "title", content: "Individuals"});
				const inddata = [];
				sociogram.population.individuals.forEach(function(elem) {
					inddata.push([elem.name, elem.id]);
				});
				formatted.push({type: "table", headers: ["Name", "ID"], data: inddata});
			}
			if (sociogram.hasQuestionnaire()) {
				formatted.push({type: "title", content: "Questionnaire"});
				const questdata = [];
				sociogram.questionnaire.questions.forEach(function(elem) {
					questdata.push([elem.name, elem.choices]);
				});
				formatted.push({type: "table", headers: ["Question", "Choices"], data: questdata});
			}
		} else {
		}
		return formatted;
	},

	reportSociogramForm(template) {
		const formatted = [];
		const headerGroup = {type: 'group', title: 'Basic Information', extend: "none", elems: []};
		headerGroup.elems.push(Reporter.constructSingleField('Name'));
		headerGroup.elems.push(Reporter.constructSingleField('Group'));
		headerGroup.elems.push(Reporter.constructSingleField('Date'));
		formatted.push(headerGroup);
		const questionGroup = {type: 'group', title: "Questions", extend: "vertical", elems: []};
		questionGroup.elems.push(Reporter.constructSingleField('Question'));
		questionGroup.elems.push(Reporter.constructSingleField('No. Choices'));
		formatted.push(questionGroup);
		return formatted;
	},

	constructSingleField(title) {
		return {"type": "input", "title": title};
	}

}

module.exports = Reporter;
