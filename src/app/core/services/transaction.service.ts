import { Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { Transaction } from '../models/transaction';

const STORAGE_KEY = 'financas:transactions';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  readonly transactions = signal<Transaction[]>([]);

  constructor(private storage: StorageService) {
    const initial = this.storage.getItem<Transaction[]>(STORAGE_KEY, []);
    this.transactions.set(initial);
  }

  add(tx: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    const newTx: Transaction = { id: crypto.randomUUID(), createdAt: now, updatedAt: now, ...tx };
    const list = [newTx, ...this.transactions()];
    this.transactions.set(list);
    this.storage.setItem(STORAGE_KEY, list);
  }

  update(id: string, patch: Partial<Omit<Transaction, 'id'>>) {
    const list = this.transactions().map(t => (t.id === id ? { ...t, ...patch, updatedAt: new Date().toISOString() } : t));
    this.transactions.set(list);
    this.storage.setItem(STORAGE_KEY, list);
  }

  remove(id: string) {
    const list = this.transactions().filter(t => t.id !== id);
    this.transactions.set(list);
    this.storage.setItem(STORAGE_KEY, list);
  }
}
