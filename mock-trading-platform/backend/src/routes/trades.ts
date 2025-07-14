import express from 'express';
import { db } from '../database/sqlite';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { CreateTradeDto } from '../models/Trade';

const router = express.Router();

router.post('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { assetId, type, quantity, price }: CreateTradeDto = req.body;
    const userId = req.userId!;

    if (!assetId || !type || !quantity || !price) {
      return res.status(400).json({ error: 'All trade fields are required' });
    }

    if (type !== 'buy' && type !== 'sell') {
      return res.status(400).json({ error: 'Trade type must be "buy" or "sell"' });
    }

    const asset = await db.get('SELECT ticker, name FROM assets WHERE id = ?', [assetId]);
    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    const user = await db.get('SELECT balance FROM users WHERE id = ?', [userId]);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const total = quantity * price;

    if (type === 'buy') {
      if (user.balance < total) {
        return res.status(400).json({ error: 'Insufficient balance' });
      }

      await db.run('UPDATE users SET balance = balance - ? WHERE id = ?', [total, userId]);

      const existingPosition = await db.get(
        'SELECT quantity, averagePrice FROM portfolio WHERE userId = ? AND assetId = ?',
        [userId, assetId]
      );

      if (existingPosition) {
        const newQuantity = existingPosition.quantity + quantity;
        const newAveragePrice = ((existingPosition.quantity * existingPosition.averagePrice) + (quantity * price)) / newQuantity;
        
        await db.run(
          'UPDATE portfolio SET quantity = ?, averagePrice = ? WHERE userId = ? AND assetId = ?',
          [newQuantity, newAveragePrice, userId, assetId]
        );
      } else {
        await db.run(
          'INSERT INTO portfolio (userId, assetId, assetTicker, quantity, averagePrice) VALUES (?, ?, ?, ?, ?)',
          [userId, assetId, asset.ticker, quantity, price]
        );
      }
    } else {
      const position = await db.get(
        'SELECT quantity FROM portfolio WHERE userId = ? AND assetId = ?',
        [userId, assetId]
      );

      if (!position || position.quantity < quantity) {
        return res.status(400).json({ error: 'Insufficient shares to sell' });
      }

      await db.run('UPDATE users SET balance = balance + ? WHERE id = ?', [total, userId]);

      if (position.quantity === quantity) {
        await db.run('DELETE FROM portfolio WHERE userId = ? AND assetId = ?', [userId, assetId]);
      } else {
        await db.run(
          'UPDATE portfolio SET quantity = quantity - ? WHERE userId = ? AND assetId = ?',
          [quantity, userId, assetId]
        );
      }
    }

    const tradeResult = await db.run(
      'INSERT INTO trades (userId, assetId, assetTicker, type, quantity, price, total) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [userId, assetId, asset.ticker, type, quantity, price, total]
    );

    res.status(201).json({
      message: 'Trade executed successfully',
      trade: {
        id: tradeResult.lastID,
        userId,
        assetId,
        assetTicker: asset.ticker,
        type,
        quantity,
        price,
        total
      }
    });
  } catch (error) {
    console.error('Trade execution error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId!;
    const trades = await db.all(
      'SELECT * FROM trades WHERE userId = ? ORDER BY timestamp DESC LIMIT 50',
      [userId]
    );

    res.json(trades);
  } catch (error) {
    console.error('Error fetching trades:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/portfolio', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId!;
    const portfolio = await db.all(`
      SELECT p.*, a.name, a.price as currentPrice
      FROM portfolio p
      JOIN assets a ON p.assetId = a.id
      WHERE p.userId = ?
    `, [userId]);

    const portfolioWithValues = portfolio.map(position => ({
      ...position,
      marketValue: position.quantity * position.currentPrice,
      gainLoss: (position.currentPrice - position.averagePrice) * position.quantity,
      gainLossPercent: ((position.currentPrice - position.averagePrice) / position.averagePrice) * 100
    }));

    res.json(portfolioWithValues);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;