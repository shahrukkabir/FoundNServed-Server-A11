const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://whereisit-4b5c6.web.app",
    "https://whereisit-4b5c6.firebaseapp.com",
  ],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token;
  if (!token) return res.status(401).send({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Unauthorized" });
    req.user = decoded;
    next();
  });
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bjzga.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const itemsCollection = client.db("WhereIsIt").collection("items");
    const recoveredCollection = client.db("WhereIsIt").collection("recovered");

    app.post('/jwt', async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '12h' });
      res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ message: 'Success' });
    });

    app.post('/logout', async (req, res) => {
      res
        .clearCookie('token', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ message: 'Success' });
    });

    app.get("/items", async (req, res) => {
      const cursor = itemsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/myItems", verifyToken, async (req, res) => {
      const email = req.query.email;
      if (req.user.email !== email) return res.status(403).send({ message: 'Forbidden Access' });

      const result = await itemsCollection.find({ "contactInfo.email": email }).toArray();
      res.send(result);
    });

    app.get("/recovered", verifyToken, async (req, res) => {
      const email = req.query.email;
      if (req.user.email !== email) return res.status(403).send({ message: 'Forbidden Access' });

      const result = await recoveredCollection.find({ "recoveredBy.email": email }).toArray();
      res.send(result);
    });

    // Get single item by ID
    app.get("/items/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await itemsCollection.findOne(query);
      res.send(result);
    });

    // Update item by ID
    app.put("/items/:id", async (req, res) => {
      const id = req.params.id;
      const updateItem = req.body;
      const filter = { _id: new ObjectId(id) };
      const option = { upsert: true };

      try {
        const existingItem = await itemsCollection.findOne(filter);
        if (!existingItem) return res.status(404).send({ message: "Item not found" });

        const updatedItem = {
          ...existingItem,
          ...updateItem,
        };

        const result = await itemsCollection.updateOne(filter, { $set: updatedItem }, option);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to update item" });
      }
    });

    console.log("MongoDB connected!");
  } finally {}
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("All WhereIsIt");
});

app.listen(port, () => {
  console.log(`WhereIsIt server is running on port: ${port}`);
});
