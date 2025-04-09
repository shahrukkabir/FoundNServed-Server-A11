const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
require("dotenv").config();
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
