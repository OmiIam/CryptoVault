'use client';

import { motion } from 'framer-motion';
import { forwardRef, useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'floating' | 'minimal';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, icon, variant = 'default', ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      props.onChange?.(e);
    };

    const baseClasses = `
      w-full px-4 py-3 rounded-xl transition-all duration-300
      focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed
      placeholder:text-gray-500 relative
    `;

    const variants = {
      default: `
        bg-white/10 backdrop-blur-md border border-white/20 text-white
        hover:bg-white/15 hover:border-white/30 
        focus:bg-white/15 focus:border-blue-400/50 focus:ring-blue-400/25
        ${error ? 'border-red-400/50 focus:border-red-400 focus:ring-red-400/25' : ''}
      `,
      floating: `
        bg-transparent border-b-2 border-white/20 rounded-none px-0 py-2
        hover:border-white/40 focus:border-blue-400 focus:ring-0
        ${error ? 'border-red-400 focus:border-red-400' : ''}
      `,
      minimal: `
        bg-white/5 border border-white/10 text-white
        hover:bg-white/10 hover:border-white/20
        focus:bg-white/10 focus:border-white/30 focus:ring-white/10
        ${error ? 'border-red-400/30 focus:border-red-400/50 focus:ring-red-400/10' : ''}
      `
    };

    const inputClasses = `${baseClasses} ${variants[variant]} ${className}`;

    const containerVariants = {
      default: { scale: 1 },
      focused: { scale: 1.02 },
      error: { x: [-2, 2, -2, 2, 0] }
    };

    const labelVariants = {
      default: { y: 0, scale: 1, color: '#9CA3AF' },
      focused: { y: -24, scale: 0.85, color: '#60A5FA' },
      filled: { y: -24, scale: 0.85, color: '#9CA3AF' },
      error: { color: '#F87171' }
    };

    if (variant === 'floating' && label) {
      return (
        <motion.div 
          className="relative"
          variants={containerVariants}
          animate={error ? 'error' : isFocused ? 'focused' : 'default'}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="relative">
            {icon && (
              <motion.div 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10"
                whileHover={{ scale: 1.1 }}
              >
                {icon}
              </motion.div>
            )}
            <motion.input
              ref={ref}
              className={inputClasses}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              whileFocus={{ 
                boxShadow: "0 0 20px rgba(96, 165, 250, 0.3)",
                transition: { duration: 0.2 }
              }}
              {...props}
            />
            <motion.label
              className="absolute left-0 top-2 pointer-events-none origin-left text-sm font-medium"
              variants={labelVariants}
              animate={
                error ? 'error' :
                isFocused ? 'focused' : 
                hasValue ? 'filled' : 
                'default'
              }
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {label}
            </motion.label>
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 text-sm text-red-400"
            >
              {error}
            </motion.p>
          )}
        </motion.div>
      );
    }

    return (
      <motion.div 
        className="space-y-2"
        variants={containerVariants}
        animate={error ? 'error' : isFocused ? 'focused' : 'default'}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {label && (
          <motion.label 
            className="block text-sm font-medium text-gray-300"
            whileHover={{ color: '#ffffff' }}
          >
            {label}
          </motion.label>
        )}
        <div className="relative">
          {icon && (
            <motion.div 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10"
              whileHover={{ scale: 1.1 }}
            >
              {icon}
            </motion.div>
          )}
          <motion.input
            ref={ref}
            className={`${inputClasses} ${icon ? 'pl-10' : ''}`}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            whileFocus={{ 
              boxShadow: "0 0 20px rgba(96, 165, 250, 0.3)",
              transition: { duration: 0.2 }
            }}
            {...props}
          />
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-red-400 flex items-center gap-1"
          >
            <span className="inline-block w-1 h-1 bg-red-400 rounded-full" />
            {error}
          </motion.p>
        )}
      </motion.div>
    );
  }
);

Input.displayName = 'Input';

export default Input;