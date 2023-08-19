const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require('./route');
const env = require("dotenv");
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/data",router);
env.config();

// Connect Mongoose to MongoDB server
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.DB_connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Start the server after successfully connecting to the database
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// // Create mongoose Schema
// const articleSchema = new mongoose.Schema({
//   title: String,
//   content: String,
// });

// Create mongoose model
// const Article = mongoose.model("Article", articleSchema);




