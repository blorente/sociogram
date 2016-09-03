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
});
