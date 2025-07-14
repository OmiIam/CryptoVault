const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private token: string | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || 'Request failed' };
      }

      return { data };
    } catch (error) {
      return { error: 'Network error' };
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async patch<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  async login(email: string, password: string) {
    const response = await this.post('/auth/login', { email, password });
    if (response.data?.token) {
      this.setToken(response.data.token);
    }
    return response;
  }

  async register(username: string, email: string, password: string) {
    const response = await this.post('/auth/register', { username, email, password });
    if (response.data?.token) {
      this.setToken(response.data.token);
    }
    return response;
  }

  async logout() {
    this.clearToken();
  }

  async getAssets() {
    return this.get('/assets');
  }

  async getAsset(id: number) {
    return this.get(`/assets/${id}`);
  }

  async executeTrade(assetId: number, type: 'buy' | 'sell', quantity: number, price: number) {
    return this.post('/trades', { assetId, type, quantity, price });
  }

  async getTrades() {
    return this.get('/trades');
  }

  async getPortfolio() {
    return this.get('/trades/portfolio');
  }

  async getUsers() {
    return this.get('/admin/users');
  }

  async updateUserBalance(userId: number, balance: number) {
    return this.patch(`/admin/user/${userId}`, { balance });
  }

  async resetUserPortfolio(userId: number) {
    return this.post(`/admin/reset-user/${userId}`);
  }

  async resetAllPortfolios() {
    return this.post('/admin/reset-all');
  }

  async addBonus(userId: number, amount: number) {
    return this.post(`/admin/bonus/${userId}`, { amount });
  }

  async getUserDashboard(userId: number) {
    return this.get(`/admin/user-dashboard/${userId}`);
  }

  async getLeaderboard() {
    return this.get('/admin/analytics/leaderboard');
  }

  async bulkUpdateUsers(userIds: number[], action: string, value?: number) {
    return this.post('/admin/bulk-update', { userIds, action, value });
  }
}

export const api = new ApiClient();