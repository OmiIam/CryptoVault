'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'dark' | 'light';
  showBadge?: boolean;
  interactive?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: {
    container: 'w-8 h-8',
    icon: 'h-5 w-5',
    badge: 'w-3 h-3',
    badgeText: 'text-[6px]',
    text: 'text-sm',
    subtext: 'text-[10px]'
  },
  md: {
    container: 'w-12 h-12',
    icon: 'h-7 w-7',
    badge: 'w-5 h-5',
    badgeText: 'text-[8px]',
    text: 'text-lg',
    subtext: 'text-xs'
  },
  lg: {
    container: 'w-16 h-16',
    icon: 'h-9 w-9',
    badge: 'w-6 h-6',
    badgeText: 'text-[10px]',
    text: 'text-xl',
    subtext: 'text-sm'
  },
  xl: {
    container: 'w-20 h-20',
    icon: 'h-12 w-12',
    badge: 'w-8 h-8',
    badgeText: 'text-xs',
    text: 'text-2xl',
    subtext: 'text-base'
  }
};

const variantClasses = {
  default: {
    container: 'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 border-white/10',
    icon: 'text-amber-400 group-hover:text-amber-300',
    badge: 'bg-gradient-to-br from-amber-400 to-amber-600 border-white/20',
    text: 'text-white',
    subtext: 'text-amber-400'
  },
  dark: {
    container: 'bg-gradient-to-br from-gray-900 via-gray-800 to-black border-gray-700/50',
    icon: 'text-amber-500',
    badge: 'bg-gradient-to-br from-amber-500 to-amber-700 border-gray-600/30',
    text: 'text-white',
    subtext: 'text-amber-500'
  },
  light: {
    container: 'bg-gradient-to-br from-white to-gray-100 border-gray-300/50',
    icon: 'text-amber-600',
    badge: 'bg-gradient-to-br from-amber-500 to-amber-700 border-white/50',
    text: 'text-gray-900',
    subtext: 'text-amber-600'
  }
};

export default function Logo({ 
  size = 'md', 
  variant = 'default', 
  showBadge = true, 
  interactive = true,
  className = '' 
}: LogoProps) {
  const sizes = sizeClasses[size];
  const variants = variantClasses[variant];

  const logoContent = (
    <div className={`relative ${className}`}>
      {/* Main logo container */}
      <motion.div 
        className={`${sizes.container} ${variants.container} rounded-xl flex items-center justify-center shadow-xl border relative overflow-hidden ${interactive ? 'group-hover:border-amber-400/30' : ''} transition-all duration-300`}
      >
        {/* Subtle animated background */}
        {interactive && (
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}
        
        {/* Professional X symbol with crypto/vault styling */}
        <div className="relative z-10 flex items-center justify-center">
          <svg 
            className={`${sizes.icon} ${variants.icon} transition-colors duration-300`}
            viewBox="0 0 24 24" 
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {/* Stylized X with circle for professional look */}
            <circle cx="12" cy="12" r="10" strokeWidth="1.5" opacity="0.3"/>
            <path d="M8 8L16 16" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M16 8L8 16" strokeWidth="2.5" strokeLinecap="round"/>
            {/* Additional vault-inspired elements */}
            <circle cx="12" cy="12" r="3" strokeWidth="1" opacity="0.5"/>
            <circle cx="12" cy="12" r="1" fill="currentColor"/>
          </svg>
        </div>
      </motion.div>
      
      {/* 360 badge */}
      {showBadge && (
        <motion.div 
          className={`absolute -top-1.5 -right-1.5 ${sizes.badge} ${variants.badge} rounded-full flex items-center justify-center shadow-lg border`}
        >
          <span className={`font-bold text-white leading-none ${sizes.badgeText}`}>360</span>
        </motion.div>
      )}
    </div>
  );

  if (!interactive) {
    return logoContent;
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer group"
    >
      {logoContent}
    </motion.div>
  );
}

export function LogoWithText({ 
  size = 'md', 
  variant = 'default', 
  showBadge = true, 
  interactive = true,
  onClick,
  className = '' 
}: LogoProps & { onClick?: () => void }) {
  const sizes = sizeClasses[size];
  const variants = variantClasses[variant];

  const content = (
    <div className={`flex items-center space-x-3 ${className}`}>
      <Logo 
        size={size} 
        variant={variant} 
        showBadge={showBadge} 
        interactive={false}
      />
      
      {/* Professional brand text */}
      <div className="flex flex-col">
        <div className="flex items-center space-x-1">
          <span className={`${sizes.text} font-bold ${variants.text} tracking-tight leading-none`}>
            CryptoX360
          </span>
        </div>
        <span className={`${sizes.subtext} font-medium ${variants.subtext} tracking-wider leading-none uppercase`}>
          VaultMarkets
        </span>
      </div>
    </div>
  );

  if (!interactive) {
    return content;
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer group"
      onClick={onClick}
    >
      {content}
    </motion.div>
  );
}