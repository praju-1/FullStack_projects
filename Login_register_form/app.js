const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const env = require("dotenv")


const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
env.config()

mongoose.connect(process.env.DB_collection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
console.log("connection created");
// Define mongoose schema and models for users
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

// Set up routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = new User({ username, password });
        await user.save();
        res.redirect('/login');
    } catch (error) {
        res.send('Error registering user.');
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password });
        if (user) {
            res.send('Logged in successfully.');
        } else {
            res.send('Invalid username or password.');
        }
    } catch (error) {
        res.send('Error logging in.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
