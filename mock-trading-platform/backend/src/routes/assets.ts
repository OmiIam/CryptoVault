import express from 'express';
import { db } from '../database/sqlite';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const assets = await db.all(`
      SELECT id, name, ticker, price, change, changePercent, marketCap, volume, updatedAt
      FROM assets 
      ORDER BY ticker
    `);

    const updatedAssets = assets.map(asset => ({
      ...asset,
      change: parseFloat((Math.random() * 10 - 5).toFixed(2)),
      changePercent: parseFloat((Math.random() * 8 - 4).toFixed(2)),
      price: parseFloat((asset.price * (1 + (Math.random() * 0.02 - 0.01))).toFixed(2))
    }));

    res.json(updatedAssets);
  } catch (error) {
    console.error('Error fetching assets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const asset = await db.get(
      'SELECT id, name, ticker, price, change, changePercent, marketCap, volume, updatedAt FROM assets WHERE id = ?',
      [id]
    );

    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    res.json(asset);
  } catch (error) {
    console.error('Error fetching asset:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;