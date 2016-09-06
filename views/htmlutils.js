"use strict";

const htmlUtils = {
	makeFormsExtendable(callback) {
		document.querySelectorAll(`button`).forEach(function(elem) {
			if (elem.id.match(/extend-v-\w*/)) {
				const table = document.getElementById(elem.id.replace(/extend-v-/, ''));
				elem.addEventListener('click', function(event) {
					htmlUtils.extendTableVertical(table);
					if(callback) {
						callback(table);
					}
				});
			}
		});
	},

	extendTableVertical(table) {
		let newRow = table.insertRow(table.rows.length - 1);
		newRow.innerHTML = table.rows[table.rows.length - 3].innerHTML;
	}
}

module.exports = htmlUtils;
