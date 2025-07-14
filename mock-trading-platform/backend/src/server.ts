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

// Add production domains
if (process.env.NODE_ENV === 'production') {
  allowedOrigins.push('https://your-domain.com');
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

app.get('/api/health', async (req, res) => {
  try {
    // Check database connection
    const { db } = await import('./database/sqlite');
    await db.get('SELECT 1');
    
    res.json({ 
      status: 'healthy',
      message: 'Mock Trading Platform API is running',
      timestamp: new Date().toISOString(),
      database: 'connected'
    });
  } catch (error) {
    res.status(503).json({ 
      status: 'unhealthy',
      message: 'Service unavailable',
      timestamp: new Date().toISOString(),
      database: 'disconnected'
    });
  }
});

app.get('/api/ready', async (req, res) => {
  try {
    const { db } = await import('./database/sqlite');
    await db.waitForInit();
    res.json({ status: 'ready' });
  } catch (error) {
    res.status(503).json({ status: 'not ready' });
  }
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  const { db } = await import('./database/sqlite');
  await db.waitForInit();
  await seedDatabase();
});

export default app;