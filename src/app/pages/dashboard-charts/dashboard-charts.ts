import { CommonModule, isPlatformBrowser, NgIf } from '@angular/common';
import { Component, Input, OnChanges, PLATFORM_ID, SimpleChanges, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartOptions, registerables } from 'chart.js';
import { Transaction } from '../../core/models/transaction';

@Component({
  selector: 'app-dashboard-charts',
  standalone: true,
  imports: [CommonModule, NgIf, MatCardModule, BaseChartDirective],
  templateUrl: './dashboard-charts.html',
  styleUrl: './dashboard-charts.scss'
})
export class DashboardChartsComponent implements OnChanges {
  @Input() txs: Transaction[] = [];

  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  lineData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  lineOptions: ChartOptions<'line'> = { responsive: true, maintainAspectRatio: false };

  donutData: ChartConfiguration<'doughnut'>['data'] = { labels: [], datasets: [] };
  donutOptions: ChartOptions<'doughnut'> = { responsive: true, maintainAspectRatio: false };

  constructor() {
    if (this.isBrowser) {
      Chart.register(...registerables);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.isBrowser) return;
    if (changes['txs']) {
      const labels = this.buildMonthlyLabels(6);
      const income = this.sumByMonth('income', 6);
      const expense = this.sumByMonth('expense', 6);

      this.lineData = {
        labels,
        datasets: [
          { label: 'Receitas', data: income, borderColor: '#2e7d32', backgroundColor: 'rgba(46,125,50,0.2)', tension: 0.3 },
          { label: 'Despesas', data: expense.map(v => -v), borderColor: '#c62828', backgroundColor: 'rgba(198,40,40,0.2)', tension: 0.3 },
        ],
      };

      const totalIncome = this.txs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
      const totalExpense = this.txs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
      this.donutData = {
        labels: ['Receitas', 'Despesas'],
        datasets: [{ data: [totalIncome, totalExpense], backgroundColor: ['#2e7d32', '#c62828'] }],
      };
    }
  }

  private buildMonthlyLabels(n: number): string[] {
    const out: string[] = [];
    const now = new Date();
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      out.push(d.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' }));
    }
    return out;
  }

  private sumByMonth(type: 'income' | 'expense', n: number): number[] {
    const sums = Array(n).fill(0);
    const now = new Date();
    for (const t of this.txs) {
      if (t.type !== type) continue;
      const td = new Date(t.date);
      const diffMonths = (now.getFullYear() - td.getFullYear()) * 12 + (now.getMonth() - td.getMonth());
      if (diffMonths >= 0 && diffMonths < n) {
        const idx = n - 1 - diffMonths;
        sums[idx] += t.amount;
      }
    }
    return sums;
  }
}
