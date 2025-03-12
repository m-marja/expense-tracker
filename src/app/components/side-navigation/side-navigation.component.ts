import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NavigationMenuComponent } from '../navigation-menu/navigation-menu.component';

@Component({
  selector: 'app-side-navigation',
  imports: [MatCardModule, NavigationMenuComponent],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.scss',
})
export class SideNavigationComponent {}
