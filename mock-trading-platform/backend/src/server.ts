import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import assetRoutes from './routes/assets';
import tradeRoutes from './routes/trades';
import adminRoutes from './routes/admin';
import { seedDatabase } from './utils/seedData';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001'
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/trades', tradeRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
  res.json({ message: 'Mock Trading Platform API is running' });
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  const { db } = await import('./database/sqlite');
  await db.waitForInit();
  await seedDatabase();
});

export default app;