const parquet_util = require('parquetjs-lite/lib/util');
const parquet_thrift = require('parquetjs-lite/gen-nodejs/parquet_types');
const isNumber = require('../helpers/isNumber');
const getNestedFieldsObject = require('../helpers/getNestedFieldsObject');

const transformRepetitionType = repetitionTypeEnum => ({
	repetitionType: parquet_util.getThriftEnum(
		parquet_thrift.FieldRepetitionType,
		repetitionTypeEnum
	),
});

const transformType = typeEnum => ({
	primitiveType: parquet_util.getThriftEnum(parquet_thrift.Type, typeEnum),
});

const transformConvertedType = convertedTypeEnum => ({
	originalType: parquet_util.getThriftEnum(parquet_thrift.ConvertedType, convertedTypeEnum),
});

const transformFieldProperty = (propertyName, value) => {
	switch(propertyName) {
		case 'name': return { name: value };
		case 'type': return isNumber(value) ? transformType(value) : {};
		case 'repetition_type': return isNumber(value) ? transformRepetitionType(value) : {};
		case 'converted_type': return isNumber(value) ? transformConvertedType(value) : {};
		case 'scale': return { scale: value };
		case 'precision': return { precision: value };
		case 'num_children': return { num_children: value };
		default: {};
	}
}

const transformField = field => {
	return Object.entries(field).reduce((acc, [propertyName, value]) => {
		return Object.assign(acc, transformFieldProperty(propertyName, value));
	}, {});
}

const transformMetadata = rawMetadata => {
	const { schema } = rawMetadata;
	const transformedFields = schema.slice(1).map((field) => transformField(field));
	return getNestedFieldsObject(transformedFields);
}

module.exports = {
	transformMetadata,
}