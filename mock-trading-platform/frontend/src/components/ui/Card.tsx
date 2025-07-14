'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: 'default' | 'premium' | 'glow' | 'minimal';
  gradient?: boolean;
}

export default function Card({ 
  children, 
  className = '', 
  hover = true, 
  variant = 'default',
  gradient = false 
}: CardProps) {
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'premium':
        return `
          bg-gradient-to-br from-white/15 via-white/10 to-white/5
          backdrop-blur-xl border border-white/30
          shadow-2xl shadow-black/20
          before:absolute before:inset-0 before:rounded-2xl 
          before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent
          before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
          relative overflow-hidden
        `;
      case 'glow':
        return `
          bg-white/10 backdrop-blur-md border border-white/20
          shadow-xl shadow-blue-500/10
          hover:shadow-blue-500/20 hover:border-blue-400/30
          relative
          before:absolute before:inset-0 before:rounded-2xl
          before:bg-gradient-to-r before:from-blue-500/10 before:via-purple-500/10 before:to-blue-500/10
          before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-500
        `;
      case 'minimal':
        return `
          bg-white/5 backdrop-blur-sm border border-white/10
          shadow-lg hover:shadow-xl
          hover:bg-white/10 hover:border-white/20
        `;
      default:
        return `
          bg-white/10 backdrop-blur-md border border-white/20
          shadow-xl hover:shadow-2xl
          hover:bg-white/15 hover:border-white/30
        `;
    }
  };

  const getGradientOverlay = () => {
    if (!gradient) return '';
    return `
      after:absolute after:inset-0 after:rounded-2xl after:pointer-events-none
      after:bg-gradient-to-br after:from-blue-500/5 after:via-transparent after:to-purple-500/5
    `;
  };

  const hoverAnimation = hover ? {
    y: -4,
    scale: 1.02,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  } : {};

  return (
    <motion.div
      whileHover={hoverAnimation}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`
        ${getVariantStyles()}
        ${getGradientOverlay()}
        rounded-2xl p-6 transition-all duration-300
        ${className}
      `}
      style={{
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      }}
    >
      {children}
    </motion.div>
  );
}