require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/generate-image', async (req, res) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/images/generations', {
      model: "dall-e-3", 
      prompt: req.body.prompt,
      n: req.body.n || 1,
      size: req.body.size || "1024x1024",
      quality: "hd", 
      style: "natural", 
      response_format: req.body.response_format || "url"
      
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
});
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});