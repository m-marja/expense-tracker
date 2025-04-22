import { Routes } from '@angular/router';
import { HistoryComponent } from './components/history/history.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'expenses',
    component: ExpensesComponent,
  },
  {
    path: 'history',
    component: HistoryComponent,
  },
];
