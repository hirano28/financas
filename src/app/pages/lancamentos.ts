import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { TransactionService } from '../core/services/transaction.service';

@Component({
  selector: 'app-lancamentos',
  standalone: true,
  imports: [FormsModule, NgForOf],
  templateUrl: './lancamentos.html',
  styleUrl: './lancamentos.scss'
})
export class LancamentosComponent {
  private txService = inject(TransactionService);

  txs = this.txService.transactions;

  // form model
  model = {
    date: new Date().toISOString().slice(0, 10),
    description: '',
    amount: 0,
    type: 'expense' as 'income' | 'expense'
  };

  add() {
    if (!this.model.description || !this.model.date || !this.model.amount) return;
    this.txService.add({
      date: this.model.date,
      description: this.model.description,
      amount: Math.abs(this.model.amount),
      type: this.model.type
    });
    this.model.description = '';
    this.model.amount = 0;
  }

  remove(id: string) {
    this.txService.remove(id);
  }
}
