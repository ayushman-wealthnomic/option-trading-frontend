// src/types/index.ts

export interface Stock {
  symbol: string;
  ltp: number;
  change: number;
  companyName: string;
  industry: string;
  history: number[];
}



export type SortKey = 'symbol' | 'change';
export type SortOrder = 'asc' | 'desc';

export interface SortState {
  key: SortKey;
  order: SortOrder;
}