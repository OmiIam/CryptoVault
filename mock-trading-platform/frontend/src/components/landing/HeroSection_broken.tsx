'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Shield, TrendingUp, Users, Zap, CheckCircle, Star, Vault, Sparkles, ChevronDown } from 'lucide-react';
import { useRef } from 'react';

const trustBadges = [
  { icon: Shield, text: "SEC Regulated", color: "from-emerald-400 to-emerald-600" },
  { icon: CheckCircle, text: "Vault Secured", color: "from-amber-400 to-amber-600" },
  { icon: Shield, text: "DeFi Compatible", color: "from-purple-400 to-blue-600" }
];

const stats = [
  { value: "100K+", label: "Crypto Traders", icon: Users },
  { value: "$5.8B+", label: "24h Volume", icon: TrendingUp },
  { value: "360°", label: "Market Coverage", icon: Star },
  { value: "<5ms", label: "Execution", icon: Zap }
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Enhanced Cosmic background with particle effects */}
      <div className="absolute inset-0 bg-[#0B0D17] overflow-hidden">
        {/* Primary gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/25 via-purple-900/15 to-blue-900/25" />
        
        {/* Floating orbs with enhanced animations */}
        <motion.div 
          animate={{ 
            x: [0, 50, -30, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/18 rounded-full blur-3xl"
        />
        
        <motion.div 
          animate={{ 
            x: [0, -40, 60, 0],
            y: [0, 40, -20, 0],
            scale: [1, 0.8, 1.2, 1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl"
        />
        
        {/* Central cosmic vortex */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 60, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-conic from-transparent via-amber-500/10 via-purple-500/10 via-blue-500/8 to-transparent rounded-full blur-2xl"
        />
        
        {/* Additional floating elements */}
        <motion.div 
          animate={{ 
            x: [0, 80, -50, 0],
            y: [0, -50, 30, 0],
            opacity: [0.3, 0.6, 0.2, 0.3]
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-1/3 right-1/3 w-80 h-80 bg-blue-500/12 rounded-full blur-2xl"
        />
        
        {/* Subtle particle dots */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
              style={{
                top: `${(i * 37) % 100}%`,
                left: `${(i * 73) % 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 3 + (i % 4),
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {/* Floating geometric shapes */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-3/4 w-32 h-32 border border-amber-500/20 rounded-lg blur-sm"
        />
        
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 0.8, 1],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 5
          }}
          className="absolute bottom-1/3 left-1/6 w-24 h-24 border border-purple-500/20 rotate-45 blur-sm"
        />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20"
      >
        <div className="text-center space-y-12">
          
          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${badge.color} flex items-center justify-center`}>
                  <badge.icon className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-medium text-white/90">{badge.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.9] max-w-5xl mx-auto">
              <span className="block">
                <span className="bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                  360° Crypto &
                </span>
              </span>
              <span className="block mt-2">
                <span className="bg-gradient-to-r from-amber-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Vault Trading
                </span>
              </span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl sm:text-2xl lg:text-3xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Revolutionary platform combining{' '}
              <span className="text-amber-400 font-semibold">crypto innovation</span>,{' '}
              <span className="text-purple-400 font-semibold">traditional markets</span>, and{' '}
              <span className="text-blue-400 font-semibold">vault-grade security</span>.
            </motion.p>
          </motion.div>

          {/* Enhanced CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="space-y-8"
          >
            {/* Primary CTA Buttons */}
            <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  boxShadow: '0 25px 50px rgba(245, 158, 11, 0.4)'
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = '/signup'}
                className="group relative inline-flex items-center justify-center px-16 py-6 text-xl font-bold rounded-2xl bg-gradient-to-r from-amber-500 via-purple-600 to-blue-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 min-w-[320px] overflow-hidden"
              >
                {/* Enhanced glow effect */}
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400 via-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                
                {/* Shimmer effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
                
                {/* Content */}
                <span className="relative flex items-center space-x-4">
                  <Vault className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Enter the Vault</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ 
                  scale: 1.03, 
                  y: -2,
                  backgroundColor: 'rgba(255, 255, 255, 0.15)'
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.querySelector('#demo')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center justify-center px-12 py-6 text-lg font-semibold rounded-2xl bg-white/8 backdrop-blur-xl border border-white/20 text-white hover:border-white/40 transition-all duration-300 min-w-[280px] relative overflow-hidden"
              >
                {/* Subtle glow */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                
                <span className="relative flex items-center space-x-3">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Watch Demo</span>
                </span>
              </motion.button>
            </div>
            
            {/* Secondary Action - Quick Access */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/80 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-sm font-medium">Explore Features</span>
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Enhanced Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto mt-24"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group text-center p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/15 hover:border-amber-400/30 transition-all duration-500 relative overflow-hidden"
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                <div className="relative flex justify-center mb-6">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-blue-500/20 border border-white/10 group-hover:border-amber-400/40 transition-all duration-300 relative"
                  >
                    <stat.icon className="w-7 h-7 text-amber-400 relative z-10" />
                    {/* Icon glow */}
                    <div className="absolute inset-0 bg-amber-400/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                </div>
                <div className="relative">
                  <div className="text-4xl lg:text-5xl font-black text-white mb-3 font-mono group-hover:text-amber-100 transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400 font-semibold group-hover:text-amber-300 transition-colors duration-300 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="pt-16 border-t border-white/10 max-w-4xl mx-auto"
          >
            <motion.p 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.0, duration: 0.5 }}
              className="text-slate-300 text-base mb-8 text-center font-medium"
            >
              Trusted by <span className="text-amber-400 font-semibold">crypto institutions</span> and <span className="text-purple-400 font-semibold">digital asset pioneers</span> worldwide
            </p>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="flex flex-wrap justify-center items-center gap-12 opacity-70"
            >
              {['Binance', 'Coinbase', 'Kraken', 'Galaxy Digital', 'Grayscale'].map((company, index) => (
                <motion.div 
                  key={company} 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 2.4 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.1, opacity: 1 }}
                  className="text-white/80 font-bold text-lg hover:text-amber-300 transition-all duration-300 cursor-pointer"
                >
                  {company}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Scroll indicator with interactive elements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 group cursor-pointer"
        onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
      >
        {/* Scroll wheel */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
          className="w-8 h-12 border-2 border-white/40 group-hover:border-amber-400/60 rounded-full flex justify-center relative overflow-hidden transition-colors duration-300"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
          
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-4 bg-white/60 group-hover:bg-amber-400/80 rounded-full mt-2 transition-colors duration-300"
          />
        </motion.div>
        
        {/* Scroll text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className="text-center mt-3"
        >
          <span className="text-xs text-white/50 group-hover:text-amber-400/70 transition-colors duration-300 font-medium tracking-wider">
            SCROLL
          </span>
        </motion.div>
        
        {/* Interactive particles around scroll indicator */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-400/40 rounded-full"
              style={{
                top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 20}px`,
                left: `${20 + Math.cos(i * 60 * Math.PI / 180) * 20}px`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}