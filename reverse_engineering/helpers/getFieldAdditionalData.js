const isArraysEqual = require('./isArraysEqual');

const getFieldAdditionalData = (fieldsMetadata, field) =>
	fieldsMetadata.find(fieldMeta =>
		isArraysEqual(fieldMeta.meta_data.path_in_schema, field.path)
		&& isArraysEqual(field.path, fieldMeta.meta_data.path_in_schema)
	);

module.exports = getFieldAdditionalData;
