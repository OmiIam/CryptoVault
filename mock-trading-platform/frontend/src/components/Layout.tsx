'use client';

import { ReactNode, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, TrendingUp, BarChart3, User, Settings, LogOut, Menu, X } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { api } from '@/lib/api';
import ToastContainer from '@/components/ui/ToastContainer';

interface LayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Market', href: '/market', icon: TrendingUp },
  { name: 'Trade', href: '/trade', icon: BarChart3 },
  { name: 'Portfolio', href: '/portfolio', icon: User },
];

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    api.logout();
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="relative flex h-screen">
        <motion.div
          initial={false}
          animate={{ x: sidebarOpen ? 0 : -256 }}
          className="fixed inset-y-0 left-0 z-50 w-64 bg-black/20 backdrop-blur-xl border-r border-white/10 lg:translate-x-0 lg:static lg:inset-0"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6">
              <h1 className="text-xl font-bold text-white">TradingPro</h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex-1 px-4 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    whileHover={{ x: 4 }}
                    className={`
                      flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors
                      ${isActive 
                        ? 'bg-white/20 text-white border border-white/30' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }
                    `}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </motion.a>
                );
              })}
            </nav>

            <div className="p-4 border-t border-white/10">
              {user?.isAdmin && (
                <motion.a
                  href="/admin"
                  whileHover={{ x: 4 }}
                  className="flex items-center px-4 py-3 text-sm font-medium text-gray-300 rounded-xl hover:text-white hover:bg-white/10 transition-colors mb-2"
                >
                  <Settings className="mr-3 h-5 w-5" />
                  Admin Panel
                </motion.a>
              )}
              
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-300 rounded-xl hover:text-white hover:bg-white/10 transition-colors"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        </motion.div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-black/20 backdrop-blur-xl border-b border-white/10 px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-white"
              >
                <Menu className="h-6 w-6" />
              </button>
              
              <div className="flex items-center space-x-4">
                {user && (
                  <div className="text-right">
                    <p className="text-sm text-gray-300">Welcome back,</p>
                    <p className="font-semibold text-white">{user.username}</p>
                  </div>
                )}
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}