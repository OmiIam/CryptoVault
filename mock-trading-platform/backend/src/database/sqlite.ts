import sqlite3 from 'sqlite3';
import path from 'path';

const DB_PATH = path.join(__dirname, '../../trading_platform.db');

export class Database {
  private db: sqlite3.Database;
  private initialized = false;

  constructor() {
    this.db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error('Error opening database:', err);
      } else {
        console.log('Connected to SQLite database');
        this.initTables().then(() => {
          this.initialized = true;
          console.log('Database tables initialized');
        }).catch(console.error);
      }
    });
  }

  public async waitForInit(): Promise<void> {
    while (!this.initialized) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  private async initTables(): Promise<void> {
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        balance REAL DEFAULT 0.0,
        isAdmin BOOLEAN DEFAULT FALSE,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    const createAssetsTable = `
      CREATE TABLE IF NOT EXISTS assets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        ticker TEXT UNIQUE NOT NULL,
        price REAL NOT NULL,
        change REAL DEFAULT 0,
        changePercent REAL DEFAULT 0,
        marketCap TEXT,
        volume INTEGER,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    const createTradesTable = `
      CREATE TABLE IF NOT EXISTS trades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        assetId INTEGER NOT NULL,
        assetTicker TEXT NOT NULL,
        type TEXT NOT NULL CHECK (type IN ('buy', 'sell')),
        quantity REAL NOT NULL,
        price REAL NOT NULL,
        total REAL NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (assetId) REFERENCES assets(id)
      )
    `;

    const createPortfolioTable = `
      CREATE TABLE IF NOT EXISTS portfolio (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        assetId INTEGER NOT NULL,
        assetTicker TEXT NOT NULL,
        quantity REAL NOT NULL,
        averagePrice REAL NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (assetId) REFERENCES assets(id),
        UNIQUE(userId, assetId)
      )
    `;

    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run(createUsersTable, (err) => {
          if (err) return reject(err);
        });
        this.db.run(createAssetsTable, (err) => {
          if (err) return reject(err);
        });
        this.db.run(createTradesTable, (err) => {
          if (err) return reject(err);
        });
        this.db.run(createPortfolioTable, (err) => {
          if (err) return reject(err);
          resolve();
        });
      });
    });
  }

  public run(sql: string, params: any[] = []): Promise<sqlite3.RunResult> {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve(this);
      });
    });
  }

  public get(sql: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  public all(sql: string, params: any[] = []): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  public close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}

export const db = new Database();