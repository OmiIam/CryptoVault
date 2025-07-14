'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Activity, Eye, BarChart3, PieChart } from 'lucide-react';
import Layout from '@/components/Layout';
import Card from '@/components/ui/Card';
import PortfolioChart from '@/components/charts/PortfolioChart';
import AssetAllocationChart from '@/components/charts/AssetAllocationChart';
import MarketHeatmap from '@/components/charts/MarketHeatmap';
import PerformanceMetrics from '@/components/widgets/PerformanceMetrics';
import LiveTicker from '@/components/widgets/LiveTicker';
import { api } from '@/lib/api';

interface PortfolioItem {
  id: number;
  assetTicker: string;
  name: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  marketValue: number;
  gainLoss: number;
  gainLossPercent: number;
}

interface Trade {
  id: number;
  assetTicker: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  total: number;
  timestamp: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<{ username: string; balance: number; isAdmin?: boolean } | null>(null);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [recentTrades, setRecentTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [portfolioRes, tradesRes] = await Promise.all([
        api.getPortfolio(),
        api.getTrades()
      ]);

      if (portfolioRes.data && Array.isArray(portfolioRes.data)) {
        setPortfolio(portfolioRes.data as PortfolioItem[]);
      }

      if (tradesRes.data && Array.isArray(tradesRes.data)) {
        setRecentTrades(tradesRes.data.slice(0, 5) as Trade[]);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculatePortfolioValue = () => {
    return portfolio.reduce((total, item) => total + item.marketValue, 0);
  };

  const calculateTotalGainLoss = () => {
    return portfolio.reduce((total, item) => total + item.gainLoss, 0);
  };

  const portfolioValue = calculatePortfolioValue();
  const totalGainLoss = calculateTotalGainLoss();
  const totalValue = (user?.balance || 0) + portfolioValue;

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Live Market Ticker */}
        <LiveTicker />

        {/* Header Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card variant="premium" hover={true} className="group">
            <div className="flex items-center">
              <motion.div 
                className="p-3 bg-green-500/20 rounded-xl relative overflow-hidden"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <DollarSign className="h-8 w-8 text-green-400 relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-green-400/20"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <div className="ml-4">
                <p className="text-sm text-gray-400 font-medium group-hover:text-gray-300 transition-colors">Total Portfolio Value</p>
                <motion.p 
                  className="text-3xl font-bold text-white group-hover:text-green-300 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  ${totalValue.toLocaleString()}
                </motion.p>
                <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-400 transition-colors">Cash + Investments</p>
              </div>
            </div>
          </Card>

          <Card variant="glow" hover={true} className="group">
            <div className="flex items-center">
              <motion.div 
                className="p-3 bg-blue-500/20 rounded-xl relative overflow-hidden"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Activity className="h-8 w-8 text-blue-400 relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-blue-400/20"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <div className="ml-4">
                <p className="text-sm text-gray-400 font-medium group-hover:text-gray-300 transition-colors">Available Cash</p>
                <motion.p 
                  className="text-3xl font-bold text-white group-hover:text-blue-300 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  ${user?.balance?.toLocaleString() || '0'}
                </motion.p>
                <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-400 transition-colors">Ready to invest</p>
              </div>
            </div>
          </Card>

          <Card variant="premium" hover={true} className="group">
            <div className="flex items-center">
              <motion.div 
                className="p-3 bg-purple-500/20 rounded-xl relative overflow-hidden"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <PieChart className="h-8 w-8 text-purple-400 relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-purple-400/20"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <div className="ml-4">
                <p className="text-sm text-gray-400 font-medium group-hover:text-gray-300 transition-colors">Invested Value</p>
                <motion.p 
                  className="text-3xl font-bold text-white group-hover:text-purple-300 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  ${portfolioValue.toLocaleString()}
                </motion.p>
                <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-400 transition-colors">{portfolio.length} positions</p>
              </div>
            </div>
          </Card>

          <Card variant="glow" hover={true} className="group">
            <div className="flex items-center">
              <motion.div 
                className={`p-3 rounded-xl relative overflow-hidden ${
                  totalGainLoss >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: totalGainLoss >= 0 ? 10 : -10 
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {totalGainLoss >= 0 ? (
                  <TrendingUp className="h-8 w-8 text-green-400 relative z-10" />
                ) : (
                  <TrendingDown className="h-8 w-8 text-red-400 relative z-10" />
                )}
                <motion.div
                  className={`absolute inset-0 ${
                    totalGainLoss >= 0 ? 'bg-green-400/20' : 'bg-red-400/20'
                  }`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <div className="ml-4">
                <p className="text-sm text-gray-400 font-medium group-hover:text-gray-300 transition-colors">Total P&L</p>
                <motion.p 
                  className={`text-3xl font-bold ${totalGainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}
                  whileHover={{ scale: 1.05 }}
                >
                  {totalGainLoss >= 0 ? '+' : ''}${totalGainLoss.toLocaleString()}
                </motion.p>
                <p className={`text-xs mt-1 group-hover:opacity-80 transition-opacity ${
                  totalGainLoss >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {totalGainLoss >= 0 ? '+' : ''}{((totalGainLoss / (totalValue - totalGainLoss)) * 100).toFixed(2)}%
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Charts */}
          <div className="xl:col-span-2 space-y-6">
            {/* Portfolio Performance Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <PortfolioChart currentValue={totalValue} />
            </motion.div>

            {/* Market Heatmap */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <MarketHeatmap />
            </motion.div>
          </div>

          {/* Right Column - Portfolio Details */}
          <div className="space-y-6">
            {/* Asset Allocation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <AssetAllocationChart portfolio={portfolio} />
            </motion.div>

            {/* Performance Metrics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <PerformanceMetrics 
                portfolio={portfolio}
                trades={recentTrades}
                totalValue={totalValue}
              />
            </motion.div>
          </div>
        </div>

        {/* Bottom Section - Holdings & Trades */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Current Holdings</h2>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Eye className="h-4 w-4" />
                  <span>{portfolio.length} positions</span>
                </div>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {portfolio.length > 0 ? (
                  portfolio.map((item) => (
                    <motion.div 
                      key={item.id} 
                      whileHover={{ 
                        scale: 1.02, 
                        y: -2,
                        transition: { type: "spring", stiffness: 400, damping: 25 }
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="group flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer border border-transparent hover:border-white/20 hover:shadow-xl"
                    >
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center relative overflow-hidden"
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <span className="text-white font-bold text-sm relative z-10">{item.assetTicker.charAt(0)}</span>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.div>
                        <div>
                          <motion.p 
                            className="font-semibold text-white group-hover:text-blue-300 transition-colors"
                            whileHover={{ x: 2 }}
                          >
                            {item.assetTicker}
                          </motion.p>
                          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                            {item.quantity} shares • Avg ${item.averagePrice.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <motion.p 
                          className="font-semibold text-white"
                          whileHover={{ scale: 1.05 }}
                        >
                          ${item.marketValue.toLocaleString()}
                        </motion.p>
                        <motion.p 
                          className={`text-sm font-medium flex items-center justify-end gap-1 ${
                            item.gainLoss >= 0 ? 'text-green-400' : 'text-red-400'
                          }`}
                          whileHover={{ scale: 1.05 }}
                        >
                          <span className={`inline-block w-2 h-2 rounded-full ${
                            item.gainLoss >= 0 ? 'bg-green-400' : 'bg-red-400'
                          }`} />
                          {item.gainLoss >= 0 ? '+' : ''}${item.gainLoss.toFixed(2)} ({item.gainLossPercent.toFixed(2)}%)
                        </motion.p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <BarChart3 className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 font-medium">No holdings yet</p>
                    <p className="text-gray-500 text-sm mt-1">Start trading to build your portfolio!</p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Activity className="h-4 w-4" />
                  <span>Last {recentTrades.length} trades</span>
                </div>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {recentTrades.length > 0 ? (
                  recentTrades.map((trade) => (
                    <motion.div 
                      key={trade.id} 
                      whileHover={{ 
                        scale: 1.02, 
                        y: -2,
                        transition: { type: "spring", stiffness: 400, damping: 25 }
                      }}
                      className="group flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer border border-transparent hover:border-white/20"
                    >
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className={`w-10 h-10 rounded-lg flex items-center justify-center relative overflow-hidden ${
                            trade.type === 'buy' ? 'bg-green-500/20' : 'bg-red-500/20'
                          }`}
                          whileHover={{ 
                            scale: 1.1, 
                            rotate: trade.type === 'buy' ? 5 : -5,
                            transition: { type: "spring", stiffness: 300 }
                          }}
                        >
                          <span className={`font-bold text-sm relative z-10 ${
                            trade.type === 'buy' ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {trade.type === 'buy' ? 'B' : 'S'}
                          </span>
                          <motion.div
                            className={`absolute inset-0 ${
                              trade.type === 'buy' ? 'bg-green-400/20' : 'bg-red-400/20'
                            }`}
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.div>
                        <div>
                          <motion.p 
                            className="font-semibold text-white group-hover:text-blue-300 transition-colors"
                            whileHover={{ x: 2 }}
                          >
                            {trade.assetTicker}
                          </motion.p>
                          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                            {trade.type.toUpperCase()} {trade.quantity} @ ${trade.price}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <motion.p 
                          className="font-semibold text-white"
                          whileHover={{ scale: 1.05 }}
                        >
                          ${trade.total.toLocaleString()}
                        </motion.p>
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                          {new Date(trade.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Activity className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 font-medium">No trades yet</p>
                    <p className="text-gray-500 text-sm mt-1">Make your first trade to get started!</p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}