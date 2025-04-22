import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../interfaces/transactions.interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  readonly #http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/transactions';

  getTransactions(): Observable<Transaction[]> {
    return this.#http.get<Transaction[]>(this.apiUrl);
  }
}
