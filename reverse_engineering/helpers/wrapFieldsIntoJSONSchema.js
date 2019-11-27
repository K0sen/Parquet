module.exports = fields => ({
	$schema: "http://json-schema.org/draft-04/schema#",
	type: "object",
	title: "New message",
	properties: fields,
})
