'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield, BarChart3, BookOpen, Vault, Coins, Globe, Sparkles, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { LogoWithText } from '@/components/ui/Logo';
import { useRouter } from 'next/navigation';

const navItems = [
  { name: 'Platform', href: '#features', icon: BarChart3 },
  { name: 'Security', href: '#features', icon: Vault },
  { name: 'Markets', href: '#features', icon: Globe },
  { name: 'Pricing', href: '#pricing', icon: Coins },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
          : 'bg-transparent'
      }`}
      style={{
        backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Professional Logo */}
          <LogoWithText
            size="md"
            variant="default"
            onClick={() => router.push('/')}
          />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="group flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300 relative"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <item.icon className="h-5 w-5 group-hover:text-amber-400 transition-colors" />
                <span className="font-semibold text-base">{item.name}</span>
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 via-purple-500 to-blue-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>

          {/* Enhanced Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Secondary Action */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                variant="ghost"
                size="md"
                onClick={() => router.push('/login')}
                className="text-white hover:text-amber-300 font-semibold relative group"
              >
                <span className="flex items-center space-x-2">
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </span>
              </Button>
            </motion.div>
            
            {/* Primary CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                variant="vault"
                size="lg"
                onClick={() => router.push('/login')}
                className="font-bold relative group overflow-hidden"
                glow={true}
              >
                <span className="flex items-center space-x-2">
                  <Vault className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Start Trading</span>
                  <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                </span>
              </Button>
            </motion.div>
            
            {/* Quick Access Menu */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="relative"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-amber-400/30 transition-all duration-300 group"
                onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              </motion.button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
            style={{
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            }}
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center space-x-3 w-full text-left text-gray-300 hover:text-white transition-colors p-3 rounded-lg hover:bg-white/10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </motion.button>
              ))}
              
              <div className="pt-6 border-t border-white/10 space-y-4">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full text-white font-semibold"
                  onClick={() => router.push('/login')}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
                <Button
                  variant="vault"
                  size="lg"
                  className="w-full font-bold"
                  onClick={() => router.push('/login')}
                  glow={true}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <Vault className="w-5 h-5" />
                    <span>Start Trading</span>
                    <Sparkles className="w-4 h-4" />
                  </span>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}