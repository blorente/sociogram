"use strict";

const Composer = {
	composeData(data) {
		let result = '';
		data.forEach(function(elem) {
			if (elem.type === 'title') {
				result += Composer.composeTitle(elem.content);
			} else if (elem.type === 'table') {
				result += Composer.composeTable(elem.headers, elem.data);
			}
			result += Composer.newLine();
		});
		return result;
	},

	composeTitle(title) {
		return `<strong>${title}</strong>`;
	},

	composeTable(headers, data) {
		let table = '';
		table += '<table class="table-striped">';
		table += '<thead><tr>';
		headers.forEach(function(elem) {
			table += `<th>${elem}</th>`;
		});
		table += '</tr></thead>';
		table += '<tbody>';
		data.forEach(function(row) {
			table += '<tr>';
			row.forEach(function(elem) {
				table += `<td>${elem}</td>`;
			});
			table += '</tr>';
		});
		table += '</tbody>';
		table += '</table>';

		return table;
	},

	newLine() {
		return '</br>';
	}
}

module.exports = Composer;
