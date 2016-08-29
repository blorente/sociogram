"use strict";

const chai = require('chai');
const expect = chai.expect;
const StudyVariable = require('../../model/studyVariable.js');

describe('Study Variable Tests', function() {
	it('An empty study variable has "" as a name', function() {
		const emptyVariable = new StudyVariable({});
		expect(emptyVariable.getName()).to.be.a('string');
		expect(emptyVariable.getName()).to.equal("");
	});

	it('An empty study variable has 0 possible options', function() {
		const emptyVariable = new StudyVariable({});
		expect(emptyVariable.getPossibleValueCount()).to.be.a('number');
		expect(emptyVariable.getPossibleValueCount()).to.equal(0);
	});

	it('A variable accepts a name in the constructor', function() {
		const namedVariableParams = require('./00_onlyNamedVariable.json');
		const namedVariable = new StudyVariable(namedVariableParams);
		expect(namedVariable.getName()).to.equal(namedVariableParams.name);
	});

	it('Possible values can be added in the constructor', function() {
		const twoOptionParams = require('./01_twoOptionParams.json');
		const twoOptionVariable = new StudyVariable(twoOptionParams);
		expect(twoOptionVariable.getName()).to.equal(twoOptionParams.name);
		expect(twoOptionVariable.getPossibleValueCount()).to.equal(twoOptionParams.values.length);
		expect(twoOptionVariable.getPossibleValues()).to.deep.equal(twoOptionParams.values);
	});

	it('Possible values can be added after construction', function() {
		const twoOptionParams = require('./01_twoOptionParams.json');
		const moreOptionVariable = new StudyVariable(twoOptionParams);
		expect(moreOptionVariable.getName()).to.equal(twoOptionParams.name);
		expect(moreOptionVariable.getPossibleValueCount()).to.equal(twoOptionParams.values.length);
		expect(moreOptionVariable.getPossibleValues()).to.deep.equal(twoOptionParams.values);
		moreOptionVariable.addPossibleValue('U');
		expect(moreOptionVariable.getPossibleValueCount()).to.equal(3);
		expect(moreOptionVariable.getPossibleValues()).to.include(twoOptionParams.values[0]);
		expect(moreOptionVariable.getPossibleValues()).to.include(twoOptionParams.values[1]);
		expect(moreOptionVariable.getPossibleValues()).to.include('U');
	});
});
