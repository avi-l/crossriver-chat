import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, model } = req.body;

    const groqResponse = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: model || 'llama-3.3-70b-versatile',
        messages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const content =
      groqResponse.data.choices?.[0]?.message?.content ||
      'No response from model.';

    res.json({ content });
  } catch (err: any) {
    console.error('Groq API error:', err.response?.data || err.message);
    res.status(500).json({
      error: err.response?.data?.error || 'Internal Server Error',
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
