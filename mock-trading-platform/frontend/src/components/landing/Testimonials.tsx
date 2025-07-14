'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, User, TrendingUp, Target, Award, ArrowRight, CheckCircle, Building2 } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Elena Vasquez",
    title: "Head of Digital Assets",
    company: "Fidelity Digital Assets",
    location: "Boston, MA",
    rating: 5,
    quote: "CryptoX360VaultMarkets combines institutional-grade security with the speed needed for crypto markets. The vault architecture gives us confidence in multi-billion dollar trades.",
    metrics: {
      profit: "+438%",
      aum: "$2.3B+",
      trades: "89,340"
    },
    verified: true
  },
  {
    id: 2,
    name: "Marcus Thompson",
    title: "Crypto Trading Director",
    company: "Galaxy Digital",
    location: "New York, NY",
    rating: 5,
    quote: "The 360° market access and DeFi integration capabilities are unmatched. We've captured alpha across traditional and decentralized markets seamlessly.",
    metrics: {
      profit: "+567%",
      aum: "$1.8B+",
      trades: "156,780"
    },
    verified: true
  },
  {
    id: 3,
    name: "Dr. Yuki Tanaka",
    title: "Chief Investment Officer",
    company: "Grayscale Investments",
    location: "New York, NY",
    rating: 5,
    quote: "The vault-grade custody solution and cross-chain capabilities have revolutionized our institutional crypto strategies. Absolutely essential infrastructure.",
    metrics: {
      profit: "+729%",
      aum: "$4.1B+",
      trades: "234,890"
    },
    verified: true
  }
];

const institutionalClients = [
  "Fidelity Digital", "Galaxy Digital", "Grayscale", "Coinbase Pro", "Kraken Pro", "Binance Institutional"
];

const achievements = [
  {
    icon: Award,
    title: "Best Crypto Platform 2024",
    organization: "CoinDesk",
    year: "2024"
  },
  {
    icon: Star,
    title: "Vault Security Excellence",
    organization: "Digital Asset Awards",
    year: "2024"
  },
  {
    icon: Target,
    title: "Most Trusted Custody",
    organization: "Institutional Crypto",
    year: "2024"
  }
];

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Cosmic background with vault-themed gradients */}
      <div className="absolute inset-0 bg-[#0B0D17]">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/12 via-purple-900/6 to-blue-900/12" />
        <motion.div 
          style={{ y }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl animate-pulse"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 30]) }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-conic from-transparent via-amber-500/4 via-purple-500/4 to-transparent rounded-full blur-2xl" />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [20, -20]) }}
          className="absolute top-1/3 left-1/3 w-64 h-64 bg-blue-500/6 rounded-full blur-2xl animate-pulse delay-2000"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Awards Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="flex items-center space-x-3 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10"
              >
                <achievement.icon className="w-5 h-5 text-yellow-400" />
                <div className="text-left">
                  <div className="text-sm font-semibold text-white">{achievement.title}</div>
                  <div className="text-xs text-slate-400">{achievement.organization} • {achievement.year}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[0.9] mb-8">
            <span className="block text-white mb-2">Trusted by</span>
            <span className="block bg-gradient-to-r from-amber-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Crypto Institutions
            </span>
          </h2>
          
          <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light mb-12">
            See why{' '}
            <span className="text-amber-400 font-semibold">digital asset leaders</span>{' '}
            and{' '}
            <span className="text-purple-400 font-semibold">crypto institutions</span>{' '}
            trust our vault for their most critical operations
          </p>

          {/* Institutional Clients */}
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {institutionalClients.map((client) => (
              <div key={client} className="text-white/60 font-semibold text-lg">
                {client}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Testimonial Carousel */}
        <motion.div
          className="max-w-5xl mx-auto mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative p-12 lg:p-16 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-3xl border border-white/20 group hover:border-amber-400/30 transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/8 via-purple-600/5 to-blue-600/8 rounded-3xl" />
            
            {/* Testimonial shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                {/* Quote */}
                <div className="mb-8">
                  <Quote className="w-12 h-12 text-amber-400 mb-6" />
                  <blockquote className="text-2xl lg:text-3xl text-white leading-relaxed font-light">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-8 mb-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-center">
                    <div className="text-3xl font-black text-amber-400 mb-1">
                      {testimonials[currentTestimonial].metrics.profit}
                    </div>
                    <div className="text-sm text-slate-400 font-medium">Crypto Gains</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-purple-400 mb-1">
                      {testimonials[currentTestimonial].metrics.aum}
                    </div>
                    <div className="text-sm text-slate-400 font-medium">Digital Assets</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-blue-400 mb-1">
                      {testimonials[currentTestimonial].metrics.trades}
                    </div>
                    <div className="text-sm text-slate-400 font-medium">Trades Executed</div>
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-white">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="text-amber-400 font-medium">
                        {testimonials[currentTestimonial].title}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Building2 className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-400">{testimonials[currentTestimonial].company}</span>
                        {testimonials[currentTestimonial].verified && (
                          <CheckCircle className="w-4 h-4 text-amber-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-amber-400 fill-current" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center space-x-6 mt-12">
              <motion.button
                className="p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/10"
                onClick={prevTestimonial}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              <div className="flex space-x-3">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`w-4 h-4 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-amber-400' : 'bg-white/30'
                    }`}
                    onClick={() => setCurrentTestimonial(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  />
                ))}
              </div>

              <motion.button
                className="p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/10"
                onClick={nextTestimonial}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
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
                Enter the Vault Elite
              </h3>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Access the same vault-grade platform trusted by crypto institutions worldwide
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.location.href = '/signup'}
                  className="group inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-2xl bg-gradient-to-r from-amber-500 via-purple-600 to-blue-600 text-white shadow-2xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300"
                >
                  <span className="flex items-center space-x-3">
                    <span>Request Vault Access</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => document.querySelector('#demo')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                >
                  <span>Schedule Demo</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}