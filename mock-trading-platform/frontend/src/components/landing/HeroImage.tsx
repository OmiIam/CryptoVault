'use client';

import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';

interface HeroImageProps {
  onCTAClick?: () => void;
}

export default function HeroImage({ onCTAClick }: HeroImageProps) {
  return (
    <motion.div
      className="relative w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.4 }}
    >
      {/* Main Trading Dashboard Container */}
      <div className="relative">
        {/* Professional Trading Dashboard Preview */}
        <motion.div
          className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50"
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="aspect-[5/4] bg-gradient-to-br from-slate-800 via-slate-900 to-black border border-white/20 backdrop-blur-sm overflow-hidden relative">
            {/* Professional Trading Interface */}
            <div className="w-full h-full relative overflow-hidden p-6">
              {/* Trading Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white font-semibold text-lg">Live Trading</span>
                </div>
                <div className="text-green-400 text-sm font-mono">+2.4% Today</div>
              </div>
              
              {/* Mock Chart Area */}
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-4 mb-4 border border-white/10">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white font-bold text-xl">SPY</span>
                  <span className="text-green-400 font-mono">$445.20</span>
                </div>
                
                {/* Animated Chart Line */}
                <svg className="w-full h-24" viewBox="0 0 300 100">
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M0,80 Q75,60 150,50 T300,30"
                    stroke="#10B981"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 }}
                  />
                  <motion.path
                    d="M0,80 Q75,60 150,50 T300,30 L300,100 L0,100 Z"
                    fill="url(#chartGradient)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 1 }}
                  />
                </svg>
              </div>
              
              {/* Portfolio Summary */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { symbol: 'AAPL', price: '$173.50', change: '+1.2%', positive: true },
                  { symbol: 'TSLA', price: '$248.30', change: '+2.8%', positive: true },
                ].map((stock, index) => (
                  <motion.div
                    key={stock.symbol}
                    className="bg-white/5 rounded-lg p-3 border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 + index * 0.2 }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold text-sm">{stock.symbol}</span>
                      <span className={`text-xs font-mono ${stock.positive ? 'text-green-400' : 'text-red-400'}`}>
                        {stock.change}
                      </span>
                    </div>
                    <div className="text-gray-300 text-sm mt-1">{stock.price}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Professional Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-blue-500/5 to-purple-500/10 rounded-3xl" />
        </motion.div>

        {/* Professional Floating Badges */}
        <motion.div
          className="absolute -top-6 -left-6 bg-gradient-to-br from-green-500 to-emerald-600 backdrop-blur-md rounded-2xl p-4 border border-green-400/30 shadow-xl shadow-green-500/25"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          whileHover={{ scale: 1.05, y: -2 }}
        >
          <div className="text-center text-white">
            <div className="text-xl font-bold">99.9%</div>
            <div className="text-xs font-medium opacity-90">Uptime</div>
          </div>
        </motion.div>

        <motion.div
          className="absolute -bottom-6 -right-6 bg-gradient-to-br from-blue-500 to-purple-600 backdrop-blur-md rounded-2xl p-4 border border-blue-400/30 shadow-xl shadow-blue-500/25"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.5 }}
          whileHover={{ scale: 1.05, y: -2 }}
        >
          <div className="text-center text-white">
            <div className="text-xl font-bold">$2.5B+</div>
            <div className="text-xs font-medium opacity-90">Daily Volume</div>
          </div>
        </motion.div>

        {/* Professional Status Badge */}
        <motion.div
          className="absolute top-6 right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
        >
          ✓ SEC Regulated
        </motion.div>

        {/* Directional Flow Indicator */}
        <motion.div
          className="absolute -left-8 top-1/2 transform -translate-y-1/2 hidden lg:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
        >
          <motion.div
            className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
            animate={{ x: [-10, 0, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex space-x-1">
              {[0, 0.3, 0.6].map((delay, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-blue-400 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay }}
                />
              ))}
            </div>
            <ArrowRight className="h-4 w-4 text-blue-400" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}