"use strict";

const Collector = {
	collectFormData(form) {
		let dataBundle = {};
		const formElements = form.children;
		for (let i = 0; i < formElements.length; i++) {
			let node = formElements[i];
			let groupData = Collector.collectGroupData(node.children);
			dataBundle[node.id] = groupData;
		}
		return dataBundle;
	},

	collectGroupData(elements) {
		let groupData = {};
		for (let i = 0; i < elements.length; i++) {
			const elem = elements[i];
			if (elem.tagName === 'TABLE') {
				groupData.headers = Collector.getTableHeaders(elem.rows[0]);
				groupData.values = Collector.getTableValues(elem.rows);
			}
		}
		return groupData;
	},

	getTableHeaders(headerRow) {
		let headers = [];
		for (let i = 0; i < headerRow.cells.length; i++) {
			const cell = headerRow.cells[i];
			headers.push(cell.id);
		}
		return headers;
	},

	getTableValues(allRows) {
		// Start with 1, skip header row
		let tableValues = [];
		for (let i = 1; i < allRows.length; i++) {
			const row = allRows[i];
			let rowData = [];
			for (let j = 0; j < row.cells.length; j++) {
				const cell = row.cells[j];
				if (cell.firstChild.tagName === 'INPUT') {
					rowData.push(cell.firstChild.value);
				} else if (cell.firstChild.tagName === 'SELECT') {
					let select = cell.firstChild;
					const option = select.options[select.selectedIndex];
					rowData.push(option.text);
				}
			}
			tableValues.push(rowData);
		}
		return tableValues;
	}
}

module.exports = Collector;
