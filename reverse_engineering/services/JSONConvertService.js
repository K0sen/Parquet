const defineGroupLogicalType = require('../helpers/defineGroupLogicalType');
const reverseFieldSchema = require('../helpers/reverseFieldSchema');

const reverseGroupField = (schema) => {
	return Object.assign({}, reverseFieldSchema(schema), {
		type: 'group',
		logicalType: defineGroupLogicalType(schema),
		properties: convertFieldSchemasToJSON(schema.fields),
	});
}

const isGroupType = schema => schema.isNested;

const convertFieldSchemasToJSON = fieldSchemas =>
	Object.values(fieldSchemas).reduce((resultedSchemas, schema) => {
		if (isGroupType(schema)) {
			return Object.assign(resultedSchemas, { [schema.name]: reverseGroupField(schema) });
		}

		return Object.assign(resultedSchemas, { [schema.name]: reverseFieldSchema(schema) });
	}, {});

module.exports = {
	convertFieldSchemasToJSON,
};
