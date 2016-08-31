"use strict";

const chai = require('chai');
const expect = chai.expect;
const Individual = require('../../../../model/population/individual.js');

describe('Individual Tests', function() {
	describe('constructor', function() {
		it('Accepts empty objects', function() {
			const emptyIndividual = new Individual({});
			expect('everything').to.be.ok;
		});

		it('Assigns a default name of "" and a default id of -1', function() {
			const emptyIndividual = new Individual({});
			expect(emptyIndividual.getName()).to.equal("");
			expect(emptyIndividual.getID()).to.equal(-1);
		});

		it('Can parse a parameter object with name and id', function() {
			const arbitraryParams = require('./individual.mock.json');
			const constructedIndividual = new Individual(arbitraryParams);
			expect(constructedIndividual.getName()).to.not.equal("");
			expect(constructedIndividual.getID()).to.not.equal(-1);
			expect(constructedIndividual.getName()).to.equal(arbitraryParams.name);
			expect(constructedIndividual.getID()).to.equal(arbitraryParams.id);
		});
	});

	describe('getName', function() {
		it('Returns "" if no name was provided in the constructor', function() {
			const emptyIndividual = new Individual({});
			expect(emptyIndividual.getName()).to.equal("");
		});

		it('If the name was set in the constructor, it returns that', function() {
			const arbitraryParams = require('./individual.mock.json');
			const constructedIndividual = new Individual(arbitraryParams);
			expect(constructedIndividual.getName()).to.equal(arbitraryParams.name);
		});
	});

	describe('setID', function() {
		it('Changes the output of subsequent calls to getID', function() {
			const arbitraryParams = require('./individual.mock.json');
			const constructedIndividual = new Individual(arbitraryParams);
			constructedIndividual.setID(4);
			expect(constructedIndividual.getID()).to.equal(4);
		});

		it('Has no effect if a negative number is passed', function() {
			const arbitraryParams = require('./individual.mock.json');
			const constructedIndividual = new Individual(arbitraryParams);
			constructedIndividual.setID(-3);
			expect(constructedIndividual.getID()).to.equal(arbitraryParams.id);
		});
	});

	describe('getID', function() {
		it('Returns -1 if no name was provided in the constructor', function() {
			const emptyIndividual = new Individual({});
			expect(emptyIndividual.getID()).to.equal(-1);
		});

		it('Returns the last value set via constructor or setID()', function() {
			const arbitraryParams = require('./individual.mock.json');
			const constructedIndividual = new Individual(arbitraryParams);
			expect(constructedIndividual.getID()).to.equal(arbitraryParams.id);
			constructedIndividual.setID(arbitraryParams.id + 1);
			expect(constructedIndividual.getID()).to.equal(arbitraryParams.id + 1);
			constructedIndividual.setID(arbitraryParams.id - 2);
			expect(constructedIndividual.getID()).to.equal(arbitraryParams.id - 2);
		});
	});
});
