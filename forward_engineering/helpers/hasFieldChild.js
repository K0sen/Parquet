const hasFieldChild = field =>
	(field.properties && Object.values(field.properties).length > 0)
	|| field.items;

module.exports = hasFieldChild;
