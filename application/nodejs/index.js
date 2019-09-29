const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const url = `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:27017`;
console.log(url);
const app = express();

app.use(function(req, res, next){
    // allow CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Request-With, Content-Type");
    next();
});

app.get("/api/products", (req, res) => {
    MongoClient.connect(url, (err, client) => {
        if (err) {
            throw err;
        }
        console.log("Database connected!");
        const db = client.db("shoppers");
        db.collection("products").find().toArray((err, result) => {
            if (err) {
                throw err;
            }
            res.status(200).send(result);
            client.close();
        });
    });
});

app.listen(8000, () => {
    console.log("Server listening on port 3000");
});