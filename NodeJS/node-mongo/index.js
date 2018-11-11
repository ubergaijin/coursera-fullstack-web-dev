const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, { useNewUrlParser: true })
    .then(client => {
      console.log('Connected correctly to the server');

      const db = client.db(dbname);

      dboper.insertDocuemnt(db, { name: 'Vadonut', description: 'Test' }, 'dishes', res => {
        console.log('Insert Document:\n', res.ops);

        dboper.findDocuments(db, 'dishes', docs => {
          console.log('Found Documents:\n', docs);

          dboper.updateDocuemnt(db, { name: 'Vadonut' }, { description: 'Update Test' }, 'dishes', res => {
            console.log('Updated Document:\n', res.result);

            dboper.findDocuments(db, 'dishes', docs => {
              console.log('Found Documents:\n', docs);

              db.dropCollection('dishes', res => {
                console.log('Dropped Collection: ', res);

                client.close();
              });
            });
          });
        });
      });
    })
    .catch(err => assert.strictEqual(err, null));