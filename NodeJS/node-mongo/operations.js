exports.insertDocument = (db, document, collection) => {
  return db.collection(collection).insertOne(document);
};

exports.findDocuments = (db, collection) => {
  return db.collection(collection).find({}).toArray();
};

exports.removeDocument = (db, document, collection) => {
  return db.collection(collection).deleteOne(document);
};

exports.updateDocument = (db, document, update, collection) => {
  return db.collection(collection).updateOne(document, { $set: update }, null);
};