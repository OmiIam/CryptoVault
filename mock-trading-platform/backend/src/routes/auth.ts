import express from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../database/sqlite';
import { generateToken } from '../middleware/auth';
import { CreateUserDto, LoginDto } from '../models/User';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password, isAdmin = false }: CreateUserDto = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    const existingUser = await db.get(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email or username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.run(
      'INSERT INTO users (username, email, password, isAdmin) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, isAdmin]
    );

    const token = generateToken(result.lastID!, isAdmin);

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: result.lastID,
        username,
        email,
        isAdmin,
        balance: 0
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password }: LoginDto = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await db.get(
      'SELECT id, username, email, password, balance, isAdmin FROM users WHERE email = ?',
      [email]
    );

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user.id, user.isAdmin);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        balance: user.balance,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;