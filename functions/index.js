const functions = require("firebase-functions");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Retrieve the MongoDB URI from Firebase environment variables
const mongoURI = functions.config().mongodb.uri;

// Check if mongoURI is undefined and handle it
if (!mongoURI) {
  console.error("MongoDB URI is undefined.");
  process.exit(1);  // Exit the process with failure
}

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Define your Express routes here
app.get("/api", (req, res) => {
  res.send("Hello from Firebase!");
});

// Expose Express API as a single Cloud Function
exports.api = functions.https.onRequest(app);
