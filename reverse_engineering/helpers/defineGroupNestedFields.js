const { MAP, LIST } = require('../../config/constants');

const defineGroupNextFields = (field, type) => (type === MAP || type === LIST)
	? Object.values(field.fields)[0].fields
	: field.fields;

module.exports = defineGroupNextFields;
