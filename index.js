const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json()); // for reading JSON body

mongoose.connect(
  'mongodb+srv://HaarikaBoini:Thoughtiv0001@cluster0.qgu6vpj.mongodb.net/ApiScraper?retryWrites=true&w=majority&appName=Cluster0',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(() => {
  console.log(' MongoDB connected');
})
.catch((err) => {
  console.error(' MongoDB connection error:', err);
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.json({ success: false, message: 'User already exists' });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    if (user.password !== password) {
      return res.json({ success: false, message: 'Incorrect password' });
    }

    res.json({ success: true, message: 'Login successful', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


app.listen(5000, () => {
  console.log(' Server running on http://localhost:5000');
});
