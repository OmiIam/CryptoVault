'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, Calendar } from 'lucide-react';
import Layout from '@/components/Layout';
import Card from '@/components/ui/Card';
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

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const [portfolioRes, tradesRes] = await Promise.all([
        api.getPortfolio(),
        api.getTrades()
      ]);

      if (portfolioRes.data && Array.isArray(portfolioRes.data)) {
        setPortfolio(portfolioRes.data as PortfolioItem[]);
      }

      if (tradesRes.data && Array.isArray(tradesRes.data)) {
        setTrades(tradesRes.data as any[]);
      }
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalValue = () => {
    return portfolio.reduce((total, item) => total + item.marketValue, 0);
  };

  const calculateTotalGainLoss = () => {
    return portfolio.reduce((total, item) => total + item.gainLoss, 0);
  };

  const totalValue = calculateTotalValue();
  const totalGainLoss = calculateTotalGainLoss();

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">Portfolio</h1>
          <p className="text-gray-300">Track your investments and performance</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card>
            <div className="flex items-center">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Activity className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-400">Portfolio Value</p>
                <p className="text-2xl font-bold text-white">
                  ${totalValue.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${totalGainLoss >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                {totalGainLoss >= 0 ? (
                  <TrendingUp className="h-6 w-6 text-green-400" />
                ) : (
                  <TrendingDown className="h-6 w-6 text-red-400" />
                )}
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-400">Total P&L</p>
                <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {totalGainLoss >= 0 ? '+' : ''}${totalGainLoss.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-400">Total Positions</p>
                <p className="text-2xl font-bold text-white">
                  {portfolio.length}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <h2 className="text-xl font-bold text-white mb-4">Current Holdings</h2>
              <div className="space-y-3">
                {portfolio.length > 0 ? (
                  portfolio.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-white/5 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-white">{item.assetTicker}</h3>
                          <p className="text-sm text-gray-400">{item.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-white">${item.currentPrice.toLocaleString()}</p>
                          <p className={`text-sm ${item.gainLossPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {item.gainLossPercent >= 0 ? '+' : ''}{item.gainLossPercent.toFixed(2)}%
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Quantity</p>
                          <p className="text-white">{item.quantity} shares</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Avg Price</p>
                          <p className="text-white">${item.averagePrice.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Market Value</p>
                          <p className="text-white">${item.marketValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">P&L</p>
                          <p className={`${item.gainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {item.gainLoss >= 0 ? '+' : ''}${item.gainLoss.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">No positions yet</p>
                    <p className="text-sm text-gray-500">Start trading to build your portfolio!</p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <h2 className="text-xl font-bold text-white mb-4">Trade History</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {trades.length > 0 ? (
                  trades.map((trade, index) => (
                    <motion.div
                      key={trade.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-3 bg-white/5 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-3 ${
                            trade.type === 'buy' ? 'bg-green-400' : 'bg-red-400'
                          }`} />
                          <div>
                            <p className="font-medium text-white">{trade.assetTicker}</p>
                            <p className="text-sm text-gray-400">
                              {trade.type.toUpperCase()} {trade.quantity} @ ${trade.price}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-white">${trade.total.toLocaleString()}</p>
                          <p className="text-sm text-gray-400">
                            {new Date(trade.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">No trades yet</p>
                    <p className="text-sm text-gray-500">Your trading history will appear here</p>
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