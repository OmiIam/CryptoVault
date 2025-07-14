export interface Trade {
  id: number;
  userId: number;
  assetId: number;
  assetTicker: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  total: number;
  timestamp: string;
}

export interface CreateTradeDto {
  assetId: number;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
}