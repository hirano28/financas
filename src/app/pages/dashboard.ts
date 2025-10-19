import { Component, Signal, computed, inject, signal } from '@angular/core';
import { NgForOf, NgIf, DatePipe, CurrencyPipe, SlicePipe, NgClass, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardChartsComponent } from './dashboard-charts/dashboard-charts';
import { TransactionService } from '../core/services/transaction.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgForOf, NgIf, NgClass, DatePipe, CurrencyPipe, SlicePipe, RouterLink, MatCardModule, MatListModule, MatButtonModule, MatButtonToggleModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, DashboardChartsComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  providers: [provideNativeDateAdapter()]
})
export class DashboardComponent {
  private txService = inject(TransactionService);
  private platformId = inject(PLATFORM_ID);

  txs = this.txService.transactions;

  // Period filter state
  periodMode = signal<'30d' | '90d' | 'ytd' | '12m' | 'custom'>('90d');
  customRange = signal<{ start: string | null; end: string | null }>({ start: null, end: null });

  filteredTxs = computed(() => {
    const all = this.txs();
    const mode = this.periodMode();
    const now = new Date();
    let start: Date | null = null;
    let end: Date | null = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (mode) {
      case '30d':
        start = new Date(end);
        start.setDate(start.getDate() - 29);
        break;
      case '90d':
        start = new Date(end);
        start.setDate(start.getDate() - 89);
        break;
      case 'ytd':
        start = new Date(now.getFullYear(), 0, 1);
        break;
      case '12m':
        start = new Date(now.getFullYear(), now.getMonth() - 11, 1);
        // end to last day of current month
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case 'custom':
        const cr = this.customRange();
        if (cr.start && cr.end) {
          start = new Date(cr.start);
          end = new Date(cr.end);
        }
        break;
    }

    if (!start || !end) return all;
    const s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
    const e = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59, 999).getTime();
    return all.filter(t => {
      const ts = new Date(t.date).getTime();
      return ts >= s && ts <= e;
    });
  });

  income = computed(() => this.filteredTxs().filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0));
  expense = computed(() => this.filteredTxs().filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0));
  balance = computed(() => this.income() - this.expense());

  // Charts
  readonly isBrowser = computed(() => isPlatformBrowser(this.platformId));

  // Handlers
  setPeriod(mode: '30d' | '90d' | 'ytd' | '12m' | 'custom') {
    this.periodMode.set(mode);
  }

  setCustomRange(start: Date | null, end: Date | null) {
    const s = start ? start.toISOString().slice(0, 10) : null;
    const e = end ? end.toISOString().slice(0, 10) : null;
    this.customRange.set({ start: s, end: e });
  }

  setCustomRangeStart(start: Date | null) {
    const current = this.customRange();
    this.setCustomRange(start, current.end ? new Date(current.end) : null);
  }

  setCustomRangeEnd(end: Date | null) {
    const current = this.customRange();
    this.setCustomRange(current.start ? new Date(current.start) : null, end);
  }
}
