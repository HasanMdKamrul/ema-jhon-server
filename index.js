const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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

const run = async () => {
  try {
    const productCollection = client.db("emaJhon").collection("products");

    // ** get all the data from the db

    app.get("/products", async (req, res) => {
      console.log(req.query.page, req.query.dataSize);

      const currentPage = +req.query.page;
      const perPageData = +req.query.dataSize;

      // ** geting the page number and size from the client side request

      const query = {};

      const cursor = productCollection.find(query);
      const products = await cursor
        .skip(currentPage * perPageData)
        .limit(perPageData)
        .toArray();
      const count = await productCollection.estimatedDocumentCount();

      res.send({ count, products });
    });

    app.post("/productsByIds", async (req, res) => {
      const ids = req.body;

      const objectIds = ids.map((id) => ObjectId(id));

      const query = {
        _id: {
          $in: objectIds,
        },
      };

      const cursor = productCollection.find(query);
      const productsData = await cursor.toArray();
      res.send(productsData);
    });
  } finally {
  }
};

run().catch((err) => console.error(err));

// ** app listen

app.listen(port, console.log(`server is running on port ${port}`));
