const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
        process.env.API_KEY,
      {
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      }
    );

    const reply =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response";

    res.json({ reply });
  } catch (err) {
    res.json({ reply: "AI error occurred ❌" });
  }
});

app.listen(5000, () => {
  console.log("AI Server running on port 5000");
});
