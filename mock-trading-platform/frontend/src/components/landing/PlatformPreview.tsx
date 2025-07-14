'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  PieChart, 
  Monitor,
  Smartphone,
  Tablet,
  ChevronLeft,
  ChevronRight,
  Play
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const features = [
  {
    id: 'dashboard',
    title: 'Trading Dashboard',
    description: 'Comprehensive overview of your portfolio, positions, and market performance with real-time updates.',
    icon: Monitor,
    image: '/api/placeholder/800/500',
    highlights: [
      'Real-time portfolio tracking',
      'Customizable widgets',
      'Advanced charting tools',
      'Risk management metrics'
    ]
  },
  {
    id: 'charts',
    title: 'Advanced Charting',
    description: 'Professional-grade charts with 100+ technical indicators and drawing tools for in-depth analysis.',
    icon: BarChart3,
    image: '/api/placeholder/800/500',
    highlights: [
      '100+ technical indicators',
      'Multiple timeframes',
      'Drawing tools & annotations',
      'Price alerts & notifications'
    ]
  },
  {
    id: 'portfolio',
    title: 'Portfolio Management',
    description: 'Intelligent portfolio analysis with asset allocation, performance metrics, and rebalancing suggestions.',
    icon: PieChart,
    image: '/api/placeholder/800/500',
    highlights: [
      'Asset allocation analysis',
      'Performance attribution',
      'Risk assessment tools',
      'Rebalancing recommendations'
    ]
  },
  {
    id: 'mobile',
    title: 'Mobile Trading',
    description: 'Full-featured mobile app with all desktop capabilities, optimized for trading on the go.',
    icon: Smartphone,
    image: '/api/placeholder/800/500',
    highlights: [
      'iOS & Android apps',
      'Offline chart viewing',
      'Push notifications',
      'Biometric authentication'
    ]
  }
];

const devices = [
  { id: 'desktop', name: 'Desktop', icon: Monitor },
  { id: 'tablet', name: 'Tablet', icon: Tablet },
  { id: 'mobile', name: 'Mobile', icon: Smartphone }
];

export default function PlatformPreview() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeDevice, setActiveDevice] = useState('desktop');

  const nextFeature = () => {
    setActiveFeature((prev) => (prev + 1) % features.length);
  };

  const prevFeature = () => {
    setActiveFeature((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            See Our Platform
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> In Action</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore the features that make our platform the choice of professional traders worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column - Feature List */}
          <div className="lg:col-span-4 space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                className={`cursor-pointer transition-all duration-300 ${
                  index === activeFeature ? 'scale-105' : 'hover:scale-102'
                }`}
                onClick={() => setActiveFeature(index)}
                whileHover={{ x: 5 }}
              >
                <Card 
                  variant={index === activeFeature ? 'premium' : 'default'}
                  className={`p-6 border-2 transition-all duration-300 ${
                    index === activeFeature 
                      ? 'border-blue-500/50 bg-blue-500/10' 
                      : 'border-transparent hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <motion.div
                      className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                        index === activeFeature
                          ? 'bg-gradient-to-br from-blue-500 to-purple-600'
                          : 'bg-white/10'
                      }`}
                      whileHover={{ rotate: 5 }}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </motion.div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-lg font-bold mb-2 transition-colors ${
                        index === activeFeature ? 'text-blue-300' : 'text-white'
                      }`}>
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Right Column - Preview */}
          <div className="lg:col-span-8">
            <Card variant="premium" className="p-6">
              {/* Device Selector */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  {devices.map((device) => (
                    <motion.button
                      key={device.id}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                        activeDevice === device.id
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                      onClick={() => setActiveDevice(device.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <device.icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{device.name}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center space-x-2">
                  <motion.button
                    className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                    onClick={prevFeature}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                    onClick={nextFeature}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>

              {/* Preview Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeFeature}-${activeDevice}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Mock Interface Preview */}
                  <div className={`relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 ${
                    activeDevice === 'mobile' ? 'max-w-sm mx-auto aspect-[9/16]' :
                    activeDevice === 'tablet' ? 'max-w-2xl mx-auto aspect-[4/3]' :
                    'aspect-[16/10]'
                  }`}>
                    {/* Mock Browser/App Bar */}
                    <div className="flex items-center space-x-2 p-3 bg-slate-700/50 border-b border-white/10">
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      {activeDevice === 'desktop' && (
                        <div className="flex-1 bg-slate-600/50 rounded px-3 py-1 text-xs text-gray-300">
                          tradingpro.com/dashboard
                        </div>
                      )}
                    </div>

                    {/* Mock Content */}
                    <div className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-semibold">{features[activeFeature].title}</h3>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-xs text-green-400">LIVE</span>
                        </div>
                      </div>

                      {/* Mock Chart/Data */}
                      <div className="h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg p-3 border border-white/10">
                        <svg className="w-full h-full" viewBox="0 0 200 100">
                          <motion.path
                            d="M10,50 Q50,30 100,40 T190,20"
                            stroke="#10B981"
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                          />
                        </svg>
                      </div>

                      {/* Mock Data Rows */}
                      <div className="space-y-2">
                        {[1, 2, 3].map((item) => (
                          <motion.div
                            key={item}
                            className="flex items-center justify-between p-2 bg-white/5 rounded"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: item * 0.1 }}
                          >
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded"></div>
                              <span className="text-white text-sm">Asset {item}</span>
                            </div>
                            <span className="text-green-400 text-sm">+{(Math.random() * 5).toFixed(2)}%</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Feature Highlights */}
                  <div className="grid grid-cols-2 gap-4">
                    {features[activeFeature].highlights.map((highlight, index) => (
                      <motion.div
                        key={highlight}
                        className="flex items-center space-x-2 text-sm text-gray-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <motion.div
                          className="w-2 h-2 bg-blue-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        />
                        <span>{highlight}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex items-center justify-center space-x-4 mt-8">
                <Button
                  variant="secondary"
                  className="group"
                  onClick={() => {/* Demo functionality */}}
                >
                  <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Try Demo
                </Button>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600"
                  onClick={() => window.location.href = '/login'}
                >
                  Start Trading
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}