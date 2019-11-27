'use strict'

const fileReadWriteService = require('./services/fileReadWriteService');
const JSONConvertService = require('./services/JSONConvertService');
const wrapFieldsIntoJSONSchema = require('./helpers/wrapFieldsIntoJSONSchema');

module.exports = {
	async reFromFile(data, logger, callback) {
		try {
			const filePath = data.filePath;
			const schema = await fileReadWriteService.readParquetFile(filePath);
			const JSONSchema = JSONConvertService.convertFieldSchemasToJSON(schema);
			const wrappedJSONSchema = wrapFieldsIntoJSONSchema(JSONSchema);
			callback(null, {
				containerName:"New namespace",
				jsonSchema: JSON.stringify(wrappedJSONSchema, null, 4),
			});
		} catch(err) {
			callback(err);
		}
	}
};
