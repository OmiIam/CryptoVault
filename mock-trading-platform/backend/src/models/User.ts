export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  balance: number;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserPortfolio {
  userId: number;
  assetId: number;
  assetTicker: string;
  quantity: number;
  averagePrice: number;
}

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface UpdateBalanceDto {
  balance: number;
}