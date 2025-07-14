'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Play, Shield, Users, TrendingUp, BarChart3, Zap } from 'lucide-react';

const headlines = [
  "Trade with Confidence",
  "Invest Intelligently", 
  "Build Wealth"
];

export default function SimpleHero() {
  const [currentHeadline, setCurrentHeadline] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToFeatures = () => {
    document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/95 to-slate-950" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[calc(100vh-10rem)]">
          
          {/* Content Column */}
          <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1">
            
            {/* Main Headline */}
            <div className="mb-8 lg:mb-12">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.85] mb-6 lg:mb-8">
                <span className="block bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  {headlines[currentHeadline]}
                </span>
                <span className="block text-white">
                  on Wall Street
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl lg:text-3xl text-slate-300 max-w-3xl mx-auto lg:mx-0 leading-relaxed font-light">
                Institutional-grade trading platform with{' '}
                <span className="text-white font-medium">advanced analytics</span>,{' '}
                <span className="text-white font-medium">real-time execution</span>,{' '}
                and professional-grade security.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10 lg:mb-12">
              <div className="flex items-center space-x-2 px-4 py-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <Shield className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-semibold text-white/90">SEC Regulated</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <Shield className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-semibold text-white/90">SIPC Protected</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <Shield className="h-4 w-4 text-violet-400" />
                <span className="text-sm font-semibold text-white/90">ISO 27001</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start mb-12 lg:mb-16">
              <button
                onClick={() => window.location.href = '/login'}
                className="relative inline-flex items-center justify-center font-semibold rounded-2xl px-10 py-5 text-lg min-h-[64px] bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 hover:from-blue-500 hover:via-violet-500 hover:to-blue-500 text-white shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5"
              >
                <span className="flex items-center space-x-3">
                  <span className="font-semibold tracking-wide">Start Trading Today</span>
                  <ArrowRight className="h-5 w-5" />
                </span>
              </button>
              
              <button
                onClick={scrollToFeatures}
                className="relative inline-flex items-center justify-center font-semibold rounded-2xl px-10 py-5 text-lg min-h-[64px] bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/30 shadow-xl shadow-black/25 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5"
              >
                <span className="flex items-center space-x-3">
                  <Play className="h-5 w-5" />
                  <span className="font-semibold tracking-wide">Explore Platform</span>
                </span>
              </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {[
                { icon: Users, value: "50K+", label: "Active Traders", color: "from-blue-500 to-cyan-500" },
                { icon: BarChart3, value: "$2.5B+", label: "Daily Volume", color: "from-emerald-500 to-green-500" },
                { icon: Shield, value: "99.9%", label: "Uptime", color: "from-violet-500 to-purple-500" },
                { icon: Zap, value: "<10ms", label: "Execution", color: "from-amber-500 to-orange-500" }
              ].map((metric, index) => (
                <div key={metric.label} className="group">
                  <div className="relative p-6 lg:p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-black/25">
                    
                    <div className="flex items-center justify-center mb-4 lg:mb-6">
                      <div className={`p-4 rounded-2xl bg-gradient-to-r ${metric.color} shadow-lg`}>
                        <metric.icon className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                      </div>
                    </div>
                    
                    <div className="text-center mb-2">
                      <div className="text-2xl lg:text-4xl font-black text-white mb-1 font-mono tracking-tight">
                        {metric.value}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm lg:text-base text-slate-400 font-semibold">
                        {metric.label}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trading Panel Column */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-2xl">
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
                
                <div className="relative p-6 lg:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-white font-bold text-lg">Live Trading</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-emerald-500/20 px-3 py-1.5 rounded-full border border-emerald-400/30">
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                      <span className="text-emerald-400 font-mono text-sm font-bold">+2.47%</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-2xl p-6 mb-6 border border-white/5">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-white font-bold text-2xl">SPY</h3>
                        <p className="text-slate-400 text-sm">S&P 500 ETF</p>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-mono text-xl font-bold">$447.85</div>
                        <div className="flex items-center text-emerald-400 text-sm font-medium">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          +$5.23 (1.18%)
                        </div>
                      </div>
                    </div>
                    
                    <div className="h-32 bg-gradient-to-t from-emerald-500/10 to-transparent rounded-lg border border-emerald-500/20 flex items-center justify-center">
                      <div className="text-emerald-400 text-center">
                        <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                        <span className="text-sm font-medium">Market Trending Up</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-white font-semibold text-lg flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2 text-blue-400" />
                        Portfolio
                      </h4>
                    </div>
                    
                    {[
                      { symbol: 'AAPL', name: 'Apple Inc.', price: 175.43, change: '+1.35%' },
                      { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.67, change: '+2.14%' }
                    ].map((stock) => (
                      <div key={stock.symbol} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-xl flex items-center justify-center border border-white/10">
                            <span className="text-white font-bold text-sm">{stock.symbol.charAt(0)}</span>
                          </div>
                          <div>
                            <div className="text-white font-semibold text-sm">{stock.symbol}</div>
                            <div className="text-slate-400 text-xs">{stock.name}</div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-white font-mono text-sm font-semibold">
                            ${stock.price.toFixed(2)}
                          </div>
                          <div className="text-emerald-400 text-xs font-medium">
                            {stock.change}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}