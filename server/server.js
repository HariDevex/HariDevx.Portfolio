import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { portfolio } from './data/portfolio.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

let mongoStatus = 'disabled';

async function initMongo() {
  if (!MONGODB_URI) {
    mongoStatus = 'skipped';
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI);
    mongoStatus = 'connected';
    console.log('MongoDB connected');
  } catch (err) {
    mongoStatus = 'error';
    console.error('Mongo connection failed:', err.message);
  }
}

app.get('/api/portfolio', (_req, res) => {
  res.json(portfolio);
});

app.get('/api/contact', (_req, res) => {
  res.json({ status: 'ok', mongoStatus });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};
  console.log('Contact submission', { name, email, message });
  res.status(201).json({ received: true, mongoStatus });
});

app.listen(PORT, () => {
  console.log(`API ready on http://localhost:${PORT}`);
});

initMongo();
