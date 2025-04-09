const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

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
