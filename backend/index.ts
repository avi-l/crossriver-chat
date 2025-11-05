import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Groq uses OpenAI-compatible SDK with baseURL
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, model } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'No messages provided' });
    }

    const completion = await groq.chat.completions.create({
      model: model || 'llama-3.3-70b-versatile',
      messages,
    });

    res.json(completion.choices[0].message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(process.env.PORT || 5173, () => {
  console.log(`Groq proxy server running on port ${process.env.PORT || 5173}`);
});
