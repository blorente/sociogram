"use strict";


const chai = require('chai');
const expect = chai.expect;
const Builder = require('../../../../model/population/builder.js');
const Population = require('../../../../model/population/population.js');

describe('Population Builder Tests', function() {
	const mockPopulations = require('./builder.mock.json');

	describe('buildFromJSON', function() {
		it('Returns an empty population when passed an empty object', function() {
			const emptyPopulation = Builder.buildFromJSON({});
			expect(emptyPopulation.getPopulationSize()).to.equal(0);
			expect(emptyPopulation.getVariableCount()).to.equal(0);
		});

		it('Accepts an object with an attribute "variables", as an array', function() {
			const onlyVars = Builder.buildFromJSON(mockPopulations.onlyVars);
			expect(onlyVars.getVariableList().length).to.be.at.least(1);
			onlyVars.getVariableList().forEach(function(elem) {
				expect(mockPopulations.onlyVars.variables).to.deep.contain(elem);
			});
		});

		it('Accepts an object with an attribute "individuals" as an array', function() {
			const onlyIndividuals = Builder.buildFromJSON(mockPopulations.onlyIndividuals);
			expect(onlyIndividuals.getOrderedPopulation().length).to.be.at.least(1);
			onlyIndividuals.getOrderedPopulation().forEach(function(elem) {
				expect(mockPopulations.onlyIndividuals.individuals).to.deep.contain(elem);
			});
		});

		it('Accepts an object with both of the above', function() {
			const fullPopulation = Builder.buildFromJSON(mockPopulations.fullPopulation);
			expect(fullPopulation.getVariableList().length).to.be.at.least(1);
			fullPopulation.getVariableList().forEach(function(elem) {
				expect(mockPopulations.fullPopulation.variables).to.deep.contain(elem);
			});
			expect(fullPopulation.getOrderedPopulation().length).to.be.at.least(1);
			fullPopulation.getOrderedPopulation().forEach(function(elem) {
				expect(mockPopulations.fullPopulation.individuals).to.deep.contain(elem);
			});
		});
	});

	describe('createTemplate', function() {
		it('Returns a population with all the fields empty', function() {
			const emptyTemplate = mockPopulations.emptyTemplate;
			expect(Builder.createTemplate()).to.deep.equal(emptyTemplate);
		});
	});
});
