import { Component, computed, inject } from '@angular/core';
import { NgForOf, NgIf, DatePipe, CurrencyPipe, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TransactionService } from '../core/services/transaction.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgForOf, NgIf, DatePipe, CurrencyPipe, SlicePipe, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent {
  private txService = inject(TransactionService);

  txs = this.txService.transactions;

  income = computed(() => this.txs().filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0));
  expense = computed(() => this.txs().filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0));
  balance = computed(() => this.income() - this.expense());
}
