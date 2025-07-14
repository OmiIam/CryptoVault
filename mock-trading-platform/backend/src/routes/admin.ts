import express from 'express';
import { db } from '../database/sqlite';
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth';

const router = express.Router();

router.use(authenticateToken);
router.use(requireAdmin);

router.get('/users', async (req: AuthRequest, res) => {
  try {
    const users = await db.all(`
      SELECT id, username, email, balance, isAdmin, createdAt, updatedAt
      FROM users
      ORDER BY createdAt DESC
    `);

    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.patch('/user/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { balance } = req.body;

    if (balance === undefined || balance < 0) {
      return res.status(400).json({ error: 'Valid balance is required' });
    }

    const user = await db.get('SELECT id FROM users WHERE id = ?', [id]);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await db.run(
      'UPDATE users SET balance = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
      [balance, id]
    );

    res.json({ message: 'User balance updated successfully' });
  } catch (error) {
    console.error('Error updating user balance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/reset-user/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const user = await db.get('SELECT id FROM users WHERE id = ?', [id]);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await db.run('DELETE FROM trades WHERE userId = ?', [id]);
    await db.run('DELETE FROM portfolio WHERE userId = ?', [id]);
    await db.run('UPDATE users SET balance = 0, updatedAt = CURRENT_TIMESTAMP WHERE id = ?', [id]);

    res.json({ message: 'User portfolio reset successfully' });
  } catch (error) {
    console.error('Error resetting user portfolio:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/reset-all', async (req: AuthRequest, res) => {
  try {
    await db.run('DELETE FROM trades');
    await db.run('DELETE FROM portfolio');
    await db.run('UPDATE users SET balance = 0, updatedAt = CURRENT_TIMESTAMP WHERE isAdmin = FALSE');

    res.json({ message: 'All user portfolios reset successfully' });
  } catch (error) {
    console.error('Error resetting all portfolios:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/bonus/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Valid bonus amount is required' });
    }

    const user = await db.get('SELECT id FROM users WHERE id = ?', [id]);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await db.run(
      'UPDATE users SET balance = balance + ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
      [amount, id]
    );

    res.json({ message: `Bonus of $${amount} added successfully` });
  } catch (error) {
    console.error('Error adding bonus:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/user-dashboard/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const user = await db.get('SELECT id, username, email, balance FROM users WHERE id = ?', [id]);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const [portfolio, trades] = await Promise.all([
      db.all(`
        SELECT p.*, a.name, a.price as currentPrice
        FROM portfolio p
        JOIN assets a ON p.assetId = a.id
        WHERE p.userId = ?
      `, [id]),
      db.all(
        'SELECT * FROM trades WHERE userId = ? ORDER BY timestamp DESC LIMIT 50',
        [id]
      )
    ]);

    const portfolioWithValues = portfolio.map(position => ({
      ...position,
      marketValue: position.quantity * position.currentPrice,
      gainLoss: (position.currentPrice - position.averagePrice) * position.quantity,
      gainLossPercent: ((position.currentPrice - position.averagePrice) / position.averagePrice) * 100
    }));

    res.json({
      user,
      portfolio: portfolioWithValues,
      trades
    });
  } catch (error) {
    console.error('Error fetching user dashboard:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/analytics/leaderboard', async (req: AuthRequest, res) => {
  try {
    const users = await db.all(`
      SELECT 
        u.id, u.username, u.email, u.balance,
        COALESCE(SUM(p.quantity * a.price), 0) as portfolioValue,
        COALESCE(SUM((a.price - p.averagePrice) * p.quantity), 0) as totalGainLoss
      FROM users u
      LEFT JOIN portfolio p ON u.id = p.userId
      LEFT JOIN assets a ON p.assetId = a.id
      WHERE u.isAdmin = FALSE
      GROUP BY u.id, u.username, u.email, u.balance
      ORDER BY (u.balance + COALESCE(SUM(p.quantity * a.price), 0)) DESC
    `);

    const leaderboard = users.map(user => ({
      ...user,
      totalValue: user.balance + user.portfolioValue,
      returnPercent: user.portfolioValue > 0 ? (user.totalGainLoss / (user.portfolioValue - user.totalGainLoss)) * 100 : 0
    }));

    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/bulk-update', async (req: AuthRequest, res) => {
  try {
    const { userIds, action, value } = req.body;

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ error: 'User IDs array is required' });
    }

    const placeholders = userIds.map(() => '?').join(',');

    switch (action) {
      case 'setBalance':
        if (typeof value !== 'number' || value < 0) {
          return res.status(400).json({ error: 'Valid balance value is required' });
        }
        await db.run(
          `UPDATE users SET balance = ?, updatedAt = CURRENT_TIMESTAMP WHERE id IN (${placeholders}) AND isAdmin = FALSE`,
          [value, ...userIds]
        );
        break;

      case 'addBonus':
        if (typeof value !== 'number' || value <= 0) {
          return res.status(400).json({ error: 'Valid bonus amount is required' });
        }
        await db.run(
          `UPDATE users SET balance = balance + ?, updatedAt = CURRENT_TIMESTAMP WHERE id IN (${placeholders}) AND isAdmin = FALSE`,
          [value, ...userIds]
        );
        break;

      case 'resetPortfolio':
        await db.run(`DELETE FROM trades WHERE userId IN (${placeholders})`, userIds);
        await db.run(`DELETE FROM portfolio WHERE userId IN (${placeholders})`, userIds);
        await db.run(
          `UPDATE users SET balance = 0, updatedAt = CURRENT_TIMESTAMP WHERE id IN (${placeholders}) AND isAdmin = FALSE`,
          userIds
        );
        break;

      default:
        return res.status(400).json({ error: 'Invalid action' });
    }

    res.json({ message: `Bulk ${action} completed for ${userIds.length} users` });
  } catch (error) {
    console.error('Error performing bulk update:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;