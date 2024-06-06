// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_connection)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));;

const Task = mongoose.model('Task', {
  text: String,
});


app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err });
  }
});

app.post('/tasks', async (req, res) => {
  try {
    const { text } = req.body;
    const task = new Task({ text });
    await task.save();
    res.json({ message: 'Task added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding task', error: err });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
