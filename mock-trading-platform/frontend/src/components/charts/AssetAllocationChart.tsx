'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';

interface AllocationData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

interface AssetAllocationChartProps {
  portfolio: {
    assetTicker: string;
    marketValue: number;
  }[];
  className?: string;
}

const COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Yellow
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#F97316', // Orange
  '#06B6D4', // Cyan
  '#84CC16', // Lime
  '#EC4899', // Pink
  '#6B7280', // Gray
];

export default function AssetAllocationChart({ portfolio, className = '' }: AssetAllocationChartProps) {
  const totalValue = portfolio.reduce((sum, item) => sum + item.marketValue, 0);

  const allocationData: AllocationData[] = portfolio.map((item, index) => ({
    name: item.assetTicker,
    value: item.marketValue,
    percentage: (item.marketValue / totalValue) * 100,
    color: COLORS[index % COLORS.length]
  })).sort((a, b) => b.value - a.value);

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
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
            className="text-white font-bold text-lg flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <span 
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: data.color }}
            />
            {data.name}
          </motion.p>
          <motion.p 
            className="text-gray-300 font-semibold"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            ${data.value.toLocaleString()}
          </motion.p>
          <motion.p 
            className="text-blue-400 font-medium flex items-center gap-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-block w-2 h-2 bg-blue-400 rounded-full" />
            {data.percentage.toFixed(1)}% of portfolio
          </motion.p>
        </motion.div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }: any) => {
    if (percentage < 5) return null; // Don't show labels for small slices
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="500"
      >
        {`${percentage.toFixed(0)}%`}
      </text>
    );
  };


  if (portfolio.length === 0) {
    return (
      <Card className={className}>
        <h3 className="text-lg font-semibold text-white mb-4">Asset Allocation</h3>
        <div className="flex items-center justify-center h-64 text-gray-400">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-700 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-500" />
            </div>
            <p>No assets in portfolio</p>
            <p className="text-sm mt-1">Start trading to see allocation</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Asset Allocation</h3>
        <div className="text-right">
          <p className="text-sm text-gray-400">Total Value</p>
          <p className="text-lg font-semibold text-white">${totalValue.toLocaleString()}</p>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={allocationData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={CustomLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {allocationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3 mt-6">
        {allocationData.slice(0, 5).map((item, index) => (
          <motion.div 
            key={index} 
            className="group flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-white/20"
            whileHover={{ scale: 1.02, x: 2 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3">
              <motion.div 
                className="w-4 h-4 rounded-full relative overflow-hidden"
                style={{ backgroundColor: item.color }}
                whileHover={{ scale: 1.2, rotate: 180 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <motion.span 
                className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors"
                whileHover={{ x: 2 }}
              >
                {item.name}
              </motion.span>
            </div>
            <div className="text-right">
              <motion.p 
                className="text-sm font-bold text-white"
                whileHover={{ scale: 1.05 }}
              >
                {item.percentage.toFixed(1)}%
              </motion.p>
              <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                ${item.value.toLocaleString()}
              </p>
            </div>
          </motion.div>
        ))}
        {allocationData.length > 5 && (
          <motion.div 
            className="text-xs text-gray-400 text-center pt-3 px-3 py-2 bg-white/5 rounded-lg border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          >
            <span className="inline-flex items-center gap-1">
              <span className="inline-block w-1 h-1 bg-gray-400 rounded-full" />
              +{allocationData.length - 5} more assets
            </span>
          </motion.div>
        )}
      </div>
    </Card>
  );
}