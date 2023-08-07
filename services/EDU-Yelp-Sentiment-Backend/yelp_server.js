require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 3002; // or any other port you prefer

app.use(cors());

const API_KEY = process.env.YELP_API_KEY;

app.get('/api/yelp-business/:location/:term', async (req, res) => {
  const { location, term } = req.params;
  try {
    const response = await axios.get(
      `https://api.yelp.com/v3/businesses/search`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        params: {
          location,
          term,
        },
      }
    );
    res.json(response.data.businesses);
  } catch (error) {
    console.error('Error fetching Yelp data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/yelp-reviews/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `https://api.yelp.com/v3/businesses/${id}/reviews`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    res.json(response.data.reviews);
  } catch (error) {
    console.error('Error fetching Yelp reviews:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/yelp-categories', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.yelp.com/v3/categories`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    res.json(response.data.categories);
  } catch (error) {
    console.error('Error fetching Yelp categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
