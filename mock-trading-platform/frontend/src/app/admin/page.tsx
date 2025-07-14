'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, RefreshCw, DollarSign, Trash2, Plus, Eye, CheckSquare, Square } from 'lucide-react';
import Layout from '@/components/Layout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import UserDashboardModal from '@/components/admin/UserDashboardModal';
import Leaderboard from '@/components/admin/Leaderboard';
import { api } from '@/lib/api';

interface User {
  id: number;
  username: string;
  email: string;
  balance: number;
  isAdmin: boolean;
  createdAt: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<{ [key: string]: boolean }>({});
  const [editingBalance, setEditingBalance] = useState<{ [key: number]: string }>({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [viewingUser, setViewingUser] = useState<{ id: number; username: string } | null>(null);
  const [bulkValue, setBulkValue] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.getUsers();
      if (response.data && Array.isArray(response.data)) {
        setUsers(response.data as User[]);
      } else if (response.error) {
        setMessage(response.error);
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error fetching users');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text: string, type: 'success' | 'error' = 'success') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleUpdateBalance = async (userId: number) => {
    const newBalance = editingBalance[userId];
    if (!newBalance || isNaN(parseFloat(newBalance))) return;

    setActionLoading(prev => ({ ...prev, [`balance-${userId}`]: true }));

    try {
      const response = await api.updateUserBalance(userId, parseFloat(newBalance));
      if (response.error) {
        showMessage(response.error, 'error');
      } else {
        showMessage('Balance updated successfully');
        setEditingBalance(prev => ({ ...prev, [userId]: '' }));
        fetchUsers();
      }
    } catch (error) {
      showMessage('Error updating balance', 'error');
    } finally {
      setActionLoading(prev => ({ ...prev, [`balance-${userId}`]: false }));
    }
  };

  const handleResetUser = async (userId: number) => {
    if (!confirm('Are you sure you want to reset this user\'s portfolio? This will delete all their trades and reset their balance to $10,000.')) {
      return;
    }

    setActionLoading(prev => ({ ...prev, [`reset-${userId}`]: true }));

    try {
      const response = await api.resetUserPortfolio(userId);
      if (response.error) {
        showMessage(response.error, 'error');
      } else {
        showMessage('User portfolio reset successfully');
        fetchUsers();
      }
    } catch (error) {
      showMessage('Error resetting user portfolio', 'error');
    } finally {
      setActionLoading(prev => ({ ...prev, [`reset-${userId}`]: false }));
    }
  };

  const handleResetAll = async () => {
    if (!confirm('Are you sure you want to reset ALL user portfolios? This action cannot be undone.')) {
      return;
    }

    setActionLoading(prev => ({ ...prev, 'reset-all': true }));

    try {
      const response = await api.resetAllPortfolios();
      if (response.error) {
        showMessage(response.error, 'error');
      } else {
        showMessage('All portfolios reset successfully');
        fetchUsers();
      }
    } catch (error) {
      showMessage('Error resetting portfolios', 'error');
    } finally {
      setActionLoading(prev => ({ ...prev, 'reset-all': false }));
    }
  };

  const handleAddBonus = async (userId: number, amount: number) => {
    setActionLoading(prev => ({ ...prev, [`bonus-${userId}`]: true }));

    try {
      const response = await api.addBonus(userId, amount);
      if (response.error) {
        showMessage(response.error, 'error');
      } else {
        showMessage(`$${amount} bonus added successfully`);
        fetchUsers();
      }
    } catch (error) {
      showMessage('Error adding bonus', 'error');
    } finally {
      setActionLoading(prev => ({ ...prev, [`bonus-${userId}`]: false }));
    }
  };

  const toggleUserSelection = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const selectAllUsers = () => {
    const nonAdminUsers = users.filter(user => !user.isAdmin).map(user => user.id);
    setSelectedUsers(prev => 
      prev.length === nonAdminUsers.length ? [] : nonAdminUsers
    );
  };

  const handleBulkOperation = async (action: string) => {
    if (selectedUsers.length === 0) {
      showMessage('Please select users first', 'error');
      return;
    }

    setActionLoading(prev => ({ ...prev, [`bulk-${action}`]: true }));

    try {
      let value: number | undefined;
      if (action === 'setBalance' || action === 'addBonus') {
        value = parseFloat(bulkValue);
        if (isNaN(value) || value < 0) {
          showMessage('Please enter a valid amount', 'error');
          return;
        }
      }

      const response = await api.bulkUpdateUsers(selectedUsers, action, value);
      if (response.error) {
        showMessage(response.error, 'error');
      } else {
        showMessage(`${action} completed for ${selectedUsers.length} users`);
        setSelectedUsers([]);
        setBulkValue('');
        fetchUsers();
      }
    } catch (error) {
      showMessage(`Error performing ${action}`, 'error');
    } finally {
      setActionLoading(prev => ({ ...prev, [`bulk-${action}`]: false }));
    }
  };

  const handleViewUser = (userId: number, username: string) => {
    setViewingUser({ id: userId, username });
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-300">Manage users and monitor performance</p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={fetchUsers}
              variant="secondary"
              size="sm"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button
              onClick={handleResetAll}
              loading={actionLoading['reset-all']}
              variant="danger"
              size="sm"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Reset All
            </Button>
          </div>
        </motion.div>

        {/* Leaderboard Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Leaderboard onViewUser={handleViewUser} />
        </motion.div>

        {/* Bulk Operations */}
        {selectedUsers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-blue-400" />
                <span className="text-white font-medium">
                  {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Input
                  placeholder="Amount"
                  value={bulkValue}
                  onChange={(e) => setBulkValue(e.target.value)}
                  className="w-24 py-1 text-sm"
                />
                <Button
                  onClick={() => handleBulkOperation('setBalance')}
                  loading={actionLoading['bulk-setBalance']}
                  size="sm"
                  variant="secondary"
                >
                  Set Balance
                </Button>
                <Button
                  onClick={() => handleBulkOperation('addBonus')}
                  loading={actionLoading['bulk-addBonus']}
                  size="sm"
                  variant="secondary"
                >
                  Add Bonus
                </Button>
                <Button
                  onClick={() => handleBulkOperation('resetPortfolio')}
                  loading={actionLoading['bulk-resetPortfolio']}
                  size="sm"
                  variant="danger"
                >
                  Reset All
                </Button>
                <Button
                  onClick={() => setSelectedUsers([])}
                  size="sm"
                  variant="ghost"
                >
                  Clear
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {message && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-4 rounded-lg ${
              messageType === 'success' 
                ? 'bg-green-500/20 border border-green-500/30 text-green-200'
                : 'bg-red-500/20 border border-red-500/30 text-red-200'
            }`}
          >
            {message}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-0 overflow-hidden">
            <div className="p-6 bg-white/5 border-b border-white/10">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-400 mr-2" />
                <h2 className="text-xl font-bold text-white">User Management</h2>
                <span className="ml-3 text-sm text-gray-400">({users.length} total users)</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-sm">
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-5 text-left">
                      <motion.button
                        onClick={selectAllUsers}
                        className="flex items-center gap-3 text-sm font-semibold text-gray-300 hover:text-white transition-all duration-300 group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          className="relative"
                          whileHover={{ rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {selectedUsers.length === users.filter(u => !u.isAdmin).length ? (
                            <CheckSquare className="h-4 w-4 text-blue-400" />
                          ) : (
                            <Square className="h-4 w-4 group-hover:text-blue-400 transition-colors" />
                          )}
                        </motion.div>
                        <span className="group-hover:text-blue-300 transition-colors">User Information</span>
                        <motion.div 
                          className="h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent w-0 group-hover:w-16 transition-all duration-500"
                        />
                      </motion.button>
                    </th>
                    <th className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-sm font-semibold text-gray-300">Portfolio Balance</span>
                        <motion.div 
                          className="w-2 h-2 bg-green-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                    </th>
                    <th className="px-6 py-5 text-center">
                      <span className="text-sm font-semibold text-gray-300">Management Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-gradient-to-b from-transparent to-white/2">
                  {users.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        scale: 1.01,
                        transition: { type: "spring", stiffness: 400, damping: 25 }
                      }}
                      className="group hover:bg-gradient-to-r hover:from-white/8 hover:via-white/5 hover:to-white/8 transition-all duration-500 cursor-pointer border-l-2 border-transparent hover:border-blue-400/50"
                    >
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-4">
                          {!user.isAdmin && (
                            <motion.button
                              onClick={() => toggleUserSelection(user.id)}
                              className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <motion.div
                                animate={selectedUsers.includes(user.id) ? { scale: [1, 1.2, 1] } : {}}
                                transition={{ duration: 0.3 }}
                              >
                                {selectedUsers.includes(user.id) ? (
                                  <CheckSquare className="h-4 w-4 text-blue-400" />
                                ) : (
                                  <Square className="h-4 w-4" />
                                )}
                              </motion.div>
                            </motion.button>
                          )}
                          <div>
                            <div className="flex items-center">
                              <motion.span 
                                className="font-medium text-white group-hover:text-blue-300 transition-colors"
                                whileHover={{ x: 2 }}
                              >
                                {user.username}
                              </motion.span>
                              {user.isAdmin && (
                                <motion.span 
                                  className="ml-2 px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full"
                                  whileHover={{ scale: 1.1 }}
                                  transition={{ type: "spring", stiffness: 300 }}
                                >
                                  Admin
                                </motion.span>
                              )}
                            </div>
                            <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{user.email}</div>
                            <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                              Joined {new Date(user.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="space-y-3">
                          <motion.div 
                            className="font-bold text-xl text-white group-hover:text-green-300 transition-colors flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                          >
                            <span className="text-green-400 text-sm">$</span>
                            {user.balance.toLocaleString()}
                          </motion.div>
                          <div className="flex items-center gap-2">
                            <motion.div whileHover={{ scale: 1.02 }}>
                              <Input
                                placeholder="New balance"
                                value={editingBalance[user.id] || ''}
                                onChange={(e) => setEditingBalance(prev => ({ 
                                  ...prev, 
                                  [user.id]: e.target.value 
                                }))}
                                className="text-sm py-2 px-3 w-28 bg-white/5"
                                variant="minimal"
                              />
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Button
                                onClick={() => handleUpdateBalance(user.id)}
                                loading={actionLoading[`balance-${user.id}`]}
                                size="sm"
                                disabled={!editingBalance[user.id]}
                                variant="secondary"
                              >
                                Update
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-3">
                          <motion.div whileHover={{ scale: 1.05 }}>
                            <Button
                              onClick={() => handleViewUser(user.id, user.username)}
                              size="sm"
                              variant="ghost"
                              className="text-blue-400 hover:text-blue-300"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }}>
                            <Button
                              onClick={() => handleAddBonus(user.id, 1000)}
                              loading={actionLoading[`bonus-${user.id}`]}
                              size="sm"
                              variant="secondary"
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              $1K
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }}>
                            <Button
                              onClick={() => handleResetUser(user.id)}
                              loading={actionLoading[`reset-${user.id}`]}
                              size="sm"
                              variant="danger"
                              disabled={user.isAdmin}
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Reset
                            </Button>
                          </motion.div>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card>
            <div className="text-center">
              <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-white">Total Users</h3>
              <p className="text-2xl font-bold text-blue-400">{users.length}</p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-white">Total Balance</h3>
              <p className="text-2xl font-bold text-green-400">
                ${users.reduce((sum, user) => sum + user.balance, 0).toLocaleString()}
              </p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-white">Active Traders</h3>
              <p className="text-2xl font-bold text-purple-400">
                {users.filter(user => !user.isAdmin).length}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* User Dashboard Modal */}
        {viewingUser && (
          <UserDashboardModal
            userId={viewingUser.id}
            username={viewingUser.username}
            isOpen={!!viewingUser}
            onClose={() => setViewingUser(null)}
          />
        )}
      </div>
    </Layout>
  );
}