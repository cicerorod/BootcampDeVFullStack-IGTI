const MongoClient = require("mongodb").MongoClient;

const uri =
  "mongodb+srv://cicerorod:1808036901@cluster0-xumbc.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect(async (err) => {
  const collection = client.db("grades").collection("student");
  // perform actions on the collection object
  const documents = await collection.find({ subject: "Historia" }).toArray();

  //console.log(documents);

  const databaseList = await client.db().admin().listDatabases();

  databaseList.databases.forEach((element) => {
    console.log(` - ${element.name}`);
  });

  client.close();
});
