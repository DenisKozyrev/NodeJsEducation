const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const url =
  "mongodb+srv://DenisKozyrev:hZ5hOty9NznUjWyK@nodecompletecluster-68qgp.mongodb.net/DenisKozyrevShop?retryWrites=true&w=majority";

let _db;

const mongoConnect = cb => {
  MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
      console.log("Connected");

      _db = client.db();
      cb();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "Ho Data Base found!";
};

exports.mongoConnect = mongoConnect;

exports.getDb = getDb;
