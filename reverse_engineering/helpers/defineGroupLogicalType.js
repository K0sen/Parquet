const isMap = schema =>
	schema.fieldCount === 2
	|| (schema.fieldCount === 1 && Object.values(schema.fields)[0].fieldCount === 2);

const defineGroupLogicalType = schema => isMap(schema) ? 'MAP' : 'LIST';

module.exports = defineGroupLogicalType;