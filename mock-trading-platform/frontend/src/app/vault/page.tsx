"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Shield, Mail, Phone, MessageCircle, Clock, Vault, CheckCircle, Users } from "lucide-react";
import { LogoWithText } from "@/components/ui/Logo";
import { motion } from "framer-motion";

export default function VaultPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <LogoWithText size="sm" variant="default" />
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-amber-500 to-purple-600 mb-8 shadow-2xl"
            >
              <Vault className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Vault Elite Access
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-white/70 max-w-2xl mx-auto"
            >
              Exclusive institutional-grade trading platform with bank-level security
            </motion.p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-8 md:p-12 mb-12"
          >
            <div className="text-center">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/20 mb-6"
              >
                <Clock className="w-8 h-8 text-amber-400" />
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="text-2xl md:text-3xl font-bold text-white mb-4"
              >
                Contact Support for Access
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-lg text-white/70 mb-8"
              >
                To access Vault Elite features, please contact our support team for verification and account setup.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="bg-white/5 rounded-2xl p-6 mb-8"
              >
                <h3 className="text-xl font-semibold text-white mb-6">
                  Contact Support for More Information
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.5 }}
                    className="flex flex-col items-center text-center group cursor-pointer"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-3 group-hover:bg-blue-500/30 transition-colors"
                    >
                      <Mail className="w-6 h-6 text-blue-400" />
                    </motion.div>
                    <h4 className="font-medium text-white mb-2">Email Support</h4>
                    <a 
                      href="mailto:vault@cryptox360vaultmarkets.com"
                      className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                    >
                      vault@cryptox360vaultmarkets.com
                    </a>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.5 }}
                    className="flex flex-col items-center text-center group cursor-pointer"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-3 group-hover:bg-green-500/30 transition-colors"
                    >
                      <Phone className="w-6 h-6 text-green-400" />
                    </motion.div>
                    <h4 className="font-medium text-white mb-2">Phone Support</h4>
                    <a 
                      href="tel:+1-555-VAULT-360"
                      className="text-green-400 hover:text-green-300 transition-colors"
                    >
                      +1 (555) VAULT-360
                    </a>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="flex flex-col items-center text-center group cursor-pointer"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-3 group-hover:bg-purple-500/30 transition-colors"
                    >
                      <MessageCircle className="w-6 h-6 text-purple-400" />
                    </motion.div>
                    <h4 className="font-medium text-white mb-2">Live Chat</h4>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-purple-400 hover:text-purple-300 transition-colors px-4 py-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20"
                    >
                      Start Chat
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>

              <div className="text-sm text-white/60">
                <p>Support Hours: Monday - Friday, 8:00 AM - 8:00 PM EST</p>
                <p>Emergency Support: 24/7 for Vault Elite members</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="grid md:grid-cols-2 gap-6"
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-amber-400/30 transition-all duration-300 group"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-amber-500/20 to-purple-500/20 flex items-center justify-center mr-3 group-hover:from-amber-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                  <Users className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Institutional Features
                </h3>
              </div>
              <ul className="text-white/70 space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                  <span>Advanced order types & algorithms</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                  <span>Prime brokerage services</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                  <span>Custom API endpoints</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-amber-400/30 transition-all duration-300 group"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center mr-3 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                  <Shield className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Vault Security
                </h3>
              </div>
              <ul className="text-white/70 space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                  <span>Multi-signature cold storage</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                  <span>Hardware security modules</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                  <span>Insurance coverage</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                  <span>Regulatory compliance</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}