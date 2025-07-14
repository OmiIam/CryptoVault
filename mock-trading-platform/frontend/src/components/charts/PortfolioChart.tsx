'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subDays } from 'date-fns';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface PortfolioDataPoint {
  date: string;
  value: number;
  change: number;
  changePercent: number;
}

interface PortfolioChartProps {
  currentValue: number;
  className?: string;
}

const timeRanges = [
  { label: '1D', value: '1D', days: 1 },
  { label: '7D', value: '7D', days: 7 },
  { label: '1M', value: '1M', days: 30 },
  { label: '3M', value: '3M', days: 90 },
  { label: '1Y', value: '1Y', days: 365 },
];

export default function PortfolioChart({ currentValue, className = '' }: PortfolioChartProps) {
  const [selectedRange, setSelectedRange] = useState('7D');

  const generateChartData = (days: number): PortfolioDataPoint[] => {
    const data: PortfolioDataPoint[] = [];
    const baseValue = currentValue;
    
    for (let i = days; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const volatility = 0.02;
      const trend = Math.random() > 0.5 ? 0.001 : -0.001;
      const randomChange = (Math.random() - 0.5) * volatility + trend;
      const value = baseValue * (1 + randomChange * (i / days));
      const change = i === 0 ? 0 : value - baseValue;
      const changePercent = i === 0 ? 0 : (change / baseValue) * 100;
      
      data.push({
        date: format(date, days <= 7 ? 'MMM dd HH:mm' : 'MMM dd'),
        value: Math.max(value, baseValue * 0.8),
        change,
        changePercent
      });
    }
    
    return data.reverse();
  };

  const selectedRangeData = timeRanges.find(r => r.value === selectedRange);
  const chartData = generateChartData(selectedRangeData?.days || 7);
  const totalChange = chartData[chartData.length - 1]?.changePercent || 0;
  const isPositive = totalChange >= 0;

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="bg-black/95 backdrop-blur-xl border border-white/30 rounded-xl p-4 shadow-2xl"
          style={{
            backdropFilter: 'blur(20px) saturate(200%)',
            WebkitBackdropFilter: 'blur(20px) saturate(200%)',
          }}
        >
          <motion.p 
            className="text-gray-300 text-sm mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {label}
          </motion.p>
          <motion.p 
            className="text-white font-bold text-lg"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            ${data.value.toLocaleString()}
          </motion.p>
          <motion.p 
            className={`text-sm font-medium flex items-center gap-1 ${
              data.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
            }`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className={`inline-block w-2 h-2 rounded-full ${
              data.changePercent >= 0 ? 'bg-green-400' : 'bg-red-400'
            }`} />
            {data.changePercent >= 0 ? '+' : ''}{data.changePercent.toFixed(2)}%
          </motion.p>
        </motion.div>
      );
    }
    return null;
  };

  return (
    <Card className={`${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Portfolio Performance</h3>
          <div className="flex items-center mt-1">
            <span className="text-2xl font-bold text-white">
              ${currentValue.toLocaleString()}
            </span>
            <span className={`ml-3 text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{totalChange.toFixed(2)}%
            </span>
          </div>
        </div>
        
        <div className="flex gap-1">
          {timeRanges.map((range) => (
            <Button
              key={range.value}
              size="sm"
              variant={selectedRange === range.value ? 'primary' : 'ghost'}
              onClick={() => setSelectedRange(range.value)}
              className="px-3 py-1 text-xs"
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke={isPositive ? '#10B981' : '#EF4444'}
              strokeWidth={3}
              dot={false}
              activeDot={{ 
                r: 6, 
                fill: isPositive ? '#10B981' : '#EF4444',
                stroke: '#ffffff',
                strokeWidth: 2,
                filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))'
              }}
              style={{
                filter: `drop-shadow(0 0 4px ${isPositive ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'})`
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}