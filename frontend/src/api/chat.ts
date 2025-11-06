import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

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

    res.status(200).json({ content });
  } catch (err: any) {
    console.error('Groq API error:', err.response?.data || err.message);
    res.status(500).json({
      error: err.response?.data?.error || 'Internal Server Error',
    });
  }
}
