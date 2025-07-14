'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Toast from './Toast';
import { useToast } from '@/hooks/useToast';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md w-full">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast, index) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: { 
                type: "spring", 
                stiffness: 500, 
                damping: 30,
                delay: index * 0.1 
              }
            }}
            exit={{ 
              opacity: 0, 
              y: -50, 
              scale: 0.9,
              transition: { duration: 0.2 }
            }}
          >
            <Toast toast={toast} onRemove={removeToast} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}