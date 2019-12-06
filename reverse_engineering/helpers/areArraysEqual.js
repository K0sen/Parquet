const areArraysEqual = (first, second) =>
	Array.isArray(first)
	&& Array.isArray(second)
	&& first.every(elem => second.includes(elem));

module.exports = areArraysEqual;
