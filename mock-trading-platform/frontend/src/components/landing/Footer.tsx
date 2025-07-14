'use client';

import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Youtube,
  Facebook,
  ArrowRight,
  Shield,
  FileText,
  HelpCircle,
  BookOpen,
  BarChart3,
  Globe
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const footerLinks = {
  platform: [
    { name: 'Trading Dashboard', href: '#platform' },
    { name: 'Mobile Apps', href: '#platform' },
    { name: 'API Documentation', href: '#' },
    { name: 'System Status', href: '#' },
    { name: 'Pricing', href: '#pricing' },
  ],
  resources: [
    { name: 'Learning Center', href: '#learn' },
    { name: 'Market Analysis', href: '#' },
    { name: 'Trading Guides', href: '#' },
    { name: 'Webinars', href: '#' },
    { name: 'Blog', href: '#' },
  ],
  support: [
    { name: 'Help Center', href: '#' },
    { name: 'Contact Support', href: '#' },
    { name: 'Live Chat', href: '#' },
    { name: 'Community Forum', href: '#' },
    { name: 'Submit Ticket', href: '#' },
  ],
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Press Kit', href: '#' },
    { name: 'Partnerships', href: '#' },
    { name: 'Investor Relations', href: '#' },
  ],
  legal: [
    { name: 'Terms of Service', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Risk Disclosure', href: '#' },
    { name: 'Regulatory Information', href: '#' },
    { name: 'Cookie Policy', href: '#' },
  ]
};

const socialLinks = [
  { icon: Twitter, href: '#', name: 'Twitter' },
  { icon: Linkedin, href: '#', name: 'LinkedIn' },
  { icon: Youtube, href: '#', name: 'YouTube' },
  { icon: Facebook, href: '#', name: 'Facebook' },
];

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone Support',
    value: '+1 (555) 123-4567',
    subtitle: 'Available 24/7'
  },
  {
    icon: Mail,
    title: 'Email Support',
    value: 'support@tradingpro.com',
    subtitle: 'Response within 2 hours'
  },
  {
    icon: MapPin,
    title: 'Headquarters',
    value: '123 Financial District',
    subtitle: 'New York, NY 10004'
  }
];

export default function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
  };

  return (
    <footer className="bg-gradient-to-b from-slate-800 to-black border-t border-white/10">
      {/* Newsletter Section */}
      <section className="py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card variant="glow" className="p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Stay Ahead of the Markets
                  </h2>
                  <p className="text-xl text-gray-300 mb-6">
                    Get exclusive market insights, trading tips, and platform updates 
                    delivered to your inbox every week.
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Shield className="h-4 w-4 text-green-400" />
                      <span>No spam, ever</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Mail className="h-4 w-4 text-blue-400" />
                      <span>Weekly insights</span>
                    </div>
                  </div>
                </div>

                <div>
                  <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          className="w-full"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 whitespace-nowrap"
                      >
                        Subscribe
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-400">
                      By subscribing, you agree to our Privacy Policy and consent to receive updates.
                    </p>
                  </form>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Main Footer Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">TradingPro</span>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                The professional trading platform trusted by thousands of traders worldwide. 
                Trade with confidence using our advanced tools and institutional-grade execution.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Links Sections */}
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-5 gap-8">
              {Object.entries(footerLinks).map(([category, links], sectionIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: sectionIndex * 0.1 }}
                >
                  <h3 className="text-white font-semibold mb-4 capitalize flex items-center">
                    {category === 'platform' && <BarChart3 className="h-4 w-4 mr-2" />}
                    {category === 'resources' && <BookOpen className="h-4 w-4 mr-2" />}
                    {category === 'support' && <HelpCircle className="h-4 w-4 mr-2" />}
                    {category === 'company' && <Globe className="h-4 w-4 mr-2" />}
                    {category === 'legal' && <FileText className="h-4 w-4 mr-2" />}
                    {category}
                  </h3>
                  <ul className="space-y-3">
                    {links.map((link, linkIndex) => (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: sectionIndex * 0.1 + linkIndex * 0.05 }}
                      >
                        <a
                          href={link.href}
                          className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                        >
                          {link.name}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {contactInfo.map((contact, index) => (
              <motion.div
                key={contact.title}
                className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center"
                  whileHover={{ rotate: 5 }}
                >
                  <contact.icon className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <h4 className="text-white font-medium text-sm">{contact.title}</h4>
                  <p className="text-blue-400 font-semibold">{contact.value}</p>
                  <p className="text-gray-400 text-xs">{contact.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Bar */}
          <motion.div
            className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <p>&copy; 2024 TradingPro. All rights reserved.</p>
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <Shield className="h-3 w-3 text-green-400" />
                  <span>SEC Regulated</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Shield className="h-3 w-3 text-green-400" />
                  <span>SIPC Protected</span>
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.href = '/login'}
                className="text-gray-400 hover:text-white"
              >
                Sign In
              </Button>
              <Button
                size="sm"
                onClick={() => window.location.href = '/login'}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Start Trading
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Strip */}
      <motion.section
        className="py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
            <div>
              <h3 className="text-white font-bold text-lg mb-1">
                Ready to Start Your Trading Journey?
              </h3>
              <p className="text-blue-100 text-sm">
                Join thousands of successful traders. Create your free account today.
              </p>
            </div>
            <motion.div
              className="mt-4 md:mt-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                onClick={() => window.location.href = '/login'}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </footer>
  );
}