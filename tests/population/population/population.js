"use strict";

const chai = require('chai');
const expect = chai.expect;
const Population = require('../../../model/population/population.js');

describe('Population Tests', function() {
	describe('constructor', function() {
		it('An empty study group has 0 relevant variables', function() {
			const emptyPopulation = new Population({});
			expect(emptyPopulation.getVariableCount()).to.equal(0);
		});

		it('An empty study group has 0 individuals', function() {
			const emptyPopulation = new Population({});
			expect(emptyPopulation.getPopulationSize()).to.equal(0);
		});
	});

	describe('getPopulationSize', function() {
		it('Returns 0 if there were no individuals', function() {
			const emptyPopulation = new Population({});
			expect(emptyPopulation.getPopulationSize()).to.equal(0);
		});
	});

	describe('addIndividual', function() {
		it('Accepts a string as a parameter', function() {
			const emptyPopulation = new Population({});
			emptyPopulation.addIndividual("Jake");
			expect(emptyPopulation).to.be.ok;
		});

		it('Increases the population size by 1', function() {
			const oneIndividualPopulation = new Population({});
			const originalSize = oneIndividualPopulation.getPopulationSize();
			oneIndividualPopulation.addIndividual("Jake Weary");
			expect(oneIndividualPopulation.getPopulationSize()).to.equal(originalSize + 1);
		});
	});

	describe('getOrderedPopulation', function() {
		it('Returns an array', function() {
			const emptyPopulation = new Population({});
			expect(emptyPopulation.getOrderedPopulation()).to.be.an('array');
		});

		it('Every element of the list contains at least a name and id', function() {
			const onlyIndividuals = new Population({});
			const arbitraryNames = require("./population.mock.json").arbitraryNames;
			arbitraryNames.forEach(function(elem) {
				onlyIndividuals.addIndividual(elem);
			});
			onlyIndividuals.getOrderedPopulation().forEach(function (elem) {
				expect(elem).to.include.keys('name', 'id');
			});
		});

		it('The list is sorted by increasing id', function() {
			const onlyIndividuals = new Population({});
			const arbitraryNames = require("./population.mock.json").arbitraryNames;
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
		const arbitraryVariable = require('./population.mock.json').arbitraryVariable;

		it('Returns 0 if there were no variables', function() {
			const emptyPopulation = new Population({});
			expect(emptyPopulation.getVariableCount()).to.equal(0);
		});

		it('Returns the number of times addVariable was called', function() {
			const filledPopulation = new Population({});
			filledPopulation.addVariable(arbitraryVariable.name, arbitraryVariable.values);
			expect(filledPopulation.getVariableCount()).to.equal(0);
		});
	});

	describe('addVariable', function() {
		const arbitraryVariable = require('./population.mock.json').arbitraryVariable;

		it('Accepts a name and a possible value array', function() {
			const oneVarPopulation = new Population({});
			oneVarPopulation.addVariable(arbitraryVariable.name, arbitraryVariable.values);
			expect(oneVarPopulation).to.be.ok;
		});
	});

	describe('getVariableList', function() {
		const arbitraryVariable = require('./population.mock.json').arbitraryVariable;

		it('Returns an array', function() {
			const emptyPopulation = new Population({});
			expect(emptyPopulation.getVariableList()).is.an('array');
		});

		it('Every element of the list has a name and an array of values', function() {
			const filledPopulation = new Population({});
			filledPopulation.addVariable(arbitraryVariable.name, arbitraryVariable.values);
			filledPopulation.getVariableList().forEach(function(element) {
				expect(element).to.include.keys('name', 'values');
				expect(element.values).to.be.an('array');
			});
		});
	});
});
