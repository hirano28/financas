export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string; // ISO date string (YYYY-MM-DD)
  description: string;
  amount: number; // positive number; sign is derived from type
  type: TransactionType;
  categoryId?: string;
  accountId?: string;
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime
}
