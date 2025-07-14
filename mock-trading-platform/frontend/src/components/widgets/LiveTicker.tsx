'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TickerAsset {
  ticker: string;
  price: number;
  change: number;
  changePercent: number;
}

interface LiveTickerProps {
  className?: string;
}

export default function LiveTicker({ className = '' }: LiveTickerProps) {
  const [assets, setAssets] = useState<TickerAsset[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Initialize with sample data
    const initialAssets: TickerAsset[] = [
      { ticker: 'AAPL', price: 175.50, change: 2.15, changePercent: 1.24 },
      { ticker: 'TSLA', price: 248.75, change: -5.30, changePercent: -2.09 },
      { ticker: 'MSFT', price: 385.20, change: 7.80, changePercent: 2.07 },
      { ticker: 'GOOGL', price: 138.75, change: -1.25, changePercent: -0.89 },
      { ticker: 'META', price: 325.40, change: 12.60, changePercent: 4.03 },
      { ticker: 'NVDA', price: 485.60, change: 15.75, changePercent: 3.35 },
      { ticker: 'BTC', price: 43250.00, change: -750.25, changePercent: -1.71 },
      { ticker: 'ETH', price: 2580.75, change: 45.30, changePercent: 1.79 },
    ];
    
    setAssets(initialAssets);

    // Update prices every 3 seconds
    const interval = setInterval(() => {
      setAssets(prevAssets => 
        prevAssets.map(asset => {
          const volatility = 0.005; // 0.5% max change per update
          const changePercent = (Math.random() - 0.5) * volatility * 2;
          const newPrice = asset.price * (1 + changePercent);
          const change = newPrice - asset.price;
          
          return {
            ...asset,
            price: newPrice,
            change: change,
            changePercent: (change / asset.price) * 100
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible || assets.length === 0) {
    return null;
  }

  return (
    <div className={`bg-black/30 backdrop-blur-md border-y border-white/10 ${className}`}>
      <div className="relative overflow-hidden py-2">
        <motion.div
          className="flex space-x-8 whitespace-nowrap"
          animate={{ x: [-100, -2000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {/* Duplicate assets for seamless loop */}
          {[...assets, ...assets].map((asset, index) => (
            <div
              key={`${asset.ticker}-${index}`}
              className="flex items-center space-x-3 text-sm"
            >
              <span className="font-semibold text-white">{asset.ticker}</span>
              <span className="text-gray-300">${asset.price.toLocaleString()}</span>
              <span
                className={`flex items-center ${
                  asset.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
                }`}
              >
                <span className="mr-1">
                  {asset.changePercent >= 0 ? '▲' : '▼'}
                </span>
                {asset.changePercent >= 0 ? '+' : ''}
                {asset.changePercent.toFixed(2)}%
              </span>
            </div>
          ))}
        </motion.div>
        
        {/* Fade out edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/30 to-transparent pointer-events-none" />
      </div>
      
      {/* Toggle button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="absolute top-1 right-2 text-xs text-gray-400 hover:text-white transition-colors"
      >
        Hide
      </button>
    </div>
  );
}