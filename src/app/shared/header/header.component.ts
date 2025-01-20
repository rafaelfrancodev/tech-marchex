import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FiltersComponent } from './components/filters/filters.component';
import { RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { NavigationService } from '../../core/services/navigation.service';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    MatIconModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    FiltersComponent,
    RouterOutlet
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isSidenavOpened = false;
  searchTextChanged = new Subject<string>();

  constructor(
    private navigationService: NavigationService,
  ) { }

  navigateToCatalog() {
    this.navigationService.goToCatalog();
  }

  navigateToCreateProduct() {
    this.navigationService.goToCreateProduct();
  }

  toggleSidenav() {
    this.isSidenavOpened = !this.isSidenavOpened;
  }

  applyFilters(filters: any) { }

  onSearchChange(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const searchText = input.value
    this.searchTextChanged.next(searchText);
  }
}
