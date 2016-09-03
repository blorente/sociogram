"use strict";

const Composer = {
	composeData(data) {
		let result = '';
		data.forEach(function(elem) {
			if (elem.type === 'title') {
				result += Composer.composeTitle(elem.content);
			} else if (elem.type === 'table') {
				result += Composer.composeVerticalTable(elem.headers, elem.data);
			} else if (elem.type === 'table-horizontal') {
				result += Composer.composeHorizontalTable(elem.headers, elem.data);
			}
			result += Composer.newLine();
		});
		return result;
	},

	composeTitle(title) {
		return `<strong>${title}</strong>`;
	},

	composeVerticalTable(headers, data) {
		let table = '';
		table += '<table class="table-striped">';
		table += '<thead><tr>';
		headers.forEach(function(elem) {
			table += `<th><strong>${elem}</strong></th>`;
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

	composeHorizontalTable(headers, data) {
		let table = '';
		table += '<table class="table-striped"><tbody>';
		headers.forEach(function(elem, index) {
			table += '<tr>';
			table += `<th><strong>${elem}</strong></th>`;
			data[index].forEach(function(datum) {
				table += `<td>${datum}</td>`;
			});
			table += '</tr>';
		});
		table += '</tbody></table>';

		return table;
	},

	newLine() {
		return '</br>';
	}
}

module.exports = Composer;
