const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const { json } = require("express");
const app = express();
const port = process.env.PORT || 15000;
require("dotenv").config();

// ** Middleware

app.use(cors());
app.use(express.json());

// ** checking api end point

app.get("/", (req, res) => res.send("ema-jhon server is running"));

// ** database connection

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7ikallh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

console.log(uri);

console.log(uri);

// ** app listen

app.listen(port, console.log(`server is running on port ${port}`));
