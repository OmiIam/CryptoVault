'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
  size: 'md' | 'lg';
  onClick: () => void;
  icon?: LucideIcon;
  className?: string;
}

export default function AnimatedButton({ 
  children, 
  variant, 
  size, 
  onClick, 
  icon: Icon,
  className = '' 
}: AnimatedButtonProps) {
  const baseClasses = `
    relative inline-flex items-center justify-center font-semibold rounded-2xl
    transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 
    focus:ring-offset-slate-900 overflow-hidden group
    transform-gpu will-change-transform
  `;

  const sizeClasses = {
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg min-h-[64px]'
  };

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 
      hover:from-blue-500 hover:via-violet-500 hover:to-blue-500
      text-white shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40
      focus:ring-blue-500 border-0
    `,
    secondary: `
      bg-white/10 backdrop-blur-sm border border-white/20 text-white
      hover:bg-white/20 hover:border-white/30 shadow-xl shadow-black/25
      focus:ring-white/50
    `
  };

  return (
    <motion.button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Background shine effect for primary variant */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          initial={{ x: '-100%' }}
          whileHover={{ x: '200%' }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      )}
      
      {/* Background ripple effect for secondary variant */}
      {variant === 'secondary' && (
        <motion.div
          className="absolute inset-0 bg-white/5 rounded-2xl"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      <span className="relative flex items-center space-x-3">
        <span className="font-semibold tracking-wide">{children}</span>
        {Icon && (
          <motion.div
            className="flex items-center"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <Icon className="h-5 w-5" />
          </motion.div>
        )}
      </span>
    </motion.button>
  );
}