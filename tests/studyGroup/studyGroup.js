"use strict";

const chai = require('chai');
const expect = chai.expect;
const StudyGroup = require('../../model/studyGroup.js');

describe('Study Group Tests', function() {
	describe('constructor', function() {
		it('An empty study group has 0 relevant variables', function() {
			const emptyStudyGroup = new StudyGroup({});
			expect(emptyStudyGroup.getVariableCount()).to.equal(0);
		});

		it('An empty study group has 0 individuals', function() {
			const emptyStudyGroup = new StudyGroup({});
			expect(emptyStudyGroup.getPopulationSize()).to.equal(0);
		});
	});

	describe('getPopulationSize', function() {
		it('Returns 0 if there were no individuals', function() {
			const emptyStudyGroup = new StudyGroup({});
			expect(emptyStudyGroup.getPopulationSize()).to.equal(0);
		});
	});

	describe('addIndividual', function() {
		it('Accepts a string as a parameter', function() {
			const emptyStudyGroup = new StudyGroup({});
			emptyStudyGroup.addIndividual("Jake");
			expect(emptyStudyGroup).to.be.ok;
		});

		it('Increases the population size by 1', function() {
			const oneIndividualStudyGroup = new StudyGroup({});
			const originalSize = oneIndividualStudyGroup.getPopulationSize();
			oneIndividualStudyGroup.addIndividual("Jake Weary");
			expect(oneIndividualStudyGroup.getPopulationSize()).to.equal(originalSize + 1);
		});
	});

	describe('getOrderedPopulation', function() {
		it('Returns an array', function() {
			const emptyStudyGroup = new StudyGroup({});
			expect(emptyStudyGroup.getOrderedPopulation()).to.be.an('array');
		});

		it('Every element of the list contains at least a name and id', function() {
			const onlyIndividuals = new StudyGroup({});
			const arbitraryNames = require("./studyGroup.mock.json").arbitraryNames;
			arbitraryNames.forEach(function(elem) {
				onlyIndividuals.addIndividual(elem);
			});
			onlyIndividuals.getOrderedPopulation().forEach(function (elem) {
				expect(elem).to.include.keys('name', 'id');
			});
		});

		it('The list is sorted by increasing id', function() {
			const onlyIndividuals = new StudyGroup({});
			const arbitraryNames = require("./studyGroup.mock.json").arbitraryNames;
			arbitraryNames.forEach(function(elem) {
				onlyIndividuals.addIndividual(elem);
			});
			let prev = {id: -1};
			onlyIndividuals.getOrderedPopulation().forEach(function (elem) {
				expect(elem.id).to.be.above(prev.id);
				prev = elem;
			});
		});
	});

	describe('getVariableCount', function() {
		it('Returns 0 if there were no variables', function() {
			const emptyStudyGroup = new StudyGroup({});
			expect(emptyStudyGroup.getVariableCount()).to.equal(0);
		});
	});

	describe('addVariable', function() {
	});
});
