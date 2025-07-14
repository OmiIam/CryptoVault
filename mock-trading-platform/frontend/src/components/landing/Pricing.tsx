'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Check, 
  Star, 
  Zap, 
  Shield, 
  TrendingUp, 
  Users,
  Crown,
  Infinity,
  ArrowRight,
  Building2,
  Globe,
  Award,
  CheckCircle
} from 'lucide-react';

const plans = [
  {
    name: "Crypto Pro",
    price: "$599",
    originalPrice: "$899",
    description: "For professional crypto traders",
    icon: TrendingUp,
    color: "from-amber-500 to-yellow-500",
    popular: false,
    tier: "Professional",
    features: [
      "500+ crypto trading pairs",
      "DeFi protocol integration",
      "Advanced order types & stops",
      "Spot & derivatives trading",
      "Staking & yield farming",
      "Mobile & desktop apps",
      "Standard vault security",
      "Email & chat support"
    ],
    limits: [
      "Up to $5M monthly volume",
      "10 API calls per second",
      "Standard crypto data"
    ]
  },
  {
    name: "Vault Elite",
    price: "$2,999",
    originalPrice: "$4,499",
    description: "For crypto institutions & funds",
    icon: Building2,
    color: "from-purple-500 to-violet-500",
    popular: true,
    tier: "Institutional", 
    features: [
      "Everything in Crypto Pro",
      "Cross-chain trading access",
      "Ultra-low latency execution",
      "Institutional crypto spreads",
      "Multi-sig wallet integration",
      "Portfolio management suite",
      "Custom DeFi strategies",
      "Advanced risk controls",
      "Regulatory compliance tools",
      "Dedicated account manager",
      "24/7 priority support",
      "On-site vault training"
    ],
    limits: [
      "Up to $500M monthly volume",
      "Unlimited API calls",
      "Premium crypto data included"
    ]
  },
  {
    name: "Vault Sovereign",
    price: "Custom",
    originalPrice: null,
    description: "For sovereign funds & mega institutions",
    icon: Crown,
    color: "from-amber-500 to-orange-500",
    popular: false,
    tier: "Sovereign",
    features: [
      "Everything in Vault Elite",
      "White-label crypto platform",
      "Custom vault infrastructure",
      "Cold storage integration",
      "Dedicated hardware security",
      "Custom blockchain integrations",
      "Full regulatory compliance",
      "Global crypto market access",
      "Multi-currency & stablecoin",
      "Advanced crypto analytics",
      "Institutional crypto research",
      "Concierge vault services"
    ],
    limits: [
      "Unlimited trading volume",
      "Custom API architecture",
      "All crypto data included"
    ]
  }
];

const enterpriseFeatures = [
  {
    category: "Crypto Execution",
    features: [
      "Sub-5ms crypto execution",
      "Cross-chain DEX access", 
      "MEV protection routing",
      "Automated DeFi strategies"
    ]
  },
  {
    category: "Vault Security",
    features: [
      "Military-grade encryption",
      "Multi-sig custody",
      "Cold storage integration",
      "Hardware security modules"
    ]
  },
  {
    category: "Infrastructure", 
    features: [
      "99.99% vault uptime SLA",
      "Global node infrastructure",
      "Blockchain co-location",
      "Disaster recovery vaults"
    ]
  },
  {
    category: "Support",
    features: [
      "Dedicated crypto team",
      "24/7 vault monitoring",
      "Implementation services",
      "Crypto compliance training"
    ]
  }
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="pricing" ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Cosmic background with premium vault gradients */}
      <div className="absolute inset-0 bg-[#0B0D17]">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/18 via-purple-900/10 to-blue-900/15" />
        <motion.div 
          style={{ y }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/12 rounded-full blur-3xl animate-pulse"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 30]) }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl animate-pulse delay-1000"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-conic from-transparent via-amber-500/6 via-purple-500/6 to-transparent rounded-full blur-2xl" />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [25, -25]) }}
          className="absolute top-1/3 right-1/3 w-80 h-80 bg-blue-500/8 rounded-full blur-2xl animate-pulse delay-2000"
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
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-white/90">Vault-Grade Pricing</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[0.9] mb-8">
            <span className="block text-white mb-2">Vault Premium</span>
            <span className="block bg-gradient-to-r from-amber-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Crypto Solutions
            </span>
          </h2>
          
          <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light mb-12">
            Military-grade vault infrastructure designed for{' '}
            <span className="text-amber-400 font-semibold">crypto institutions</span> and{' '}
            <span className="text-purple-400 font-semibold">digital asset pioneers</span>
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`text-lg font-medium ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>
              Monthly
            </span>
            <motion.button
              className="relative w-20 h-10 bg-white/10 rounded-full border border-white/20 focus:outline-none"
              onClick={() => setIsAnnual(!isAnnual)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute top-1 left-1 w-8 h-8 bg-gradient-to-r from-amber-500 to-purple-500 rounded-full shadow-lg"
                animate={{ x: isAnnual ? 40 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </motion.button>
            <span className={`text-lg font-medium ${isAnnual ? 'text-white' : 'text-slate-400'}`}>
              Annual
            </span>
            {isAnnual && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-sm font-medium border border-amber-500/30"
              >
                Save 20%
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative ${plan.popular ? 'lg:scale-105' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                >
                  <div className="bg-gradient-to-r from-amber-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 shadow-xl">
                    <Crown className="w-4 h-4" />
                    <span>Most Popular</span>
                  </div>
                </motion.div>
              )}

              <div className={`relative p-8 lg:p-10 bg-white/5 backdrop-blur-sm rounded-3xl border transition-all duration-500 h-full ${
                plan.popular 
                  ? 'border-purple-500/50 bg-purple-500/5 hover:border-purple-400/70' 
                  : 'border-white/10 hover:border-white/20 hover:bg-white/10'
              }`}>
                
                {/* Background Gradient */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${plan.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                {/* Enhanced Plan Header */}
                <div className="relative z-10 mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <motion.div
                      className={`relative inline-flex items-center justify-center w-18 h-18 lg:w-22 lg:h-22 rounded-3xl bg-gradient-to-br ${plan.color} shadow-2xl overflow-hidden`}
                      whileHover={{ scale: 1.15, rotate: 8, y: -3 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      {/* Icon glow */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-50 blur-lg scale-110`} />
                      
                      {/* Icon shimmer */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-800" />
                      
                      <plan.icon className="w-9 h-9 lg:w-11 lg:h-11 text-white relative z-10 drop-shadow-lg" />
                    </motion.div>
                    <motion.div 
                      className="text-right"
                      whileHover={{ x: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-sm font-bold text-slate-400 uppercase tracking-wide group-hover:text-amber-300 transition-colors duration-300">
                        {plan.tier}
                      </div>
                    </motion.div>
                  </div>
                  
                  <motion.h3 
                    className="text-2xl lg:text-3xl font-black text-white mb-4 group-hover:text-amber-100 transition-colors duration-300 relative"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {plan.name}
                    {/* Underline effect */}
                    <motion.div 
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-400 to-purple-400 origin-left"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                    />
                  </motion.h3>
                  <motion.p 
                    className="text-slate-300 mb-6 leading-relaxed group-hover:text-slate-200 transition-colors duration-300"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    {plan.description}
                  </motion.p>
                  
                  <div className="flex items-end space-x-2 mb-4">
                    {plan.originalPrice && plan.price !== "Custom" && (
                      <span className="text-slate-500 line-through text-xl">
                        {plan.originalPrice}
                      </span>
                    )}
                    <span className="text-4xl lg:text-5xl font-black text-white">
                      {plan.price === "Custom" ? plan.price : (
                        isAnnual ? 
                        `$${Math.round(parseInt(plan.price.replace('$', '')) * 0.8)}` : 
                        plan.price
                      )}
                    </span>
                    {plan.price !== "Custom" && (
                      <span className="text-slate-400 text-lg">/month</span>
                    )}
                  </div>
                  
                  {plan.originalPrice && plan.price !== "Custom" && (
                    <div className="inline-flex items-center space-x-1 bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-sm font-medium border border-amber-500/30">
                      <span>Save {isAnnual ? 60 : 40}%</span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="relative z-10 space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + featureIndex * 0.05 }}
                    >
                      <div className="flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-amber-400 mt-0.5" />
                      </div>
                      <span className="text-slate-300 leading-relaxed group-hover:text-white transition-colors duration-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Limits */}
                <div className="relative z-10 mb-8">
                  <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Usage Limits</h4>
                  <div className="space-y-2">
                    {plan.limits.map((limit, limitIndex) => (
                      <div key={limit} className="flex items-center space-x-2 text-sm text-slate-400">
                        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                        <span>{limit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enhanced CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.location.href = plan.price === "Custom" ? '/contact' : '/signup'}
                  className={`w-full relative z-10 inline-flex items-center justify-center px-8 py-5 text-lg font-bold rounded-2xl transition-all duration-500 overflow-hidden group/btn ${
                    plan.popular
                      ? 'bg-gradient-to-r from-amber-500 via-purple-600 to-blue-600 text-white shadow-2xl hover:shadow-3xl hover:shadow-amber-500/30'
                      : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-amber-400/30'
                  }`}
                >
                  {/* Button shimmer effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-800" />
                  
                  <span className="relative flex items-center space-x-3">
                    {plan.price === "Custom" ? (
                      <>
                        <Shield className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
                        <span>Contact Sales</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300" />
                        <span>Get Started</span>
                      </>
                    )}
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
                  </span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Features */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Vault-Grade Capabilities
            </h3>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Military-grade security and infrastructure designed for institutional crypto operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {enterpriseFeatures.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <h4 className="text-xl font-bold text-white mb-4">{category.category}</h4>
                <div className="space-y-3">
                  {category.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
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
                Ready to Secure Your Vault?
              </h3>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join leading crypto institutions who trust our vault for their most critical digital asset operations
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.location.href = '/contact'}
                  className="group inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-2xl bg-gradient-to-r from-amber-500 via-purple-600 to-blue-600 text-white shadow-2xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300"
                >
                  <span className="flex items-center space-x-3">
                    <span>Contact Vault Sales</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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