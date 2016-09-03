"use strict";

const chai = require('chai');
const expect = chai.expect;
const Composer = require('../../../views/composer.js');
const Forms = require('../../../views/forms.js');

describe('Forms Tests', function() {
	const mockData = require('./forms.mock.json');

	describe('extendVertical', function() {
		it('Copies the second to last row of a form table', function() {
			const original = mockData.singleField.original;
			const expected = mockData.singleField.expected;
			expect(Forms.extendVertical(original)).to.equal(expected);
		});
	});

	describe('cloneRow', function() {
		it('Copies a given row from the table below it', function() {
			const table = mockData.simpleTable.original.table;
			const row = mockData.simpleTable.original.row;
			const expected = mockData.simpleTable.expected;
			expect(Forms.cloneRow(table, row)).to.equal(expected);
		});

		it('Rows are 0-indexed', function() {
			const table = mockData.secondElem.original.table;
			const row = mockData.secondElem.original.row;
			const expected = mockData.secondElem.expected;
			expect(Forms.cloneRow(table, row)).to.equal(expected);
		});

		it('Doesn\'t change the original if the row is too great', function() {
			const table = mockData.overflow.original.table;
			const row = mockData.overflow.original.row;
			const expected = mockData.overflow.expected;
			expect(Forms.cloneRow(table, row)).to.equal(expected);
		});
	});
});
