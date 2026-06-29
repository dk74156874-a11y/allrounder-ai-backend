const response = await axios.post(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
    process.env.API_KEY,
  {
    contents: [
      {
        parts: [{ text: "Answer in detail: " + message }]
      }
    ],
    generationConfig: {
      temperature: 0.9,
      maxOutputTokens: 1024
    }
  }
);

const reply =
  response.data.candidates?.[0]?.content?.parts
    ?.map(p => p.text)
    .join("") || "No response";

res.json({ reply });
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("AI Server running on port", PORT);
});
