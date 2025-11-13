import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err.message));

// ✅ Message Schema (for logging chat history)
const chatSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'assistant'], required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ChatMessage = mongoose.model('ChatMessage', chatSchema);

app.use(cors({
  origin: "https://sustainability-assistant-fa7p.onrender.com",
}));
app.use(express.json());

// ✅ Rate Limiting
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 1000, // limit each IP to 1000 requests per hour
  message: {
    error: 'Limit Exhausted, please try again after some time!',
    retryAfter: '1 hour',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use('/api/', limiter);

// ✅ Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({ error: 'OpenRouter API key not configured' });
    }

    // Store user message in DB
    await ChatMessage.create({ role: 'user', text: message });

    const systemPrompt = `You are a knowledgeable sustainability expert and environmental consultant. 
Your role is to provide helpful, accurate, and actionable advice on:
- Sustainable living practices
- Eco-friendly solutions for daily life
- Environmental awareness and conservation
- Green technology and renewable energy
- Waste reduction and recycling
- Sustainable business practices
- Climate change mitigation strategies

Always provide practical, evidence-based recommendations that users can implement. 
Be encouraging and positive while being realistic about environmental challenges. 
Keep responses concise but informative.`;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ],
        max_tokens: 500,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'Smart Sustainability Assistant',
        },
      }
    );

    const aiResponse = response.data.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No response from AI');
    }

    // Store assistant response in DB
    await ChatMessage.create({ role: 'assistant', text: aiResponse });

    res.json({ response: aiResponse });
  } catch (error) {
    console.error('Chat API Error:', error.response?.data || error.message);

    if (error.response?.status === 401) {
      res.status(401).json({ error: 'Invalid API key' });
    } else if (error.response?.status === 429) {
      res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
    } else {
      res.status(500).json({ error: 'Failed to get response from AI assistant' });
    }
  }
});

// ✅ Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
