'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'vault' | 'crypto' | 'premium';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  glow?: boolean;
  magnetic?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', loading = false, glow = false, magnetic = false, children, ...props }, ref) => {
    const baseClasses = `
      inline-flex items-center justify-center rounded-xl font-medium 
      transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 
      disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden
      transform-gpu will-change-transform
    `;
    
    const variants = {
      primary: `
        bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white 
        hover:from-blue-700 hover:via-blue-600 hover:to-purple-700 
        focus:ring-blue-500 shadow-xl hover:shadow-2xl hover:shadow-blue-500/25
        before:absolute before:inset-0 before:bg-gradient-to-r 
        before:from-transparent before:via-white/20 before:to-transparent
        before:translate-x-[-100%] hover:before:translate-x-[100%] 
        before:transition-transform before:duration-700 before:ease-out
      `,
      secondary: `
        bg-white/10 backdrop-blur-md text-white border border-white/20 
        hover:bg-white/20 hover:border-white/40 focus:ring-white/50
        shadow-lg hover:shadow-xl
        before:absolute before:inset-0 before:bg-gradient-to-r 
        before:from-transparent before:via-white/10 before:to-transparent
        before:translate-x-[-100%] hover:before:translate-x-[100%]
        before:transition-transform before:duration-500
      `,
      danger: `
        bg-gradient-to-r from-red-600 via-red-500 to-pink-600 text-white 
        hover:from-red-700 hover:via-red-600 hover:to-pink-700 
        focus:ring-red-500 shadow-xl hover:shadow-2xl hover:shadow-red-500/25
        before:absolute before:inset-0 before:bg-gradient-to-r 
        before:from-transparent before:via-white/20 before:to-transparent
        before:translate-x-[-100%] hover:before:translate-x-[100%]
        before:transition-transform before:duration-700
      `,
      ghost: `
        text-gray-300 hover:text-white hover:bg-white/10 focus:ring-gray-500
        border border-transparent hover:border-white/20
        before:absolute before:inset-0 before:bg-gradient-to-r 
        before:from-transparent before:via-white/5 before:to-transparent
        before:translate-x-[-100%] hover:before:translate-x-[100%]
        before:transition-transform before:duration-500
      `,
      vault: `
        bg-gradient-to-r from-amber-500 via-purple-600 to-blue-600 text-white 
        hover:from-amber-400 hover:via-purple-500 hover:to-blue-500 
        focus:ring-amber-500 shadow-2xl hover:shadow-3xl hover:shadow-amber-500/30
        before:absolute before:inset-0 before:bg-gradient-to-r 
        before:from-amber-400/50 before:via-purple-400/50 before:to-blue-400/50
        before:translate-x-[-100%] hover:before:translate-x-[100%] 
        before:transition-transform before:duration-800 before:ease-out
        after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent 
        after:via-white/20 after:to-transparent after:opacity-0 hover:after:opacity-100
        after:transition-opacity after:duration-300
      `,
      crypto: `
        bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 text-white 
        hover:from-purple-500 hover:via-blue-400 hover:to-cyan-400 
        focus:ring-purple-500 shadow-2xl hover:shadow-3xl hover:shadow-purple-500/30
        before:absolute before:inset-0 before:bg-gradient-to-r 
        before:from-purple-400/50 before:via-blue-400/50 before:to-cyan-400/50
        before:translate-x-[-100%] hover:before:translate-x-[100%] 
        before:transition-transform before:duration-800 before:ease-out
        after:absolute after:inset-[-2px] after:bg-gradient-to-r after:from-purple-500 
        after:via-blue-500 after:to-cyan-500 after:rounded-xl after:opacity-0 
        hover:after:opacity-100 after:transition-opacity after:duration-300 after:blur-sm after:-z-10
      `,
      premium: `
        bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black 
        hover:from-amber-300 hover:via-yellow-400 hover:to-amber-500 
        focus:ring-amber-500 shadow-2xl hover:shadow-3xl hover:shadow-amber-500/40
        before:absolute before:inset-0 before:bg-gradient-to-r 
        before:from-white/30 before:via-white/50 before:to-white/30
        before:translate-x-[-100%] hover:before:translate-x-[100%] 
        before:transition-transform before:duration-1000 before:ease-out
        after:absolute after:inset-[-1px] after:bg-gradient-to-r after:from-amber-400 
        after:via-yellow-500 after:to-amber-600 after:rounded-xl after:opacity-0 
        hover:after:opacity-100 after:transition-opacity after:duration-300 after:blur-sm after:-z-10
        font-bold
      `
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm h-8',
      md: 'px-6 py-2.5 text-base h-10',
      lg: 'px-8 py-3 text-lg h-12',
      xl: 'px-12 py-4 text-xl h-16'
    };

    const glowEffect = glow ? 'animate-pulse shadow-2xl' : '';
    const magneticEffect = magnetic ? 'transition-transform duration-300 ease-out' : '';
    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${glowEffect} ${magneticEffect} ${className}`;

    const getHoverAnimation = () => {
      const baseAnimation = {
        scale: 1.05,
        y: -2,
        transition: { type: "spring", stiffness: 400, damping: 17 }
      };
      
      if (variant === 'vault') {
        return {
          ...baseAnimation,
          scale: 1.08,
          y: -3,
          boxShadow: '0 20px 40px rgba(245, 158, 11, 0.4)'
        };
      }
      
      if (variant === 'crypto') {
        return {
          ...baseAnimation,
          scale: 1.06,
          y: -2,
          rotateZ: 1,
          boxShadow: '0 15px 35px rgba(139, 92, 246, 0.3)'
        };
      }
      
      if (variant === 'premium') {
        return {
          ...baseAnimation,
          scale: 1.1,
          y: -4,
          boxShadow: '0 25px 50px rgba(245, 158, 11, 0.5)'
        };
      }
      
      return baseAnimation;
    };

    const tapAnimation = {
      scale: 0.98,
      y: 0,
      transition: { type: "spring", stiffness: 400, damping: 17 }
    };

    return (
      <motion.button
        ref={ref}
        whileHover={getHoverAnimation()}
        whileTap={tapAnimation}
        className={classes}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="mr-2 h-4 w-4 rounded-full border-2 border-current border-t-transparent"
          />
        )}
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;