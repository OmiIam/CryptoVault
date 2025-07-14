'use client';

import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Activity, 
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Zap
} from 'lucide-react';

interface TradingPanelProps {
  isInView: boolean;
}

const portfolioData = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 175.43, change: 2.34, changePercent: 1.35, positive: true },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.67, change: 5.21, changePercent: 2.14, positive: true },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 421.89, change: -3.45, changePercent: -0.81, positive: false },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 384.52, change: 1.87, changePercent: 0.49, positive: true }
];

export default function TradingPanel({ isInView }: TradingPanelProps) {
  return (
    <motion.div
      className="relative w-full max-w-2xl"
      initial={{ opacity: 0, x: 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
    >
      {/* Main Trading Panel */}
      <motion.div
        className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        {/* Glass morphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
        
        <div className="relative p-6 lg:p-8">
          
          {/* Header */}
          <motion.div
            className="flex items-center justify-between mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-white font-bold text-lg">Live Trading</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-emerald-500/20 px-3 py-1.5 rounded-full border border-emerald-400/30">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-400 font-mono text-sm font-bold">+2.47%</span>
            </div>
          </motion.div>

          {/* Main Chart Area */}
          <motion.div
            className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-2xl p-6 mb-6 border border-white/5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-white font-bold text-2xl">SPY</h3>
                <p className="text-slate-400 text-sm">S&P 500 ETF</p>
              </div>
              <div className="text-right">
                <div className="text-white font-mono text-xl font-bold">$447.85</div>
                <div className="flex items-center text-emerald-400 text-sm font-medium">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  +$5.23 (1.18%)
                </div>
              </div>
            </div>
            
            {/* Simplified Chart */}
            <div className="relative h-32 mb-4 bg-gradient-to-t from-emerald-500/10 to-transparent rounded-lg border border-emerald-500/20 flex items-end justify-center">
              <motion.div
                className="text-emerald-400 text-center"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.2 }}
              >
                <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                <span className="text-sm font-medium">Market Trending Up</span>
              </motion.div>
            </div>

            {/* Chart time indicators */}
            <div className="flex justify-between text-xs text-slate-500 font-mono">
              <span>9:30</span>
              <span>12:00</span>
              <span>3:30</span>
              <span>4:00</span>
            </div>
          </motion.div>

          {/* Portfolio Holdings */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.0 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-semibold text-lg flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-400" />
                Portfolio
              </h4>
              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                View All
              </button>
            </div>
            
            {portfolioData.slice(0, 2).map((stock, index) => (
              <motion.div
                key={stock.symbol}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.2 + index * 0.1 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-xl flex items-center justify-center border border-white/10">
                    <span className="text-white font-bold text-sm">{stock.symbol.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{stock.symbol}</div>
                    <div className="text-slate-400 text-xs">{stock.name}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-white font-mono text-sm font-semibold">
                    ${stock.price.toFixed(2)}
                  </div>
                  <div className={`flex items-center justify-end text-xs font-medium ${
                    stock.positive ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {stock.positive ? (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    )}
                    {stock.positive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Performance Badge */}
      <motion.div
        className="absolute -top-4 -left-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl px-4 py-3 shadow-xl shadow-emerald-500/25 border border-emerald-400/30"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.4, duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="flex items-center space-x-2 text-white">
          <Zap className="h-5 w-5" />
          <div>
            <div className="font-bold text-lg">99.9%</div>
            <div className="text-xs opacity-90">Uptime</div>
          </div>
        </div>
      </motion.div>

      {/* Floating Volume Badge */}
      <motion.div
        className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl px-4 py-3 shadow-xl shadow-blue-500/25 border border-blue-400/30"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.6, duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="flex items-center space-x-2 text-white">
          <Activity className="h-5 w-5" />
          <div>
            <div className="font-bold text-lg">$2.5B+</div>
            <div className="text-xs opacity-90">Daily Volume</div>
          </div>
        </div>
      </motion.div>

      {/* SEC Regulated Badge */}
      <motion.div
        className="absolute top-6 right-6 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full px-4 py-2 shadow-lg text-white text-sm font-semibold"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.8, duration: 0.6 }}
        whileHover={{ scale: 1.1 }}
      >
        ✓ SEC Regulated
      </motion.div>
    </motion.div>
  );
}