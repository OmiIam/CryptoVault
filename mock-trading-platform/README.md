# Mock Trading Platform

A comprehensive mock stock brokerage platform built for **teaching beginners how to trade**. Features a modern glassmorphism UI with real-time-looking price updates, portfolio management, and administrative controls.

![Trading Platform Screenshot](https://via.placeholder.com/800x400/1e293b/ffffff?text=Mock+Trading+Platform)

## 🚀 Features

### For Students/Traders
- **Real-time Market Data** - Simulated live price updates every 10 seconds
- **Portfolio Management** - Track holdings, P&L, and performance
- **Trade Execution** - Buy/sell stocks with instant order execution
- **Dashboard** - Overview of portfolio value, cash balance, and recent activity
- **Mobile-First Design** - Responsive glassmorphism UI with smooth animations

### For Instructors/Admins
- **User Management** - View all student accounts and balances
- **Balance Control** - Manually adjust student balances for scenarios
- **Portfolio Reset** - Reset individual or all student portfolios
- **Bonus System** - Award bonus cash to students
- **System Reset** - Quick reset for new class sessions

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** with **Express** - REST API server
- **SQLite** - Lightweight database for easy deployment
- **JWT** - Secure authentication
- **bcryptjs** - Password hashing
- **TypeScript** - Type-safe backend development

## 📦 Project Structure

```
mock-trading-platform/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   │   ├── dashboard/   # Main dashboard
│   │   │   ├── market/      # Market view
│   │   │   ├── trade/       # Trading interface
│   │   │   ├── portfolio/   # Portfolio management
│   │   │   ├── admin/       # Admin dashboard
│   │   │   └── login/       # Authentication
│   │   ├── components/      # Reusable components
│   │   │   ├── ui/          # UI components (Button, Card, Input)
│   │   │   └── Layout.tsx   # Main layout wrapper
│   │   └── lib/
│   │       └── api.ts       # API client
│   └── package.json
└── backend/                  # Express backend API
    ├── src/
    │   ├── models/          # TypeScript interfaces
    │   ├── routes/          # API route handlers
    │   ├── middleware/      # Auth middleware
    │   ├── database/        # SQLite database setup
    │   ├── utils/           # Seed data utilities
    │   └── server.ts        # Main server file
    └── package.json
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### 1. Clone and Navigate
```bash
git clone <repository-url>
cd mock-trading-platform
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup
```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🎯 Getting Started

### Demo Accounts

The platform comes pre-seeded with demo accounts:

**Admin Account:**
- Email: `admin@trading.com`
- Password: `admin123`

**Student Accounts:**
- Email: `john@example.com` | Password: `user123`
- Email: `jane@example.com` | Password: `user123`
- Email: `mike@example.com` | Password: `user123`
- Email: `sarah@example.com` | Password: `user123`

### Quick Start Guide

1. **Login** - Use any demo account to access the platform
2. **Explore Market** - Browse available assets with live-updating prices
3. **Place Trades** - Click "Trade" on any asset to buy/sell
4. **Monitor Portfolio** - View your holdings and performance on the dashboard
5. **Admin Controls** - Use admin account to manage student accounts

## 🏫 Educational Use

### For Instructors

**Class Setup:**
1. Use admin account to monitor all student activity
2. Reset portfolios at the beginning of each session
3. Award bonus cash for achievements or scenarios
4. Manually adjust balances to simulate market conditions

**Teaching Scenarios:**
- **Market Volatility** - Prices update automatically to simulate market movement
- **Risk Management** - Students can see real-time P&L on their positions
- **Portfolio Diversification** - Multiple asset classes (stocks, crypto) available
- **Trading Psychology** - Realistic trading interface with order execution

### For Students

**Learning Objectives:**
- Understanding buy/sell orders
- Portfolio management concepts
- Risk vs. reward calculations
- Market data interpretation
- Trading psychology in a safe environment

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Admin-only route protection
- Input validation and sanitization
- CORS configuration for security

## 🚀 Deployment

### Backend Deployment
```bash
cd backend
npm run build
npm start
```

### Frontend Deployment
```bash
cd frontend
npm run build
npm start
```

### Environment Variables

Create `.env` files for configuration:

**Backend (.env):**
```env
PORT=5000
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=http://localhost:3000
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📈 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - User login

### Trading Endpoints
- `GET /api/assets` - Fetch all available assets
- `GET /api/assets/:id` - Get specific asset details
- `POST /api/trades` - Execute buy/sell order
- `GET /api/trades` - Get user's trade history
- `GET /api/trades/portfolio` - Get user's current portfolio

### Admin Endpoints
- `GET /api/admin/users` - List all users (admin only)
- `PATCH /api/admin/user/:id` - Update user balance (admin only)
- `POST /api/admin/reset-user/:id` - Reset user portfolio (admin only)
- `POST /api/admin/reset-all` - Reset all portfolios (admin only)
- `POST /api/admin/bonus/:id` - Add bonus to user (admin only)

## 🤝 Contributing

This is an educational project. Contributions are welcome for:
- Additional trading features
- UI/UX improvements
- Educational content
- Bug fixes

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎓 Educational Notes

**Important:** This platform uses simulated data and should only be used for educational purposes. All trades are mock transactions with no real monetary value.

**Disclaimer:** This software is for educational purposes only and should not be used for actual trading decisions or financial advice.

---

**Built with ❤️ for financial education**