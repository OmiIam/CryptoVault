'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Search } from 'lucide-react';
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
  marketCap: string;
  volume: number;
}

export default function MarketPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssets();
    const interval = setInterval(fetchAssets, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const filtered = assets.filter(asset =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.ticker.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAssets(filtered);
  }, [assets, searchTerm]);

  const fetchAssets = async () => {
    try {
      const response = await api.getAssets();
      if (response.data && Array.isArray(response.data)) {
        setAssets(response.data as Asset[]);
      }
    } catch (error) {
      console.error('Error fetching assets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTrade = (asset: Asset) => {
    localStorage.setItem('selectedAsset', JSON.stringify(asset));
    window.location.href = '/trade';
  };

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
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">Market</h1>
            <p className="text-gray-300">Live market data and trading opportunities</p>
          </div>

          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 sm:w-64"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Asset</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-300">Price</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-300">24h Change</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-300">Market Cap</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-300">Volume</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-300">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredAssets.map((asset, index) => (
                    <motion.tr
                      key={asset.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-white">{asset.ticker}</div>
                          <div className="text-sm text-gray-400">{asset.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="font-medium text-white">
                          ${asset.price.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className={`flex items-center justify-end ${
                          asset.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {asset.changePercent >= 0 ? (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          )}
                          <span>
                            {asset.changePercent >= 0 ? '+' : ''}{asset.changePercent.toFixed(2)}%
                          </span>
                        </div>
                        <div className={`text-sm ${
                          asset.change >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {asset.change >= 0 ? '+' : ''}${asset.change.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="text-white">{asset.marketCap}</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="text-white">
                          {asset.volume?.toLocaleString() || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Button
                          size="sm"
                          onClick={() => handleTrade(asset)}
                        >
                          Trade
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredAssets.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No assets found matching your search.</p>
              </div>
            )}
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-gray-400"
        >
          <p>Market data updates every 10 seconds • Prices are simulated for educational purposes</p>
        </motion.div>
      </div>
    </Layout>
  );
}