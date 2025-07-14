'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastData {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastProps {
  toast: ToastData;
  onRemove: (id: string) => void;
}

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const toastStyles = {
  success: {
    background: 'from-green-500/20 via-green-500/10 to-emerald-500/5',
    border: 'border-green-500/30',
    icon: 'text-green-400',
    title: 'text-green-100',
    message: 'text-green-200',
  },
  error: {
    background: 'from-red-500/20 via-red-500/10 to-pink-500/5',
    border: 'border-red-500/30',
    icon: 'text-red-400',
    title: 'text-red-100',
    message: 'text-red-200',
  },
  warning: {
    background: 'from-yellow-500/20 via-yellow-500/10 to-orange-500/5',
    border: 'border-yellow-500/30',
    icon: 'text-yellow-400',
    title: 'text-yellow-100',
    message: 'text-yellow-200',
  },
  info: {
    background: 'from-blue-500/20 via-blue-500/10 to-cyan-500/5',
    border: 'border-blue-500/30',
    icon: 'text-blue-400',
    title: 'text-blue-100',
    message: 'text-blue-200',
  },
};

export default function Toast({ toast, onRemove }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  
  const Icon = toastIcons[toast.type];
  const styles = toastStyles[toast.type];
  const duration = toast.duration || 5000;

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (duration / 100));
        if (newProgress >= 100) {
          setIsVisible(false);
          setTimeout(() => onRemove(toast.id), 300);
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [toast.id, duration, onRemove]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onRemove(toast.id), 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 30,
            mass: 0.8 
          }}
          className={`
            relative max-w-md w-full bg-gradient-to-r ${styles.background}
            backdrop-blur-xl ${styles.border} border rounded-2xl p-4 shadow-2xl
            overflow-hidden group
          `}
          style={{
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          }}
          whileHover={{ scale: 1.02, y: -2 }}
          layout
        >
          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-current opacity-30"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />

          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "linear",
              repeatDelay: 3 
            }}
          />

          <div className="relative z-10 flex items-start gap-3">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20,
                delay: 0.1 
              }}
              className={`flex-shrink-0 ${styles.icon}`}
            >
              <Icon className="h-5 w-5" />
            </motion.div>

            <div className="flex-1 min-w-0">
              <motion.h4
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className={`text-sm font-semibold ${styles.title}`}
              >
                {toast.title}
              </motion.h4>
              
              {toast.message && (
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`text-sm mt-1 ${styles.message}`}
                >
                  {toast.message}
                </motion.p>
              )}

              {toast.action && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={toast.action.onClick}
                  className={`
                    text-xs font-medium mt-2 px-3 py-1 rounded-lg
                    bg-white/10 hover:bg-white/20 transition-colors
                    ${styles.title}
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {toast.action.label}
                </motion.button>
              )}
            </div>

            <motion.button
              onClick={handleClose}
              className="flex-shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <X className="h-4 w-4" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}