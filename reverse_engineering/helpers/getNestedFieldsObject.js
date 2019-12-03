const definePath = (schemaElement, schema) => {
	if (!schema.parent) {
		return [schemaElement.name];
	}

	const parent = Object.values(schema.parent)[0];
	return definePath(parent, schema.parent).concat([schemaElement.name]);
};

function getNestedFieldsObject(schemaElements) {
	let schema = {};
	schemaElements.forEach(schemaElement => {
		if (schemaElement.num_children > 0) {
			schema[schemaElement.name] = Object.assign(schemaElement, {
				isNested: true,
				fieldCount: schemaElement.num_children,
				path: definePath(schemaElement, schema),
				fields: Object.create({}, {
					parent: {
						value: schema,
						enumerable: false
					},
					num_children: {
						value: schemaElement.num_children,
						enumerable: false
					}
				})
			});

			schema = schema[schemaElement.name].fields;
		} else {
			schema[schemaElement.name] = Object.assign({}, schemaElement, { path: definePath(schemaElement, schema) });
		}

		while (schema.parent && Object.keys(schema).length === schema.num_children) {
			schema = schema.parent;
		}
	});
	return schema;
}

module.exports = getNestedFieldsObject;
