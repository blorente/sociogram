"use strict";

const Forms = {
	extendVertical(table) {
		return this.cloneRow(table, 1);
	},

	cloneRow(table, targetRow) {
		let newTable = table;
		let curRow = -1;
		let startIndex = 0;
		while (startIndex != -1 && curRow != targetRow) {
			const substr = table.substring(startIndex);
			const delta = substr.search('<tr>') + 1;
			startIndex += delta;
			curRow++;
			if (delta == 0) {
				startIndex = -1;
			}
		}
		startIndex--;
		if (startIndex >= 0) {
			const substr = table.substring(startIndex);
			const endIndex = substr.search('</tr>') + 5 + startIndex;
			let rowToCopy = table.slice(startIndex, endIndex);
			newTable = table.substring(0, endIndex);
			newTable += rowToCopy;
			newTable += table.substring(endIndex);
		}
		return newTable;
	}
}
module.exports = Forms;
