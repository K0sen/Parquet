const parquet = require('parquetjs-lite');
const rawFileDataTransformService = require('./rawFileDataTransformService');

const getMetadataFromFile = filePath =>
	new Promise(async (resolve, reject) => {
		try {
			const reader = await parquet.ParquetReader.openFile(filePath);
			reader.close();
			resolve(reader);
		} catch (e) {
			reject(e);
		}
	});

const getRawMetadataFromFile = filePath =>
	new Promise(async (resolve, reject) => {
		try {
			const envelopeReader = await parquet.ParquetEnvelopeReader.openFile(filePath);
			await envelopeReader.readHeader();
			const metadata = await envelopeReader.readFooter();
			await envelopeReader.close();
			resolve(metadata);
		} catch (e) {
			reject(e);
		}
	});

const readParquetFile = async filePath => {
	try {
		await test();
		const metadata = await getRawMetadataFromFile(filePath);
		const { key_value_metadata, created_by } = metadata;
		return {
			metadata: {
				key_value_metadata,
				created_by,
			},
			schema: rawFileDataTransformService.transformMetadata(metadata),
		};
	} catch(err) {
		throw new Error(err);
	}
};

module.exports = {
	readParquetFile,
}

const test = async () => {
	try {
		// var schema = new parquet.ParquetSchema({
		// 	a: {
		// 		compression: 'Uncompressed', repeated: true, type: 'UTF8', fields:
		// 		{
		// 			lists: {
		// 				repeated: true, type: 'DECIMAL', compression: 'Uncompressed', fields:
		// 					{ elem: { type: 'UTF8' } }
		// 			}
		// 		}
		// 	},
		// });

		var schema = new parquet.ParquetSchema({
			['a b']: {
				repeated: false, type: 'UTF8'
			},
		});

		// create new ParquetWriter that writes to 'fruits.parquet`
	var writer = await parquet.ParquetWriter.openFile(schema, 'fruits.parquet');
	await writer.close();
	debugger
	} catch (e) {
		debugger
	}
// 
	// 	// append a few rows to the file
	// 	await writer.appendRow({name: 'apples', quantity: 10, price: 2.5, date: new Date(), in_stock: true});
	// 	await writer.appendRow({name: 'oranges', quantity: 10, price: 2.5, date: new Date(), in_stock: true});
	// 	writer.close();


	// 	resolve(w)
	// } catch(e) {
	// 	reject(e);
	// }

	// const listSchema = new parquet.ParquetSchema({
	// 	id: { type: 'UTF8'},
	// 	test: {
	// 	  type: 'LIST',
	// 	  fields: {
	// 		 list: {
	// 			repeated: true,
	// 			fields: {
	// 			  element: {
	// 				 fields: {
	// 					a: {type: 'UTF8'},
	// 					b: {type: 'INT64'}
	// 				 }
	// 			  }
	// 			}
	// 		 }
	// 	  }
	// 	}
	//  });

	// let reader;
	// const row1 = {
	// 	id: 'Row1',
	// 	test: { list: [{ element: { a: 'test1', b: 1 } }, { element: { a: 'test2', b: 2 } }, { element: { a: 'test3', b: 3 } }] }
	// };

	// const row2 = {
	// 	id: 'Row2',
	// 	test: { list: [{ element: { a: 'test4', b: 4 } }] }
	// };

	// let writer = await parquet.ParquetWriter.openFile(listSchema, 'list.parquet', { pageSize: 100 });

	// writer.appendRow(row1);
	// writer.appendRow(row2);

	// await writer.close();
	// reader = await parquet.ParquetReader.openFile('list.parquet');
	// const cursor = reader.getCursor();
	// let records = [];

	// while (record = await cursor.next()) {
	// 	records.push(record);
	// }

	// reader.close();
}
