const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
// Import the Contact model
const Contact = require("./models/module");
const env = require("dotenv")

env.config()

const homeStartingContent = "Welcome to DAILY JOURNAL, a platform designed for you to document and share your daily life experiences. Here, you have the opportunity to capture your thoughts, reflections, and moments of inspiration. Whether you're looking to reflect on your day, set goals, or simply write about your experiences, this is your space. What You'll Find Here";

const aboutContent = "We are passionate about the power of reflection and the importance of capturing everyday moments. DAILY JOURNAL was created to provide a space for individuals to share their personal journeys, inspire others, and connect with a community. Thank you for being a part of this journey with us. At DAILY JOURNAL we believe that every story matters. Whether you're documenting your daily routine, expressing your thoughts and feelings, or setting and achieving your goals, your journal is a testament to your unique life experiences. It's a place where you can be authentic, explore your creativity, and find solace in the written word.";

const contactContent = "We value your feedback and are here to assist you with any questions or concerns you may have. Whether you're experiencing an issue, have a suggestion, or simply want to share your thoughts, we'd love to hear from you. Our team is dedicated to providing you with the best experience possible and ensuring that DAILY JOURNAL meets all your journaling needs..";

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Connect to MongoDB
mongoose.connect(process.env.contactDB)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

const posts = [];


app.get("/", (req, res) => {
  const params = {
    homecontent: homeStartingContent,
    postcontent: posts,

  }
  res.render("home", params);
})

app.get("/about", (req, res) => {
  const params = {
    aboutcontent: aboutContent
  }
  res.render("about", params);
})



app.get("/contact", (req, res) => {
  const params = {
    contactcontent: contactContent
  }
  res.render("contact", params);
})

app.get("/compose", (req, res) => {
  res.render("compose");
})

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.title,
    content: req.body.post
  }
  posts.push(post);
  // posts.forEach((element)=>{
  //   console.log(element);
  // })
  res.redirect("/");
})


app.get("/blogs/:title", (req, res) => {
  let requestedPost = _.lowerCase(req.params.title);

  posts.forEach((post) => {
    const storedTitle = _.lowerCase(post.title);
    if (storedTitle === requestedPost) {
      let params = {
        blog: post
      }
      res.render("post", params);
    }
    else {
      console.log("Not a match");
    }
  });
})
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
      // Simulating saving the message (replace with actual database logic)
      console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);

      // Send a nicely formatted response
      res.send(`
          <div style="
              text-align: center;
              padding: 20px;
              margin: 50px auto;
              border: 1px solid #ddd;
              border-radius: 10px;
              max-width: 500px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              font-family: Arial, sans-serif;
          ">
              <h2 style="color: #4CAF50;">Thank You!</h2>
              <p>Your message has been received successfully.</p>
              <p style="color: #555;">We will get back to you shortly.</p>
              <a href="/" style="
                  display: inline-block;
                  margin-top: 20px;
                  padding: 10px 20px;
                  color: #fff;
                  background-color: #007BFF;
                  text-decoration: none;
                  border-radius: 5px;
              ">Return to Home</a>
          </div>
      `);
  } catch (error) {
      console.error("Error processing the contact form:", error);
      res.status(500).send(`
          <div style="
              text-align: center;
              padding: 20px;
              margin: 50px auto;
              border: 1px solid #f44336;
              border-radius: 10px;
              max-width: 500px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              font-family: Arial, sans-serif;
          ">
              <h2 style="color: #f44336;">Oops!</h2>
              <p>Something went wrong. Please try again later.</p>
              <a href="/contact" style="
                  display: inline-block;
                  margin-top: 20px;
                  padding: 10px 20px;
                  color: #fff;
                  background-color: #007BFF;
                  text-decoration: none;
                  border-radius: 5px;
              ">Return to Contact Form</a>
          </div>
      `);
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
