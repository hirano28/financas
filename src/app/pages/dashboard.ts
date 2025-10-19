import { Component, computed, inject } from '@angular/core';
import { NgForOf, NgIf, DatePipe, CurrencyPipe, SlicePipe, NgClass, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardChartsComponent } from './dashboard-charts/dashboard-charts';
import { TransactionService } from '../core/services/transaction.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgForOf, NgIf, NgClass, DatePipe, CurrencyPipe, SlicePipe, RouterLink, MatCardModule, MatListModule, MatButtonModule, DashboardChartsComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent {
  private txService = inject(TransactionService);
  private platformId = inject(PLATFORM_ID);

  txs = this.txService.transactions;

  income = computed(() => this.txs().filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0));
  expense = computed(() => this.txs().filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0));
  balance = computed(() => this.income() - this.expense());

  // Charts
  readonly isBrowser = computed(() => isPlatformBrowser(this.platformId));
}
