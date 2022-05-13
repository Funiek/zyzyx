const express = require("express");
const app = express();
const port = 3000;

const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const connectionString =
  "mongodb+srv://funiek:<passwd>@cluster0.rqdrf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const bodyParser = require("body-parser");

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("zyzyx");
    const productsCollection = db.collection("products");

    app.use(bodyParser.urlencoded({ extended: true }));

    app.get("/", (req, res) => {
      res.sendFile(__dirname + "/views/index.html");
    });

    app.post("/products", (req, res) => {
      productsCollection
        .insertOne(req.body)
        .then((result) => {
          console.log(result);
          res.send("Wyslano");
        })
        .catch((error) => console.error(error));
    });

    app.get("/products", (req, res) => {
      const query = { runtime: { $lt: 15 } };

      const options = {
        sort: "name",
        projection: { _id: 0, name: 1, manufacturer: 1, price: 1, currency: 1 },
      };

      const products = productsCollection.find(query,options);

      console.log(JSON.stringify(products));
      res.json(products);
    });

    app.listen(process.env.PORT || port, () => {
      console.log(`Started listening on port ${port}`);
    });
  })
  .catch(console.error);
