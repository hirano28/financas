import { Component, effect, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TransactionService } from '../core/services/transaction.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Transaction } from '../core/models/transaction';

@Component({
  selector: 'app-lancamentos',
  standalone: true,
  imports: [FormsModule, DatePipe, CurrencyPipe, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './lancamentos.html',
  styleUrl: './lancamentos.scss'
})
export class LancamentosComponent {
  private txService = inject(TransactionService);

  txs = this.txService.transactions;

  displayedColumns: string[] = ['date', 'description', 'type', 'amount', 'actions'];
  dataSource = new MatTableDataSource<Transaction>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // sincroniza tabela com signal
    effect(() => {
      const data = this.txs();
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // normalizar sorting por data e valor
    this.dataSource.sortingDataAccessor = (item: Transaction, property: string) => {
      switch (property) {
        case 'date':
          return new Date(item.date).getTime();
        case 'amount':
          return item.type === 'expense' ? -item.amount : item.amount;
        default:
          return (item as any)[property];
      }
    };
  }

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
