// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3002; // or any other port you prefer

app.use(cors());

// const API_KEY = 'K0Jyx8sotK-JXHr6qaN-tzBNegn-7PCmezE8ryh03i9TX1jTrXOGln_O0cnxkJROJ-QbAn68P065mn2WB1O4jUvkGYlCQ1A4OBT129TAhSyvzwcz2euhRIyHio7OZHYx';
const API_KEY = '2-urBF2kS1Op9GEAqmNcFf77wdc8zZaM6tVCRcjJPl3790IcX_ANct9bmfsNxQYfx2O4Ulnpw9GIo7rXdQ3r6yXfLfyGc_TcXmnB6wQEpekBSRQ8asIldQnXQUnPZHYx';
// const API_KEY = 'SiX-J9H4uvPsIGLXz6y0ypZGjpaM0arN7niib_z9PfgGZYVOPCyWSLC7YCnlc28-M4KDh2N3VLXoBI3jGvVW8EpPaMD2RBCHHvxRSaqy6nbuq4obvvlvJqH_5l7PZHYx';
// const API_KEY = 'puqK5nTXKBupr-skrlgx_yEFuzUzSVb-y8mA-4F8faBzChGq7O7sidFoOB8ALI8o64kWRyyR0f1tP6RPJk7d6rtZqYsQzLjR08azzGzgZXv9PXPYjZL-3P8xq5bPZHYx';
// const API_KEY = 'FBor-a-J5nZdsq79fjoVqfegwU1z9gER0IPMC62pmZNPfHv0tgtKtrYX0NFoSKeGVko-7bL5oFPCe-I6az9JoiR23SzfM2edz0Xs9RT8BCmrZZ8nWAaoGCQ2hLfPZHYx'

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
