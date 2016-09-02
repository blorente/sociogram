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
	},

	createSociogramForm(template) {
		let form = '<form>';
		if (template) {
			template.forEach(function(elem) {
				form += Composer.createFormElement(elem);
			});
		} else {
			form += '';
		}
		form += '<button type="submit" class="btn btn-form btn-primary" id="save-sociogram">Save</button></form>';
		return form;
	},

	createFormElement(elem) {
		let element = '';
		if (elem.type === 'group') {
			element += Composer.createFormGroup(elem);
		} else if (elem.type === 'input') {
			element += Composer.createFormInput(elem);
		}
		return element;
	},

	createFormGroup(template) {
		let group = '<div class=\"form-group\">';
		group += `<label><h3>${template.title}</h3></label>`;
		if (template.elems && template.elems.length > 0) {
			group += '<table><tbody>';
			let labels = '<tr>';
			let fields = '<tr>';
			template.elems.forEach(function(elem) {
				const created = Composer.createFormElement(elem);
				labels += '<td>' + created.match(/<label>.*<\/label>/).toString() + '</td>';
				fields += '<td>' + created.replace(/.*<label>.*<\/label>/, '') + '</td>';
			});
			labels += '</tr>';
			fields += '</tr>';
			group += labels;
			group += fields;
			if (template.extend === 'vertical') {
				group += `<tr><td><button type=\"submit\" class=\"btn btn-form btn-primary\" id=\"extend-${template.title.toLowerCase()}\">Add</button></td></tr>`;
			}
			group += '</tbody></table>';
		}
		group += '</div>';
		return group;
	},

	createFormInput(template) {
		let input = '';
		input += `<label>${template.title}</label>`;
		input += `<input type=\"text\" class=\"form-control\" placeholder=\"${template.title}\">`;
		return input;
	}
}

module.exports = Composer;
