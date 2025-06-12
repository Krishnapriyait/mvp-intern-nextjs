import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid message format' });
  }

  console.log("📩 Incoming AI messages:", messages);

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo', 
        messages: messages,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'DonAid-AI-Assistant',
        },
      }
    );

    const reply = response.data.choices?.[0]?.message?.content || "No response from AI.";
    res.status(200).json({ choices: [{ message: { content: reply } }] });
  } catch (error) {
    console.error('❌ OpenRouter Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'OpenRouter request failed' });
  }
}
