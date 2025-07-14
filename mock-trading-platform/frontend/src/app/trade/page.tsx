'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Layout from '@/components/Layout';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { api } from '@/lib/api';

interface Asset {
  id: number;
  name: string;
  ticker: string;
  price: number;
  change: number;
  changePercent: number;
}

export default function TradePage() {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState('');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const assetData = localStorage.getItem('selectedAsset');
    if (assetData) {
      setSelectedAsset(JSON.parse(assetData));
    }
  }, []);

  const calculateTotal = () => {
    if (!selectedAsset || !quantity) return 0;
    return parseFloat(quantity) * selectedAsset.price;
  };

  const handleTrade = async () => {
    if (!selectedAsset || !quantity || !user) return;

    setLoading(true);
    setMessage('');

    try {
      const response = await api.executeTrade(
        selectedAsset.id,
        tradeType,
        parseFloat(quantity),
        selectedAsset.price
      );

      if (response.error) {
        setMessage(response.error);
        setMessageType('error');
      } else {
        setMessage(`${tradeType.toUpperCase()} order executed successfully!`);
        setMessageType('success');
        setQuantity('');
        
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);
      }
    } catch (error) {
      setMessage('An unexpected error occurred');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  if (!selectedAsset) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-white mb-4">No Asset Selected</h1>
          <p className="text-gray-400 mb-6">Please select an asset from the market page to start trading.</p>
          <Button onClick={() => window.location.href = '/market'}>
            Go to Market
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">Trade</h1>
          <p className="text-gray-300">Execute your trading strategy</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <h2 className="text-xl font-bold text-white mb-4">Asset Information</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{selectedAsset.ticker}</h3>
                    <p className="text-gray-400">{selectedAsset.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">
                      ${selectedAsset.price.toLocaleString()}
                    </p>
                    <div className={`flex items-center justify-end ${
                      selectedAsset.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {selectedAsset.changePercent >= 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      <span>
                        {selectedAsset.changePercent >= 0 ? '+' : ''}{selectedAsset.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div>
                    <p className="text-sm text-gray-400">Your Balance</p>
                    <p className="text-lg font-semibold text-white">
                      ${user?.balance?.toLocaleString() || '0'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Buying Power</p>
                    <p className="text-lg font-semibold text-white">
                      {selectedAsset.price > 0 ? Math.floor((user?.balance || 0) / selectedAsset.price) : 0} shares
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <h2 className="text-xl font-bold text-white mb-4">Place Order</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Order Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setTradeType('buy')}
                      className={`p-3 rounded-lg border transition-all ${
                        tradeType === 'buy'
                          ? 'bg-green-500/20 border-green-500/50 text-green-400'
                          : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      Buy
                    </button>
                    <button
                      onClick={() => setTradeType('sell')}
                      className={`p-3 rounded-lg border transition-all ${
                        tradeType === 'sell'
                          ? 'bg-red-500/20 border-red-500/50 text-red-400'
                          : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      Sell
                    </button>
                  </div>
                </div>

                <Input
                  label="Quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter number of shares"
                  min="0.01"
                  step="0.01"
                />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Share Price:</span>
                    <span className="text-white">${selectedAsset.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Quantity:</span>
                    <span className="text-white">{quantity || 0} shares</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t border-white/10 pt-2">
                    <span className="text-gray-200">Total:</span>
                    <span className="text-white">${calculateTotal().toLocaleString()}</span>
                  </div>
                </div>

                {message && (
                  <div className={`p-3 rounded-lg ${
                    messageType === 'success' 
                      ? 'bg-green-500/20 border border-green-500/30 text-green-200'
                      : 'bg-red-500/20 border border-red-500/30 text-red-200'
                  }`}>
                    {message}
                  </div>
                )}

                <Button
                  onClick={handleTrade}
                  loading={loading}
                  disabled={!quantity || parseFloat(quantity) <= 0}
                  className="w-full"
                  variant={tradeType === 'buy' ? 'primary' : 'danger'}
                  size="lg"
                >
                  {tradeType === 'buy' ? 'Buy' : 'Sell'} {selectedAsset.ticker}
                </Button>

                <div className="text-xs text-gray-400 text-center">
                  This is a simulated trading environment for educational purposes only.
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}