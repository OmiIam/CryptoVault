export interface Asset {
  id: number;
  name: string;
  ticker: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap?: string;
  volume?: number;
  updatedAt: string;
}

export interface CreateAssetDto {
  name: string;
  ticker: string;
  price: number;
}