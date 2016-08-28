let chai = require('chai');
let expect = chai.expect;
let Sociogram = require('../../model/sociogram.js')

describe('Sociogram Tests', function() {
	it('An empty sociogram has a title', function() {
		let emptySociogram = new Sociogram({});
		expect(emptySociogram.getName()).to.be.a('string');
		expect(emptySociogram.getName()).to.equal("");
	});

	it('A Sociogram can be initialized with a name', function() {
		let arbitrarySociogramName = "New Sociogram";
		let sociogramWithATitle = new Sociogram({name: arbitrarySociogramName});
		expect(sociogramWithATitle.getName()).to.equal(arbitrarySociogramName);
	});

	it('A Sociogram can be initialized with a date string', function() {
		let arbitraryDateString = "2016-05-21";
		let sociogramWithADate = new Sociogram({date: arbitraryDateString});
		expect(sociogramWithADate.getDate()).to.be.a('string');
		expect(sociogramWithADate.getDate()).to.equal(arbitraryDateString);
	});

	it('A sociogram can be initialized with a group name string', function() {
		let arbitraryGroupCode = "3ºA";
		let sociogramWithAGroupCode = new Sociogram({groupCode: arbitraryGroupCode});
		expect(sociogramWithAGroupCode.getGroupCode()).to.be.a('string');
		expect(sociogramWithAGroupCode.getGroupCode()).to.equal(arbitraryGroupCode);
	});

	it('The order of the arguments does not affect the name, date or group', function() {
		let arbitraryName = "New Sociogram";
		let arbitraryDateString = "2016-05-21";
		let arbitraryGroupCode = "3ºA";
		let sociogramWithNameDateGroup = new Sociogram({
			name: arbitraryName,
			date: arbitraryDateString,
			groupCode: arbitraryGroupCode
		});
		expect(sociogramWithNameDateGroup.getName()).to.equal(arbitraryName);
		expect(sociogramWithNameDateGroup.getDate()).to.equal(arbitraryDateString);
		expect(sociogramWithNameDateGroup.getGroupCode()).to.equal(arbitraryGroupCode);

		let sociogramWithGroupDateName = new Sociogram({
			groupCode: arbitraryGroupCode,
			date: arbitraryDateString,
			name: arbitraryName
		});
		expect(sociogramWithGroupDateName.getName()).to.equal(arbitraryName);
		expect(sociogramWithGroupDateName.getDate()).to.equal(arbitraryDateString);
		expect(sociogramWithGroupDateName.getGroupCode()).to.equal(arbitraryGroupCode);
	});

	it('The sociogram can have a title in the format "<name>-<group>-<date>"', function() {
		let arbitraryName = "New Sociogram";
		let arbitraryDateString = "2016-05-21";
		let arbitraryGroupCode = "3ºA";
		let sociogramWithAFullTitle = new Sociogram({
			name: arbitraryName,
			date: arbitraryDateString,
			groupCode: arbitraryGroupCode
		});
		expect(sociogramWithAFullTitle.getTitle()).to.be.a('string');
		expect(sociogramWithAFullTitle.getTitle()).to.equal(`${arbitraryName}-${arbitraryGroupCode}-${arbitraryDateString}`);
	});

	it('Two sociograms are different if their names differ', function() {
		let oneName = "One";
		let otherName = "Other";
		let oneSociogram = new Sociogram({name: oneName});
		let otherSociogram = new Sociogram({name: otherName});
		expect(oneSociogram).to.not.equal(otherSociogram);
	});

	it('Two sociograms are different if their dates differ', function() {
		let oneDate = "2016-05-14";
		let otherDate = "2016-05-30";
		let oneSociogram = new Sociogram({date: oneDate});
		let otherSociogram = new Sociogram({date: otherDate});
		expect(oneSociogram).to.not.equal(otherSociogram);
	});

	it('Two sociograms are different if their groupCodes differ', function() {
		let oneGroupCode = "3ºA";
		let otherGroupCode = "3ºB";
		let oneSociogram = new Sociogram({groupCode: oneGroupCode});
		let otherSociogram = new Sociogram({groupCode: otherGroupCode});
		expect(oneSociogram).to.not.equal(otherSociogram);
	});

	it('Two sociograms are equal if their titles are the same', function() {
		let arbitraryName = "New Sociogram";
		let arbitraryDateString = "2016-05-21";
		let arbitraryGroupCode = "3ºA";
		let oneSociogram = new Sociogram({
			name: arbitraryName,
			date: arbitraryDateString,
			groupCode: arbitraryGroupCode
		});
		let otherSociogram = new Sociogram({
			name: arbitraryName,
			date: arbitraryDateString,
			groupCode: arbitraryGroupCode
		});
		expect(oneSociogram.equals(otherSociogram)).to.equal(true);
	});

	it('A sociogram can output it\'s name, date and group as a JSON', function() {
		let arbitraryName = "New Sociogram";
		let arbitraryDateString = "2016-05-21";
		let arbitraryGroupCode = "3ºA";
		let arbitrarySociogram = new Sociogram({
			name: arbitraryName,
			date: arbitraryDateString,
			groupCode: arbitraryGroupCode
		});

		let expectedJSON = {
			name: arbitraryName,
			date: arbitraryDateString,
			groupCode: arbitraryGroupCode
		}
		expect(arbitrarySociogram.toJSON()).to.deep.equal(expectedJSON);
	});

	it('A sociogram can be initialized from another sociogram\'s toJSON output', function() {
		let arbitraryName = "New Sociogram";
		let arbitraryDateString = "2016-05-21";
		let arbitraryGroupCode = "3ºA";
		let originalSociogram = new Sociogram({
			name: arbitraryName,
			date: arbitraryDateString,
			groupCode: arbitraryGroupCode
		});
		let createdSociogram = new Sociogram(originalSociogram.toJSON());
		expect(createdSociogram).to.deep.equal(originalSociogram);
	});
});
