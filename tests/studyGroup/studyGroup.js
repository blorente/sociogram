const chai = require('chai');
const expect = chai.expect;
const StudyGroup = require('../../model/studyGroup.js');

describe('Study Group Tests', function() {
	it('An empty estudy group has 0 participants', function() {
		const emptyStudyGroup = new StudyGroup({});
		expect(emptyStudyGroup.getNumParticipants()).to.be.a('number');
		expect(emptyStudyGroup.getNumParticipants()).to.equal(0);
	});

	it('The relevant variables of a study group are an array', function() {
		const emptyStudyGroup = new StudyGroup({});
		expect(emptyStudyGroup.getRelevantVariables()).to.be.an('array');
	});

	it('An empty study group has 0 relevant variables', function() {
		const emptyStudyGroup = new StudyGroup({});
		expect(emptyStudyGroup.getRelevantVariables().length).to.equal(0);
	});
});
