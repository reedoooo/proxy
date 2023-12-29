const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = 3002; // You can choose any available port

app.use(express.json());

// Proxy endpoint
app.get("/proxy/:cardId", async (req, res) => {
  try {
    const cardId = req.params.cardId;
    const url = `https://images.ygoprodeck.com/images/cards/${cardId}.jpg`; // Modify according to the actual API URL

    const response = await fetch(url);
    const imageBuffer = await response.buffer();

    res.set("Content-Type", "image/jpeg");
    res.set("Access-Control-Allow-Origin", "*"); // Setting CORS header
    res.send(imageBuffer);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).send("Error fetching image");
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
