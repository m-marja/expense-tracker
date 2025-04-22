import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { TransactionsService } from '../../services/transactions.service';
import { CommonModule, DatePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import { Transaction } from '../../interfaces/transactions.interface';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { getMonthNames, getYears } from '../../untils/get-year-month';

@Component({
  selector: 'app-history',
  providers: [TransactionsService, DatePipe],
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef);
  readonly #transactionsService = inject(TransactionsService);
  readonly #fb = inject(FormBuilder);
  readonly #datePipe = inject(DatePipe);

  form: FormGroup;

  selectedYear = new Date().getFullYear();

  selectedMonth = new Date().toLocaleString('default', { month: 'long' });

  years = getYears(2000);

  months = getMonthNames();

  allTransactions: Transaction[] = [];

  dataSource: Transaction[] = [];

  displayedColumns: string[] = [];

  constructor() {
    this.form = this.#fb.group({
      year: [this.selectedYear],
      month: [this.selectedMonth],
    });
  }

  ngOnInit(): void {
    this.getAllTransactions();
  }

  getAllTransactions() {
    this.#transactionsService
      .getTransactions()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((transactions) => {
        this.allTransactions = transactions;
        this.applyFilter(this.selectedYear, this.selectedMonth);
      });
  }

  applyFilter(selectedYear: number, selectedMonth: string) {
    const filteredData = this.allTransactions.filter((data) => {
      const date = new Date(data.date);
      const year = date.getFullYear();
      const month = date.toLocaleString('default', { month: 'long' });
      return year === selectedYear && month === selectedMonth;
    });
    this.dataSource = filteredData || [];
    if (this.dataSource.length > 0) {
      this.displayedColumns = Object.keys(this.dataSource[0]).filter(
        (key) => key !== 'id' && key !== 'otherCategory'
      );
    }
  }

  getColumnData(dataSource: any, col: string) {
    if (col === 'date') {
      return this.#datePipe.transform(dataSource[col], 'dd-MMM-yyyy');
    }
    if (col === 'category' && dataSource[col] === 'other') {
      return dataSource.otherCategory;
    }

    return dataSource[col];
  }

  onSubmit() {
    this.selectedYear = this.form.get('year')?.value;
    this.selectedMonth = this.form.get('month')?.value;

    this.applyFilter(this.selectedYear, this.selectedMonth);
  }
}
