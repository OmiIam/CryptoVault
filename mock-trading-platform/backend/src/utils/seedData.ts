import { db } from '../database/sqlite';
import bcrypt from 'bcryptjs';

export const seedDatabase = async () => {
  try {
    console.log('Seeding database...');

    const existingUsers = await db.get('SELECT COUNT(*) as count FROM users');
    if (existingUsers.count > 0) {
      console.log('Database already seeded');
      return;
    }

    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);

    const users = [
      { username: 'admin', email: 'admin@trading.com', password: adminPassword, isAdmin: true, balance: 50000 },
      { username: 'john_doe', email: 'john@example.com', password: userPassword, isAdmin: false, balance: 15000 },
      { username: 'jane_smith', email: 'jane@example.com', password: userPassword, isAdmin: false, balance: 8500 },
      { username: 'mike_trader', email: 'mike@example.com', password: userPassword, isAdmin: false, balance: 12750 },
      { username: 'sarah_investor', email: 'sarah@example.com', password: userPassword, isAdmin: false, balance: 9900 }
    ];

    for (const user of users) {
      await db.run(
        'INSERT INTO users (username, email, password, isAdmin, balance) VALUES (?, ?, ?, ?, ?)',
        [user.username, user.email, user.password, user.isAdmin, user.balance]
      );
    }

    const assets = [
      { name: 'Apple Inc.', ticker: 'AAPL', price: 175.50, marketCap: '$2.8T', volume: 58234567 },
      { name: 'Tesla Inc.', ticker: 'TSLA', price: 248.75, marketCap: '$789B', volume: 42156789 },
      { name: 'Microsoft Corporation', ticker: 'MSFT', price: 385.20, marketCap: '$2.9T', volume: 32567890 },
      { name: 'Amazon.com Inc.', ticker: 'AMZN', price: 142.35, marketCap: '$1.5T', volume: 28934567 },
      { name: 'NVIDIA Corporation', ticker: 'NVDA', price: 485.60, marketCap: '$1.2T', volume: 65432109 },
      { name: 'Alphabet Inc.', ticker: 'GOOGL', price: 138.75, marketCap: '$1.7T', volume: 23456789 },
      { name: 'Meta Platforms Inc.', ticker: 'META', price: 325.40, marketCap: '$825B', volume: 18765432 },
      { name: 'Bitcoin', ticker: 'BTC', price: 43250.00, marketCap: '$845B', volume: 12345678 },
      { name: 'Ethereum', ticker: 'ETH', price: 2580.75, marketCap: '$310B', volume: 8765432 },
      { name: 'GameStop Corp.', ticker: 'GME', price: 15.85, marketCap: '$4.8B', volume: 3456789 }
    ];

    for (const asset of assets) {
      await db.run(
        'INSERT INTO assets (name, ticker, price, marketCap, volume) VALUES (?, ?, ?, ?, ?)',
        [asset.name, asset.ticker, asset.price, asset.marketCap, asset.volume]
      );
    }

    console.log('Database seeded successfully!');
    console.log('Admin credentials: admin@trading.com / admin123');
    console.log('User credentials: john@example.com / user123 (and others)');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};