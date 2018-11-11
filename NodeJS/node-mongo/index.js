const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, { useNewUrlParser: true })
    .then(client => {
      console.log('Connected correctly to the server');

      const db = client.db(dbname);
      const collection = db.collection('dishes');

      collection.insertOne({ 'name': 'Uthappizza', 'description': 'test' })
          .then(res => {
            console.log('After insert:\n');
            console.log(res.ops);

            collection.find({}).toArray()
                .then(docs => {
                  console.log('Found:\n');
                  console.log(docs);

                  db.dropCollection('dishes')
                      .then(res => {
                        client.close();
                      })
                      .catch(err => assert.strictEqual(err, null));
                })
                .catch(err => assert.strictEqual(err, null));
          })
          .catch(err => assert.strictEqual(err, null));
    })
    .catch(err => assert.strictEqual(err, null));