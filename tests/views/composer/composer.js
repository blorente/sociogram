"use strict";

const chai = require('chai');
const expect = chai.expect;
const Composer = require('../../../views/composer.js');

describe('Composer tests', function() {
	const mockData = require('./composer.mock.json');

	describe('composeData', function() {
		it('Returns "" when passed an empty array', function() {
			const emptyArray = [];
			expect(Composer.composeData(emptyArray)).to.equal('');
		});

		it('Should not overwrite the input, only append', function() {
			const titleMock = mockData.titleMock;
			const result = mockData.veryLongText;
			result.concat(Composer.composeData(titleMock));
			expect(result).to.contain(mockData.veryLongText);
		});

		it('Accepts a title => {type: "title", content: "..."}', function() {
			const titleMock = mockData.titleMock;
			const result = Composer.composeData(titleMock);
			expect(result).to.contain(`<strong>${titleMock[0].content}</strong>`);
		});

		it('Accepts a table => {type: "table", headers: [...], data: [...]}', function() {
			const tableMock = mockData.verticalTableMock;
			const result = Composer.composeData(tableMock.original);
			expect(result).to.contain(tableMock.expected);
		});

		it('Accepts a horizontal table => {type: "table-horizontal", headers: [...], data: [...]}', function() {
			const tableMock = mockData.horizontalTableMock;
			const result = Composer.composeData(tableMock.original);
			expect(result).to.contain(tableMock.expected);
		});

		it('Inserts newLine regardless of type', function() {
			const invalidMock = mockData.invalidMock;
			const result = Composer.composeData(invalidMock.original);
			expect(result).to.equal(Composer.newLine());
		});
	});

	describe('composeTitle', function() {
		it('Should return the title in a <strong> tag', function() {
			const titleMock = mockData.titleMock;
			const result = Composer.composeTitle(titleMock[0].content);
			expect(result).to.contain(`<strong>${titleMock[0].content}</strong>`);
		});
	});

	describe('composeVerticalTable', function() {
		it('Should return a <table> with the headers on top', function() {
			const tableMock = mockData.verticalTableMock;
			const result = Composer.composeVerticalTable(tableMock.original[0].headers, tableMock.original[0].data);
			expect(result).to.contain(tableMock.expected);
		});
	});

	describe('composeHorizontalTable', function() {
		it('Should return a <table> with the headers on the left', function() {
			const tableMock = mockData.horizontalTableMock;
			const result = Composer.composeHorizontalTable(tableMock.original[0].headers, tableMock.original[0].data);
			expect(result).to.contain(tableMock.expected);
		});
	});

	describe('newLine', function() {
		it('Should return </br>', function() {
			expect(Composer.newLine()).to.equal('</br>');
		});
	});

	describe('createSociogramForm', function() {
		it('Should contain a save-sociogram <button>', function() {
			expect(Composer.createSociogramForm()).to.match(/.*<button.*id="save-sociogram".*>.*<\/button>/);
		});

		it('Should return a value wrapped in <form> tags', function() {
			expect(Composer.createSociogramForm()).to.match(/<form.*<\/form>/);
		});

		it('Should accept groups of input fields', function() {
			const template = mockData.templates.fullGroup.original;
			const expected = mockData.templates.fullGroup.expected;
			expect(Composer.createSociogramForm(template)).to.contain(expected);
		});
	});

	describe('createFormElement', function() {
		it('Accepts a group => {type: "group", title: \'...\', extend: \'none/vertical/horizontal\',  elems: []}', function() {
			const template = mockData.templates.group.original[0];
			const expected = mockData.templates.group.expected;
			expect(Composer.createFormElement(template)).to.contain(expected);
		});

		it('Accepts a non-extensible input => {type: "input", title: \'...\'}', function() {
			const template = mockData.templates.input.single.original[0];
			const expected = mockData.templates.input.single.expected;
			expect(Composer.createFormElement(template)).to.contain(expected);
		});

		it('Ignores nonvalid types', function() {
			expect(Composer.createFormElement({type: "bad"})).to.equal('');
		});
	});

	describe('createFormGroup', function() {
		it('Should return a group element', function() {
			const template = mockData.templates.group.original[0];
			const expected = mockData.templates.group.expected;
			expect(Composer.createFormGroup(template)).to.contain(expected);
		});

		it('Should add an extend button at the bottom for vertical extend groups', function() {
			const template = mockData.templates.extendvert.original[0];
			const expected = mockData.templates.extendvert.expected;
			expect(Composer.createFormGroup(template)).to.contain(expected);
		});
	});

	describe('createFormInput', function() {
		it('Should return a title and one or more input fields', function() {
			const template = mockData.templates.input.single.original[0];
			const expected = mockData.templates.input.single.expected;
			expect(Composer.createFormElement(template)).to.contain(expected);
		});
	});
});
