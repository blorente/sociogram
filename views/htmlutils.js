"use strict";

const htmlUtils = {
	makeFormsExtendable() {
		document.querySelectorAll(`button`).forEach(function(elem) {
			if (elem.id.match(/extend-v-\w*/)) {
				const table = document.getElementById(elem.id.replace(/extend-v-/, ''));
				elem.addEventListener('click', function(event) {
					htmlUtils.extendTableVertical(table);
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
