"use strict";

const chai = require('chai');
const expect = chai.expect;
const Sociogram = require('../../../model/sociogram.js');

describe('Sociogram Tests', function() {

	describe('constructor', function() {
		it('An empty sociogram has a title', function() {
			const emptySociogram = new Sociogram({});
			expect(emptySociogram.getName()).to.be.a('string');
			expect(emptySociogram.getName()).to.equal("");
		});

		it('A Sociogram can be initialized with a name', function() {
			const arbitrarySociogramName = "New Sociogram";
			const sociogramWithATitle = new Sociogram({name: arbitrarySociogramName});
			expect(sociogramWithATitle.getName()).to.equal(arbitrarySociogramName);
		});

		it('A Sociogram can be initialized with a date string', function() {
			const arbitraryDateString = "2016-05-21";
			const sociogramWithADate = new Sociogram({date: arbitraryDateString});
			expect(sociogramWithADate.getDate()).to.be.a('string');
			expect(sociogramWithADate.getDate()).to.equal(arbitraryDateString);
		});

		it('A sociogram can be initialized with a group name string', function() {
			const arbitraryGroupCode = "3ºA";
			const sociogramWithAGroupCode = new Sociogram({groupCode: arbitraryGroupCode});
			expect(sociogramWithAGroupCode.getGroupCode()).to.be.a('string');
			expect(sociogramWithAGroupCode.getGroupCode()).to.equal(arbitraryGroupCode);
		});

		it('The order of the arguments does not affect the name, date or group', function() {
			const arbitraryName = "New Sociogram";
			const arbitraryDateString = "2016-05-21";
			const arbitraryGroupCode = "3ºA";
			const sociogramWithNameDateGroup = new Sociogram({
				name: arbitraryName,
				date: arbitraryDateString,
				groupCode: arbitraryGroupCode
			});
			expect(sociogramWithNameDateGroup.getName()).to.equal(arbitraryName);
			expect(sociogramWithNameDateGroup.getDate()).to.equal(arbitraryDateString);
			expect(sociogramWithNameDateGroup.getGroupCode()).to.equal(arbitraryGroupCode);

			const sociogramWithGroupDateName = new Sociogram({
				groupCode: arbitraryGroupCode,
				date: arbitraryDateString,
				name: arbitraryName
			});
			expect(sociogramWithGroupDateName.getName()).to.equal(arbitraryName);
			expect(sociogramWithGroupDateName.getDate()).to.equal(arbitraryDateString);
			expect(sociogramWithGroupDateName.getGroupCode()).to.equal(arbitraryGroupCode);
		});

		it('A sociogram can be loaded from a .json file with only header', function() {
			const testJSON = require('./sociogram.mock.json').headerJSON;
			const loadedSociogram = new Sociogram(testJSON);
			const expectedSociogram = new Sociogram({
				name: "testSociogram",
				date: "testDate",
				groupCode: "testGroupCode"
			});
			expect(loadedSociogram).to.deep.equal(expectedSociogram);
		});

		it('Accepts a parameter "population"', function() {
			const populationJSON = require('./sociogram.mock.json').populationJSON;
			const populatedSociogram = new Sociogram(populationJSON);
			expect(populatedSociogram.population.getVariableCount()).to.equal(populationJSON.template.population.variables.length);
			expect(populatedSociogram.population.getPopulationSize()).to.equal(populationJSON.template.population.individuals.length);
		});

		it('Accepts a parameter "questionnaire"', function() {
			const questionnaireJSON = require('./sociogram.mock.json').questionnaireJSON;
			const questionnaireSociogram = new Sociogram(questionnaireJSON);
			expect(questionnaireSociogram.questionnaire.getNumQuestions()).to.equal(questionnaireJSON.template.questionnaire.questions.length);
		});
	});

	describe('hasPopulation', function() {
		it('Returns true iff a population was passed in the constructor', function() {
			const emptySociogram = new Sociogram({});
			expect(emptySociogram.hasPopulation()).to.equal(false);
			const populationJSON = require('./sociogram.mock.json').populationJSON;
			const populatedSociogram = new Sociogram(populationJSON);
			expect(populatedSociogram.hasPopulation()).to.equal(true);
		});
	});

	describe('hasQuestionnaire', function() {
		it('Returns true iff a questionnaire was passed in the constructor', function() {
			const emptySociogram = new Sociogram({});
			expect(emptySociogram.hasQuestionnaire()).to.equal(false);
			const questionnaireJSON = require('./sociogram.mock.json').questionnaireJSON;
			const questionnaireSociogram = new Sociogram(questionnaireJSON);
			expect(questionnaireSociogram.hasQuestionnaire()).to.equal(true);
		});
	});

	describe('createTemplate', function() {
		it('An empty sociogram returns an empty template', function() {
			const emptyTemplate = require('./sociogram.mock.json').emptyTemplate;
			const emptySociogram = new Sociogram({});
			expect(emptySociogram.createTemplate()).to.deep.equal(emptyTemplate);
		});
	});

	describe('updateQuestionnaire', function() {
		it('Overwrites the sociogram with the given value', function() {
			const withQuestions = require('./sociogram.mock.json').questionnaireJSON;
			const sociogramWithQuestions = new Sociogram(withQuestions);
			expect(sociogramWithQuestions.questionnaire).to.exist;
			const newQuestions = require('./sociogram.mock.json').newQuestionnaire;
			sociogramWithQuestions.updateQuestionnaire(newQuestions);
			expect(sociogramWithQuestions.questionnaire).to.deep.equal(newQuestions);
		});
	});

	it('The sociogram can have a title in the format "<name>-<group>-<date>"', function() {
		const arbitraryName = "New Sociogram";
		const arbitraryDateString = "2016-05-21";
		const arbitraryGroupCode = "3ºA";
		const sociogramWithAFullTitle = new Sociogram({
			name: arbitraryName,
			date: arbitraryDateString,
			groupCode: arbitraryGroupCode
		});
		expect(sociogramWithAFullTitle.getTitle()).to.be.a('string');
		expect(sociogramWithAFullTitle.getTitle()).to.equal(`${arbitraryName}-${arbitraryGroupCode}-${arbitraryDateString}`);
	});

	describe('toJSON', function() {
		it('A sociogram can output it\'s name, date and group as a JSON', function() {
			const arbitraryName = "New Sociogram";
			const arbitraryDateString = "2016-05-21";
			const arbitraryGroupCode = "3ºA";
			const arbitrarySociogram = new Sociogram({
				name: arbitraryName,
				date: arbitraryDateString,
				groupCode: arbitraryGroupCode
			});

			const expectedJSON = {
				name: arbitraryName,
				date: arbitraryDateString,
				groupCode: arbitraryGroupCode
			}
			expect(arbitrarySociogram.toJSON()).to.deep.include(expectedJSON);
		});

		it('A sociogram outputs it\'s questionnaire as JSON', function() {
			const questions = require('./sociogram.mock.json').questionnaireJSON;
			const sociogram = new Sociogram(questions);
			expect(sociogram.toJSON()).to.deep.equal(questions);
		});
	});

});
