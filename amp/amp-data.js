const sec = require('../secrets');
const MongoClient = require('mongodb').MongoClient;
const mongodb = sec.secrets.mongodb;

let nySens, njSens, ctSens;

const ampStuff = (res) => {
  MongoClient.connect(mongodb, (err, db) => {
    if (err) {
      return console.log('Unable to connect to mongodb server');
    }
    db.collection('Sens').find({
      $or: [ { state: "NY" }, { state: "NJ" }, { state: "CT" } ]
    }).toArray().then( data => res.send(data) );
  });

};

exports.ampStuff = ampStuff;
