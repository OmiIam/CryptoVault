'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, TrendingDown, Medal, Award, Star } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { api } from '@/lib/api';

interface LeaderboardUser {
  id: number;
  username: string;
  email: string;
  balance: number;
  portfolioValue: number;
  totalGainLoss: number;
  totalValue: number;
  returnPercent: number;
}

interface LeaderboardProps {
  onViewUser: (userId: number, username: string) => void;
  className?: string;
}

export default function Leaderboard({ onViewUser, className = '' }: LeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'totalValue' | 'returnPercent'>('totalValue');

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await api.getLeaderboard();
      if (response.data && Array.isArray(response.data)) {
        setLeaderboard(response.data as LeaderboardUser[]);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortedLeaderboard = [...leaderboard].sort((a, b) => {
    if (sortBy === 'totalValue') {
      return b.totalValue - a.totalValue;
    } else {
      return b.returnPercent - a.returnPercent;
    }
  });

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-400" />;
      case 1:
        return <Medal className="h-5 w-5 text-gray-300" />;
      case 2:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <Star className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
      case 1:
        return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30';
      case 2:
        return 'bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/30';
      default:
        return 'bg-white/5 border-white/10';
    }
  };

  if (loading) {
    return (
      <Card className={className}>
        <h3 className="text-lg font-semibold text-white mb-4">Performance Leaderboard</h3>
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Performance Leaderboard</h3>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={sortBy === 'totalValue' ? 'primary' : 'ghost'}
            onClick={() => setSortBy('totalValue')}
            className="text-xs"
          >
            By Value
          </Button>
          <Button
            size="sm"
            variant={sortBy === 'returnPercent' ? 'primary' : 'ghost'}
            onClick={() => setSortBy('returnPercent')}
            className="text-xs"
          >
            By Returns
          </Button>
        </div>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {sortedLeaderboard.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`
              flex items-center justify-between p-4 rounded-xl border transition-all duration-200 
              hover:scale-[1.02] cursor-pointer ${getRankColor(index)}
            `}
            onClick={() => onViewUser(user.id, user.username)}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8">
                {getRankIcon(index)}
              </div>
              <div>
                <p className="font-semibold text-white">{user.username}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="font-semibold text-white">
                    ${user.totalValue.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-1">
                    {user.returnPercent >= 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-400" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-400" />
                    )}
                    <span className={`text-xs font-medium ${
                      user.returnPercent >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {user.returnPercent >= 0 ? '+' : ''}{user.returnPercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {sortedLeaderboard.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No users found
          </div>
        )}
      </div>

      <div className="mt-4 text-xs text-gray-400 text-center">
        Click on any user to view their dashboard • Updates every 30 seconds
      </div>
    </Card>
  );
}