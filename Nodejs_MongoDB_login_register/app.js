const express = require('express');
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: 'false' }))
app.use(express.json())
app.set('view engine', 'hbs')
const env = require("dotenv")
env.config()

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_connection)
const db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
    console.log("connection succeeded");
})
// .then(() =>{
//     console.log("connection successful");
// })
// .catch((err) =>{
//     console.log(`there will be some error ${err}`);
// })

// to rendering routes
app.get('/', (req, res) => {
    res.render("index")
})

// now for register data from user side
app.get("/register", (req, res) => {
    res.render("register")
})

// register teh login route 
app.get("/login", (req, res) => {
    res.render("login")
})

app.post("/auth/register", async (req, res) => {
    // const {name, email, password, password_confirm} = req.body
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const password_confirm = req.body.password_confirm;
    // db.query goes here
    // const userExist = await 4

    const data = {
        "name": name,
        "email": email,
        "password": password,
        "password_confirm": password_confirm
    }

    db.collection('details').insertOne(data, function (err, collection) {
        if (err) throw err;
        console.log("Record inserted Successfully");

    });
    return res.redirect();
})

// configure port
app.listen(4000, () => {
    console.log("server started on port 4000");
});