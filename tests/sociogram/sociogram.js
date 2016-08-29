const chai = require('chai');
const expect = chai.expect;
const Sociogram = require('../../model/sociogram.js');

describe('Sociogram Tests', function() {
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

	it('Two sociograms are different if their names differ', function() {
		const oneName = "One";
		const otherName = "Other";
		const oneSociogram = new Sociogram({name: oneName});
		const otherSociogram = new Sociogram({name: otherName});
		expect(oneSociogram).to.not.equal(otherSociogram);
	});

	it('Two sociograms are different if their dates differ', function() {
		const oneDate = "2016-05-14";
		const otherDate = "2016-05-30";
		const oneSociogram = new Sociogram({date: oneDate});
		const otherSociogram = new Sociogram({date: otherDate});
		expect(oneSociogram).to.not.equal(otherSociogram);
	});

	it('Two sociograms are different if their groupCodes differ', function() {
		const oneGroupCode = "3ºA";
		const otherGroupCode = "3ºB";
		const oneSociogram = new Sociogram({groupCode: oneGroupCode});
		const otherSociogram = new Sociogram({groupCode: otherGroupCode});
		expect(oneSociogram).to.not.equal(otherSociogram);
	});

	it('Two sociograms are equal if their titles are the same', function() {
		const arbitraryName = "New Sociogram";
		const arbitraryDateString = "2016-05-21";
		const arbitraryGroupCode = "3ºA";
		const oneSociogram = new Sociogram({
			name: arbitraryName,
			date: arbitraryDateString,
			groupCode: arbitraryGroupCode
		});
		const otherSociogram = new Sociogram({
			name: arbitraryName,
			date: arbitraryDateString,
			groupCode: arbitraryGroupCode
		});
		expect(oneSociogram.equals(otherSociogram)).to.equal(true);
	});

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
		expect(arbitrarySociogram.toJSON()).to.deep.equal(expectedJSON);
	});

	it('A sociogram can be initialized from another sociogram\'s toJSON output', function() {
		const arbitraryName = "New Sociogram";
		const arbitraryDateString = "2016-05-21";
		const arbitraryGroupCode = "3ºA";
		const originalSociogram = new Sociogram({
			name: arbitraryName,
			date: arbitraryDateString,
			groupCode: arbitraryGroupCode
		});
		const createdSociogram = new Sociogram(originalSociogram.toJSON());
		expect(createdSociogram).to.deep.equal(originalSociogram);
	});

	it('A sociogram can be loaded from a .json file', function() {
		const testJSON = require('./00_simpleSociogram.json');
		const loadedSociogram = new Sociogram(testJSON);
		const expectedSociogram = new Sociogram({
			name: "testSociogram",
			date: "testDate",
			groupCode: "testGroupCode"
		});
		expect(loadedSociogram).to.deep.equal(expectedSociogram);
	});

});
