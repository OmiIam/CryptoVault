'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricData {
  icon: LucideIcon;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  color: string;
}

interface MetricCardProps {
  metric: MetricData;
  index: number;
  isInView: boolean;
}

export default function MetricCard({ metric, index, isInView }: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        // Simple counting animation
        let current = 0;
        const increment = metric.value / 50; // 50 steps
        const interval = setInterval(() => {
          current += increment;
          if (current >= metric.value) {
            current = metric.value;
            clearInterval(interval);
          }
          setDisplayValue(current);
        }, 30);
        
        return () => clearInterval(interval);
      }, 800 + index * 200);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, metric.value, index]);

  const formatValue = (value: number) => {
    if (metric.value < 100) {
      return value.toFixed(1);
    }
    return Math.floor(value).toLocaleString();
  };

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: 1.0 + index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ y: -4, scale: 1.02 }}
    >
      <div className="relative p-6 lg:p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-black/25">
        
        {/* Background glow effect */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${metric.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
        
        {/* Icon container */}
        <motion.div
          className="flex items-center justify-center mb-4 lg:mb-6"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`p-4 rounded-2xl bg-gradient-to-r ${metric.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
            <metric.icon className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
          </div>
        </motion.div>
        
        {/* Value */}
        <motion.div
          className="text-center mb-2"
          initial={{ scale: 0.8 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
        >
          <div className="text-2xl lg:text-4xl font-black text-white mb-1 font-mono tracking-tight">
            {metric.prefix && <span className="text-slate-300">{metric.prefix}</span>}
            <span>{formatValue(displayValue)}</span>
            {metric.suffix && <span className="text-slate-300">{metric.suffix}</span>}
          </div>
        </motion.div>
        
        {/* Label */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.4 + index * 0.1 }}
        >
          <div className="text-sm lg:text-base text-slate-400 font-semibold group-hover:text-slate-300 transition-colors duration-300">
            {metric.label}
          </div>
        </motion.div>

        {/* Hover indicator */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent group-hover:w-full transition-all duration-500"
        />
      </div>
    </motion.div>
  );
}