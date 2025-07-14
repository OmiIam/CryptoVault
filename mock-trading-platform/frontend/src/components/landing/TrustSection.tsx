'use client';

import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Award, 
  UserCheck, 
  FileCheck, 
  Globe,
  CheckCircle,
  Star,
  Building2,
  CreditCard
} from 'lucide-react';
import Card from '@/components/ui/Card';

const securityFeatures = [
  {
    icon: Shield,
    title: "Military-Grade Encryption",
    description: "256-bit SSL encryption protects all data transmission and storage.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Lock,
    title: "Two-Factor Authentication",
    description: "Multi-layer security with biometric and SMS verification options.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: CreditCard,
    title: "SIPC Protection",
    description: "Securities protected up to $500,000 by Securities Investor Protection Corporation.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: FileCheck,
    title: "Segregated Accounts",
    description: "Client funds kept separate from company assets for maximum protection.",
    color: "from-orange-500 to-red-500"
  }
];

const compliance = [
  {
    icon: Building2,
    title: "SEC Regulated",
    description: "Registered with the Securities and Exchange Commission"
  },
  {
    icon: Shield,
    title: "FINRA Member",
    description: "Member of Financial Industry Regulatory Authority"
  },
  {
    icon: Globe,
    title: "Global Compliance",
    description: "Licensed to operate in 50+ jurisdictions worldwide"
  },
  {
    icon: UserCheck,
    title: "KYC/AML Compliant",
    description: "Full Know Your Customer and Anti-Money Laundering procedures"
  }
];

const awards = [
  {
    title: "Best Trading Platform 2024",
    organization: "Financial Technology Awards",
    year: "2024"
  },
  {
    title: "Excellence in Innovation",
    organization: "Trading Technology Summit",
    year: "2024"
  },
  {
    title: "Customer Choice Award",
    organization: "Investment Weekly",
    year: "2023"
  },
  {
    title: "Top Security Implementation",
    organization: "FinTech Security Council",
    year: "2023"
  }
];

export default function TrustSection() {
  return (
    <section id="security" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
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
            Your Security is
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"> Our Priority</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Built with institutional-grade security measures and regulatory compliance 
            to protect your investments and personal information.
          </p>
        </motion.div>

        {/* Trust Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {[
            { icon: Shield, value: "100%", label: "Uptime SLA", color: "text-green-400" },
            { icon: Lock, value: "$5M+", label: "Insurance Coverage", color: "text-blue-400" },
            { icon: Award, value: "SOC 2", label: "Type II Certified", color: "text-purple-400" },
            { icon: UserCheck, value: "24/7", label: "Security Monitoring", color: "text-orange-400" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card variant="premium" className="text-center p-6 group">
                <motion.div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 mb-4 group-hover:scale-110 transition-transform"
                  whileHover={{ rotate: 5 }}
                >
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </motion.div>
                <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm font-medium">
                  {stat.label}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <Shield className="h-6 w-6 text-green-400 mr-3" />
              Security Features
            </h3>
            <div className="space-y-6">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <Card variant="default" className="p-6 group hover:border-white/30 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                        whileHover={{ rotate: 5 }}
                      >
                        <feature.icon className="h-6 w-6 text-white" />
                      </motion.div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-green-300 transition-colors">
                          {feature.title}
                        </h4>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <FileCheck className="h-6 w-6 text-blue-400 mr-3" />
              Regulatory Compliance
            </h3>
            <div className="space-y-6">
              {compliance.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <Card variant="default" className="p-6 group hover:border-white/30 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform"
                        whileHover={{ rotate: 5 }}
                      >
                        <item.icon className="h-6 w-6 text-white" />
                      </motion.div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Awards & Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card variant="glow" className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center">
                <Award className="h-6 w-6 text-yellow-400 mr-3" />
                Awards & Recognition
              </h3>
              <p className="text-gray-300">
                Recognized by industry leaders for excellence in trading technology and security.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {awards.map((award, index) => (
                <motion.div
                  key={award.title}
                  className="text-center p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 mb-4"
                    whileHover={{ rotate: 5 }}
                  >
                    <Star className="h-6 w-6 text-white" />
                  </motion.div>
                  <h4 className="text-white font-semibold mb-2 text-sm">
                    {award.title}
                  </h4>
                  <p className="text-gray-400 text-xs mb-1">
                    {award.organization}
                  </p>
                  <p className="text-yellow-400 text-xs font-medium">
                    {award.year}
                  </p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Trust Guarantee */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card variant="premium" className="p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle className="h-8 w-8 text-white" />
              </motion.div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              100% Security Guarantee
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              We're so confident in our security measures that we guarantee your funds and data are protected. 
              If any security breach occurs due to our platform, we'll cover all losses.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Bank-level encryption</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>24/7 monitoring</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Insurance protected</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}