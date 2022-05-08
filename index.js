const express = require("express");
const app = express();
const port = 3000;

const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const connectionString = ""

const bodyParser = require("body-parser");

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log("Connected to Database");
        const db = client.db('zyzyx');
        const userCollection = db.collection('user');

        app.use(bodyParser.urlencoded({ extended: true }));

        app.get("/", (req, res) => {
            res.sendFile(__dirname + "/views/index.html");
        });

        app.post("/user", (req, res) => {
            userCollection.insertOne(req.body)
                .then(result => {
                    console.log(result)
                    res.send("Wyslano");
                })
                .catch(error => console.error(error));

        });

        app.listen(process.env.PORT || port, () => {
            console.log(`Started listening on port ${port}`);
        });
    })
    .catch(console.error);



