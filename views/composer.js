"use strict";

const Composer = {
	printData(target, data) {
		for (let attr in data) {
			const elem = data[attr];
			if (elem.type === 'table') {
				appendTable(target, elem.headers, elem.data);
			}
		}
	}

	appendTable(target, headers, data) {
		target += '<table class="table-striped">';
		target += '<thead><tr>';
		headers.forEach(function(elem) {
			target += `<th>${elem}</th>`;
		});
		target += '</thead></tr>';
		target += '<tbody>';
		data.forEach(function(row) {
			target += '<tr>';
			row.forEach(function(elem) {
				target += `<td>${elem}</td>`;
			});
			target += '</tr>';
		});
		target += '</tbody>';
		target += '</table>';
	}
}

module.exports = Composer;
