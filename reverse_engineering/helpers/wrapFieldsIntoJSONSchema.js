module.exports = (fields, fileName) => ({
	$schema: "http://json-schema.org/draft-04/schema#",
	type: "object",
	title: fileName,
	properties: fields,
})
