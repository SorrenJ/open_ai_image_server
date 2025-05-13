const axios = require('axios');

async function generateImage() {
  try {
    const response = await axios.post('http://localhost:3000/generate-image', {
  model: "dall-e-3",
  prompt: "super hero hippo",
  size: "1024x1024"
    });

    console.log("Generated Images:");
    response.data.data.forEach((img, index) => {
      console.log(`Image ${index + 1}:`, img.url);
    });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

generateImage();