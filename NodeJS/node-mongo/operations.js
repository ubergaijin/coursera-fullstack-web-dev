const assert = require('assert').strict;

exports.insertDocuemnt = (db, document, collection, callback) => {
  db.collection(collection).insertOne(document)
      .then(res => {
        console.log(`Inserted ${res.result.n} documents into the collection ${collection}`);
        callback(res);
      })
      .catch(err => assert.strictEqual(err, null));
};

exports.findDocuments = (db, collection, callback) => {
  db.collection(collection).find({}).toArray()
      .then(docs => {
        callback(docs);
      })
      .catch(err => assert.strictEqual(err, null));
};

exports.removeDocument = (db, document, collection, callback) => {
  db.collection(collection).deleteOne(document)
      .then(res => {
        console.log(`Removed the document ${document}`);
        callback(res);
      })
      .catch(err => assert.strictEqual(err, null));
};

exports.updateDocuemnt = (db, document, update, collection, callback) => {
  db.collection(collection).updateOne(document, { $set: update }, null)
      .then(res => {
        console.log(`Updated the document with ${JSON.stringify(update)}`);
        callback(res);
      })
      .catch(err => assert.strictEqual(err, null));
};