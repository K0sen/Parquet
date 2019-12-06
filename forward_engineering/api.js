'use strict'

const getJsonSchemasFromInitialData = require('./helpers/getJsonSchemasFromInitialData');
const getDefinitionsFromInitialData = require('./helpers/getDefinitionsFromInitialData');
const transformJsonSchemaToDremelService = require('./services/transformJsonSchemaToDremelService');

module.exports = {
	generateContainerScript(data, logger, callback) {
		try {
			const schemas = getJsonSchemasFromInitialData(data);
			const dremelSchemas = schemas.map(schema =>
				transformJsonSchemaToDremelService.transformSchema(
					schema,
					getDefinitionsFromInitialData(data, schema)
				));

			callback(null, dremelSchemas.join('\n\n=====================\n\n'));
		} catch (e) {
			setTimeout(() => {
				callback({ message: e.message, stack: e.stack });
			}, 150);
		}
	}
};
