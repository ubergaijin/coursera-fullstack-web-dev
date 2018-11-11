const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, { useNewUrlParser: true })
    .then(client => {
      console.log('Connected correctly to the server');

      const db = client.db(dbname);

      dboper.insertDocument(db, { name: 'Vadonut', description: 'Test' }, 'dishes')
          .then(res => {
            console.log('Insert Document:\n', res.ops);

            return dboper.findDocuments(db, 'dishes');
          })
          .then(docs => {
            console.log('Found Documents:\n', docs);

            return dboper.updateDocument(db, { name: 'Vadonut' }, { description: 'Update Test' }, 'dishes');
          })
          .then(res => {
            console.log('Updated Document:\n', res.result);

            return dboper.findDocuments(db, 'dishes');
          })
          .then(docs => {
            console.log('Found Documents:\n', docs);

            return db.dropCollection('dishes');
          })
          .then(res => {
            console.log('Dropped Collection: ', res);

            return client.close();
          })
          .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
