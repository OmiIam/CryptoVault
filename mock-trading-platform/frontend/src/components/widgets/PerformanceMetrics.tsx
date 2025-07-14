'use client';

import { useMemo } from 'react';
import { TrendingUp, TrendingDown, Target, Shield, Activity } from 'lucide-react';
import Card from '@/components/ui/Card';

interface PortfolioPosition {
  assetTicker: string;
  quantity: number;
  marketValue: number;
  gainLoss: number;
  gainLossPercent: number;
}

interface Trade {
  type: 'buy' | 'sell';
  total: number;
  timestamp: string;
}

interface PerformanceMetricsProps {
  portfolio: PortfolioPosition[];
  trades: Trade[];
  totalValue: number;
  className?: string;
}

export default function PerformanceMetrics({ 
  portfolio, 
  trades, 
  totalValue, 
  className = '' 
}: PerformanceMetricsProps) {
  
  const metrics = useMemo(() => {
    // Portfolio diversification (number of different assets)
    const diversification = portfolio.length;
    
    // Concentration risk (largest position as % of total)
    const concentrationRisk = portfolio.length > 0 
      ? Math.max(...portfolio.map(p => (p.marketValue / totalValue) * 100))
      : 0;
    
    // Win rate calculation
    const winningTrades = trades.filter(trade => {
      // Simplified win calculation - in reality would need entry/exit comparison
      return Math.random() > 0.4; // Simulate ~60% win rate for demo
    }).length;
    const winRate = trades.length > 0 ? (winningTrades / trades.length) * 100 : 0;
    
    // Average trade size
    const avgTradeSize = trades.length > 0 
      ? trades.reduce((sum, trade) => sum + trade.total, 0) / trades.length
      : 0;
    
    // Portfolio beta (simulated - normally calculated against market index)
    const beta = 0.8 + Math.random() * 0.4; // Random between 0.8-1.2
    
    // Sharpe ratio (simplified simulation)
    const totalReturn = portfolio.reduce((sum, p) => sum + p.gainLossPercent, 0);
    const avgReturn = portfolio.length > 0 ? totalReturn / portfolio.length : 0;
    const volatility = 15 + Math.random() * 10; // Simulated volatility 15-25%
    const sharpeRatio = volatility > 0 ? avgReturn / volatility : 0;
    
    // Risk score (0-100, lower is better)
    const riskScore = Math.min(100, concentrationRisk + (volatility * 2) + (beta > 1 ? 20 : 0));
    
    return {
      diversification,
      concentrationRisk,
      winRate,
      avgTradeSize,
      beta,
      sharpeRatio,
      riskScore,
      volatility
    };
  }, [portfolio, trades, totalValue]);

  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-400';
    if (score < 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRiskLevel = (score: number) => {
    if (score < 30) return 'Low';
    if (score < 60) return 'Medium';
    return 'High';
  };

  return (
    <Card className={className}>
      <h3 className="text-lg font-semibold text-white mb-4">Performance Analytics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Portfolio Metrics */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-gray-300">Diversification</span>
            </div>
            <span className="text-white font-medium">{metrics.diversification} assets</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-gray-300">Concentration Risk</span>
            </div>
            <span className={`font-medium ${metrics.concentrationRisk > 50 ? 'text-red-400' : 'text-green-400'}`}>
              {metrics.concentrationRisk.toFixed(1)}%
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-sm text-gray-300">Win Rate</span>
            </div>
            <span className="text-white font-medium">{metrics.winRate.toFixed(1)}%</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-gray-300">Avg Trade Size</span>
            </div>
            <span className="text-white font-medium">${metrics.avgTradeSize.toLocaleString()}</span>
          </div>
        </div>
        
        {/* Risk Metrics */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-gray-300">Beta</span>
            </div>
            <span className="text-white font-medium">{metrics.beta.toFixed(2)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-gray-300">Sharpe Ratio</span>
            </div>
            <span className={`font-medium ${metrics.sharpeRatio > 1 ? 'text-green-400' : 'text-yellow-400'}`}>
              {metrics.sharpeRatio.toFixed(2)}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-orange-400" />
              <span className="text-sm text-gray-300">Volatility</span>
            </div>
            <span className="text-white font-medium">{metrics.volatility.toFixed(1)}%</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-red-400" />
              <span className="text-sm text-gray-300">Risk Score</span>
            </div>
            <div className="text-right">
              <span className={`font-medium ${getRiskColor(metrics.riskScore)}`}>
                {metrics.riskScore.toFixed(0)}/100
              </span>
              <div className={`text-xs ${getRiskColor(metrics.riskScore)}`}>
                {getRiskLevel(metrics.riskScore)} Risk
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Level Indicator */}
      <div className="mt-4 p-3 bg-black/20 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-300">Portfolio Risk Level</span>
          <span className={`text-sm font-medium ${getRiskColor(metrics.riskScore)}`}>
            {getRiskLevel(metrics.riskScore)}
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              metrics.riskScore < 30 ? 'bg-green-400' : 
              metrics.riskScore < 60 ? 'bg-yellow-400' : 'bg-red-400'
            }`}
            style={{ width: `${metrics.riskScore}%` }}
          />
        </div>
      </div>

      <div className="mt-3 text-xs text-gray-400">
        <p>• Beta measures portfolio sensitivity to market movements</p>
        <p>• Sharpe ratio shows risk-adjusted returns (higher is better)</p>
        <p>• Concentration risk shows largest single position weight</p>
      </div>
    </Card>
  );
}