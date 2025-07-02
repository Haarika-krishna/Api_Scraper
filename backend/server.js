require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


const SERP_API_KEY = process.env.API_KEY;

app.post('/search', async (req, res) => {
  const { keyword, location, limit } = req.body;

  if (!keyword || !location || !limit) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }

  try {
    const response = await axios.get('https://serpapi.com/search.json', {
      params: {
        engine: 'google_maps',
        q: `${keyword} in ${location}`,
        api_key: SERP_API_KEY
      }
    });

    const results = response.data.local_results || [];

    res.json({ success: true, data: results.slice(0, parseInt(limit)) });

  } catch (error) {
    console.error('SERP API Error:', error.message);
    res.status(500).json({ success: false, message: 'Error fetching data' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
