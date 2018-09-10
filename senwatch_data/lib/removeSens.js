const MongoClient = require("mongodb").MongoClient;
const secrets = require("../../secrets");
const sensToRemove = ["F000457", "C000567", "S001202"];

sensToRemove.forEach(async id => {
  const mClient = await MongoClient.connect(secrets.mongoUrl);
  const sensRef = await mClient.db().collection("Sens");
  const output = await sensRef.remove({ pp_id: id });
  console.log(output);
});
