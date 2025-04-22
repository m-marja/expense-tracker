import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation-menu',
  imports: [RouterModule, MatListModule],
  templateUrl: './navigation-menu.component.html',
  styleUrl: './navigation-menu.component.scss',
})
export class NavigationMenuComponent {
  menuItem = [
    {
      label: 'Dashboard',
      route: '',
    },
    {
      label: 'Record Expense',
      route: '/expenses',
    },
    {
      label: 'History',
      route: '/history',
    },
  ];
}
