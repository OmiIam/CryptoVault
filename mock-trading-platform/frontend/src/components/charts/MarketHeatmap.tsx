'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { api } from '@/lib/api';

interface Asset {
  id: number;
  name: string;
  ticker: string;
  price: number;
  changePercent: number;
  marketCap: string;
}

interface MarketHeatmapProps {
  className?: string;
}

export default function MarketHeatmap({ className = '' }: MarketHeatmapProps) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssets();
    const interval = setInterval(fetchAssets, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await api.getAssets();
      if (response.data) {
        setAssets(response.data);
      }
    } catch (error) {
      console.error('Error fetching assets:', error);
    } finally {
      setLoading(false);
    }
  };

  const getColorIntensity = (changePercent: number) => {
    const intensity = Math.min(Math.abs(changePercent) / 5, 1); // Max intensity at 5%
    if (changePercent > 0) {
      return {
        backgroundColor: `rgba(16, 185, 129, ${0.2 + intensity * 0.6})`, // Green
        borderColor: `rgba(16, 185, 129, ${0.3 + intensity * 0.7})`
      };
    } else {
      return {
        backgroundColor: `rgba(239, 68, 68, ${0.2 + intensity * 0.6})`, // Red
        borderColor: `rgba(239, 68, 68, ${0.3 + intensity * 0.7})`
      };
    }
  };

  const getFontSize = (marketCap: string) => {
    // Determine size based on market cap
    const cap = marketCap.toLowerCase();
    if (cap.includes('t')) return 'text-sm'; // Trillion
    if (cap.includes('b')) return 'text-xs'; // Billion
    return 'text-xs'; // Million or smaller
  };

  if (loading) {
    return (
      <Card className={className}>
        <h3 className="text-lg font-semibold text-white mb-4">Market Heatmap</h3>
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Market Heatmap</h3>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Gains</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Losses</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {assets.map((asset, index) => {
          const colorStyle = getColorIntensity(asset.changePercent);
          const fontSize = getFontSize(asset.marketCap);
          
          return (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                delay: index * 0.05,
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
              whileHover={{ 
                scale: 1.08, 
                y: -2,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative p-4 rounded-xl border-2 transition-all duration-500 
                cursor-pointer group overflow-hidden
                hover:shadow-xl hover:shadow-black/20
              `}
              style={{
                ...colorStyle,
                backdropFilter: 'blur(8px) saturate(150%)',
                WebkitBackdropFilter: 'blur(8px) saturate(150%)',
              }}
            >
              {/* Animated background overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="text-center relative z-10">
                <motion.div 
                  className={`font-bold text-white ${fontSize} group-hover:text-blue-100 transition-colors`}
                  whileHover={{ scale: 1.1 }}
                >
                  {asset.ticker}
                </motion.div>
                <motion.div 
                  className="text-xs text-gray-200 mt-1 truncate group-hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  ${asset.price.toLocaleString()}
                </motion.div>
                <motion.div 
                  className={`
                    text-xs font-bold mt-2 flex items-center justify-center gap-1
                    ${asset.changePercent >= 0 ? 'text-green-200' : 'text-red-200'}
                  `}
                  whileHover={{ scale: 1.1 }}
                >
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${
                    asset.changePercent >= 0 ? 'bg-green-200' : 'bg-red-200'
                  }`} />
                  {asset.changePercent >= 0 ? '+' : ''}{asset.changePercent.toFixed(2)}%
                </motion.div>
              </div>

              {/* Enhanced Tooltip on hover */}
              <motion.div 
                className="
                  absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3
                  bg-black/95 backdrop-blur-xl border border-white/30 text-white text-xs rounded-xl px-3 py-2
                  opacity-0 group-hover:opacity-100 transition-all duration-300
                  pointer-events-none z-20 whitespace-nowrap shadow-2xl
                "
                style={{
                  backdropFilter: 'blur(20px) saturate(200%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                }}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                whileHover={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <div className="font-bold text-white">{asset.name}</div>
                <div className="text-gray-300 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-blue-400 rounded-full" />
                  Cap: {asset.marketCap}
                </div>
                <div className={`font-semibold flex items-center gap-1 ${
                  asset.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  <span className={`inline-block w-2 h-2 rounded-full ${
                    asset.changePercent >= 0 ? 'bg-green-400' : 'bg-red-400'
                  }`} />
                  {asset.changePercent >= 0 ? '+' : ''}{asset.changePercent.toFixed(2)}%
                </div>
                {/* Tooltip arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/95" />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        className="mt-6 text-xs text-gray-400 text-center flex items-center justify-center gap-2 p-3 bg-white/5 rounded-lg border border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div 
          className="w-2 h-2 bg-green-400 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span>Live market data • Updates every 30 seconds</span>
      </motion.div>
    </Card>
  );
}