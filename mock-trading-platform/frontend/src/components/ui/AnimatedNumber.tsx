'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnimatedNumberProps {
  value: number;
  className?: string;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: string;
}

export default function AnimatedNumber({
  value,
  className = '',
  duration = 0.8,
  prefix = '',
  suffix = '',
  decimals = 0,
  separator = ','
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  
  const spring = useSpring(displayValue, {
    stiffness: 100,
    damping: 20,
    mass: 1
  });

  const animatedValue = useTransform(spring, (latest) => {
    return latest.toFixed(decimals);
  });

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const formatNumber = (num: string) => {
    if (separator && decimals === 0) {
      return parseInt(num).toLocaleString();
    }
    return num;
  };

  return (
    <motion.span
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 25,
        duration 
      }}
    >
      {prefix}
      <motion.span>
        {animatedValue.get() && formatNumber(animatedValue.get())}
      </motion.span>
      {suffix}
    </motion.span>
  );
}