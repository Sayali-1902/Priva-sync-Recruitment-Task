const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');
const authMiddleware = require('../middleware/auth');
// Importing required stuff + groq chatbot

const groq = new Groq({apiKey: process.env.GROQ_API_KEY});
//Creates Gemini client using the API key, kinda like 'logging into' Gemini.

// Chat route - protected by auth middleware
router.post('/', authMiddleware, async (req, res) => { 
    // only authorized users will go inside chatbot!
  const { message } = req.body;

  if (!message) return res.status(400).json({ message: 'Message something!' });

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: 'llama-3.3-70b-versatile',
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error generating response' });
  }
});

module.exports = router;