import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-expenses',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
})
export class ExpensesComponent {
  readonly #fb = inject(FormBuilder);
  readonly #http = inject(HttpClient);
  form: FormGroup;

  categories = [
    'food',
    'emi',
    'school fees',
    'electronics',
    'groceries',
    'travel',
    'fuel',
    'gas',
    'shopping',
    'entertainment',
    'bills',
    'other',
  ];

  constructor() {
    this.form = this.#fb.group({
      date: [null, Validators.required],
      category: ['', Validators.required],
      otherCategory: [''],
      amount: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.#http
        .post('http://localhost:3000/transactions', formData)
        .subscribe({
          next: (res) => {
            const dateValue = this.form.get('date')?.value;
            this.form.reset();
            this.form.patchValue({
              date: dateValue,
            });
          },
          error: (err) => console.error('Error:', err),
        });
    }
  }
}
