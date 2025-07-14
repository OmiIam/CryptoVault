'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Shield, 
  Smartphone, 
  Brain, 
  Zap,
  Globe,
  Clock,
  Award,
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  Vault,
  Coins,
  Lock
} from 'lucide-react';
import { useRef } from 'react';

const features = [
  {
    icon: Coins,
    title: "Crypto & DeFi Trading",
    description: "Comprehensive cryptocurrency trading with DeFi integration, yield farming, and staking capabilities.",
    color: "from-amber-500 to-yellow-500",
    benefits: ["500+ crypto pairs", "DeFi protocols", "Yield farming", "Staking rewards"]
  },
  {
    icon: Vault,
    title: "Vault-Grade Security",
    description: "Military-grade security infrastructure with cold storage, multi-sig wallets, and insurance coverage.",
    color: "from-purple-500 to-violet-500", 
    benefits: ["Cold storage", "Multi-sig wallets", "$100M insurance", "Hardware security"]
  },
  {
    icon: Globe,
    title: "360° Market Access",
    description: "Unified access to crypto, stocks, forex, commodities, and derivatives across global exchanges.",
    color: "from-blue-500 to-cyan-500",
    benefits: ["200+ exchanges", "Cross-chain trading", "Fiat on-ramps", "Global liquidity"]
  },
  {
    icon: Zap,
    title: "Lightning Execution",
    description: "Sub-5ms execution speeds with smart order routing and MEV protection for optimal fills.",
    color: "from-emerald-500 to-green-500",
    benefits: ["<5ms latency", "MEV protection", "Smart routing", "Atomic swaps"]
  },
  {
    icon: Brain,
    title: "AI Trading Engine",
    description: "Advanced AI algorithms for market analysis, sentiment tracking, and automated trading strategies.",
    color: "from-indigo-500 to-purple-500",
    benefits: ["Sentiment analysis", "Auto strategies", "Risk scoring", "Market predictions"]
  },
  {
    icon: Lock,
    title: "Regulatory Compliance",
    description: "Full regulatory compliance with KYC/AML, tax reporting, and institutional-grade audit trails.",
    color: "from-rose-500 to-pink-500",
    benefits: ["KYC/AML certified", "Tax reporting", "Audit trails", "Compliance tools"]
  }
];

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="features" ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Cosmic background with vault-themed gradients */}
      <div className="absolute inset-0 bg-[#0B0D17]">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/15 via-purple-900/8 to-blue-900/15" />
        <motion.div 
          style={{ y }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl animate-pulse"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-conic from-transparent via-amber-500/5 via-purple-500/5 to-transparent rounded-full blur-2xl" />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [25, -25]) }}
          className="absolute top-1/3 right-1/3 w-64 h-64 bg-blue-500/6 rounded-full blur-2xl animate-pulse delay-2000"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-white/90">Enterprise-Grade Platform</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[0.9] mb-8">
            <span className="block text-white mb-2">Vault-Grade</span>
            <span className="block bg-gradient-to-r from-amber-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Trading Platform
            </span>
          </h2>
          
          <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
            Military-grade security meets cutting-edge crypto innovation, trusted by{' '}
            <span className="text-amber-400 font-semibold">institutional traders</span> and{' '}
            <span className="text-purple-400 font-semibold">crypto pioneers</span> worldwide
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="relative p-8 lg:p-10 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:bg-white/15 hover:border-amber-400/30 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-amber-500/10 overflow-hidden">
                {/* Enhanced background gradient */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-8 transition-opacity duration-500`} />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
                
                {/* Enhanced Icon */}
                <motion.div
                  className={`relative inline-flex items-center justify-center w-18 h-18 lg:w-22 lg:h-22 rounded-3xl bg-gradient-to-br ${feature.color} mb-8 lg:mb-10 shadow-2xl overflow-hidden`}
                  whileHover={{ scale: 1.15, rotate: 8, y: -2 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {/* Icon glow background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-50 blur-lg scale-110`} />
                  
                  {/* Icon shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-800" />
                  
                  <feature.icon className="w-9 h-9 lg:w-11 lg:h-11 text-white relative z-10 drop-shadow-lg" />
                </motion.div>

                {/* Enhanced Content */}
                <motion.h3 
                  className="text-2xl lg:text-3xl font-black text-white mb-5 group-hover:text-amber-100 transition-colors duration-300 relative"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {feature.title}
                  {/* Underline effect */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-400 to-purple-400 origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  />
                </motion.h3>
                
                <motion.p 
                  className="text-lg text-slate-300 mb-8 leading-relaxed group-hover:text-slate-200 transition-colors duration-300"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  {feature.description}
                </motion.p>

                {/* Enhanced Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <motion.div
                      key={benefit}
                      className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/5 transition-colors duration-300 group/benefit"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + benefitIndex * 0.1 }}
                      whileHover={{ x: 5, scale: 1.02 }}
                    >
                      <div className="flex-shrink-0">
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.4 }}
                        >
                          <CheckCircle className="w-5 h-5 text-amber-400 group-hover/benefit:text-amber-300 transition-colors duration-300" />
                        </motion.div>
                      </div>
                      <span className="text-sm font-semibold text-slate-300 group-hover/benefit:text-white transition-colors duration-300">
                        {benefit}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Enhanced Hover indicator */}
                <motion.div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent group-hover:w-full transition-all duration-700 rounded-full"
                />
                
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-400/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative p-12 lg:p-16 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-3xl border border-white/20 max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/8 via-purple-600/5 to-blue-600/8 rounded-3xl" />
            
            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Ready to Enter the Vault?
              </h3>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join over 100,000 crypto traders who trust our vault-grade security and 360° market access
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.location.href = '/signup'}
                  className="group inline-flex items-center justify-center px-12 py-6 text-lg font-bold rounded-2xl bg-gradient-to-r from-amber-500 via-purple-600 to-blue-600 text-white shadow-2xl hover:shadow-3xl hover:shadow-amber-500/30 transition-all duration-500 relative overflow-hidden"
                >
                  {/* Button shimmer */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-800" />
                  
                  <span className="relative flex items-center space-x-3">
                    <Vault className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Access the Vault</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => document.querySelector('#demo')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                >
                  <span>Request Demo</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}