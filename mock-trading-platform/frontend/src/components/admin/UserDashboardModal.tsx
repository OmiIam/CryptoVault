'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, TrendingDown, DollarSign, Activity, Eye } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import PortfolioChart from '@/components/charts/PortfolioChart';
import AssetAllocationChart from '@/components/charts/AssetAllocationChart';
import { api } from '@/lib/api';

interface UserDashboardModalProps {
  userId: number;
  username: string;
  isOpen: boolean;
  onClose: () => void;
}

interface UserDashboardData {
  user: {
    id: number;
    username: string;
    email: string;
    balance: number;
  };
  portfolio: Array<{
    assetTicker: string;
    name: string;
    quantity: number;
    averagePrice: number;
    currentPrice: number;
    marketValue: number;
    gainLoss: number;
    gainLossPercent: number;
  }>;
  trades: Array<{
    id: number;
    assetTicker: string;
    type: 'buy' | 'sell';
    quantity: number;
    price: number;
    total: number;
    timestamp: string;
  }>;
}

export default function UserDashboardModal({ userId, username, isOpen, onClose }: UserDashboardModalProps) {
  const [dashboardData, setDashboardData] = useState<UserDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && userId) {
      fetchUserDashboard();
    }
  }, [isOpen, userId]);

  const fetchUserDashboard = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.getUserDashboard(userId);
      if (response.data) {
        setDashboardData(response.data);
      } else {
        setError(response.error || 'Failed to fetch user dashboard');
      }
    } catch (err) {
      setError('Error loading user dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const portfolioValue = dashboardData?.portfolio.reduce((sum, item) => sum + item.marketValue, 0) || 0;
  const totalGainLoss = dashboardData?.portfolio.reduce((sum, item) => sum + item.gainLoss, 0) || 0;
  const totalValue = (dashboardData?.user.balance || 0) + portfolioValue;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl border border-white/20 w-full max-w-7xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Eye className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{username}'s Dashboard</h2>
                <p className="text-sm text-gray-400">Live portfolio view</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-400 mb-4">{error}</p>
                <Button onClick={fetchUserDashboard} size="sm">
                  Retry
                </Button>
              </div>
            ) : dashboardData ? (
              <div className="space-y-6">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card hover={false}>
                    <div className="flex items-center">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <DollarSign className="h-6 w-6 text-green-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-400">Total Value</p>
                        <p className="text-lg font-bold text-white">
                          ${totalValue.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card hover={false}>
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Activity className="h-6 w-6 text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-400">Cash</p>
                        <p className="text-lg font-bold text-white">
                          ${dashboardData.user.balance.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card hover={false}>
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Activity className="h-6 w-6 text-purple-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-400">Invested</p>
                        <p className="text-lg font-bold text-white">
                          ${portfolioValue.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card hover={false}>
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg ${totalGainLoss >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                        {totalGainLoss >= 0 ? (
                          <TrendingUp className="h-6 w-6 text-green-400" />
                        ) : (
                          <TrendingDown className="h-6 w-6 text-red-400" />
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-400">P&L</p>
                        <p className={`text-lg font-bold ${totalGainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {totalGainLoss >= 0 ? '+' : ''}${totalGainLoss.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <PortfolioChart currentValue={totalValue} className="lg:col-span-1" />
                  <AssetAllocationChart portfolio={dashboardData.portfolio} />
                </div>

                {/* Holdings & Trades */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Holdings */}
                  <Card>
                    <h3 className="text-lg font-semibold text-white mb-4">Holdings</h3>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {dashboardData.portfolio.length > 0 ? (
                        dashboardData.portfolio.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                            <div>
                              <p className="font-medium text-white">{item.assetTicker}</p>
                              <p className="text-sm text-gray-400">{item.quantity} shares</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-white">${item.marketValue.toLocaleString()}</p>
                              <p className={`text-sm ${item.gainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {item.gainLoss >= 0 ? '+' : ''}${item.gainLoss.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400 text-center py-8">No holdings</p>
                      )}
                    </div>
                  </Card>

                  {/* Recent Trades */}
                  <Card>
                    <h3 className="text-lg font-semibold text-white mb-4">Recent Trades</h3>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {dashboardData.trades.length > 0 ? (
                        dashboardData.trades.slice(0, 5).map((trade) => (
                          <div key={trade.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                            <div>
                              <p className="font-medium text-white">{trade.assetTicker}</p>
                              <p className="text-sm text-gray-400">
                                {trade.type.toUpperCase()} {trade.quantity} @ ${trade.price}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-white">${trade.total.toLocaleString()}</p>
                              <p className="text-sm text-gray-400">
                                {new Date(trade.timestamp).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400 text-center py-8">No trades</p>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}