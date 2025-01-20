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
import { ProductService } from '../../core/services/product.service';
import { debounceTime, Subject } from 'rxjs';
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
    private productService: ProductService,
    private navigationService: NavigationService,
  ) {
    this.searchTextChanged.pipe(debounceTime(300)).subscribe((searchText) => {
      this.productService.filterByName(searchText);
    });
  }

  navigateToCatalog() {
    this.navigationService.goToCatalog();
  }

  navigateToCreateProduct() {
    this.navigationService.goToCreateProduct();
  }

  toggleSidenav() {
    this.isSidenavOpened = !this.isSidenavOpened;
  }

  applyFilters(filters: any) {
    this.productService.applyFilters(filters);
  }

  onSearchChange(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const searchText = input.value;
    console.log("event", searchText)

    this.searchTextChanged.next(searchText);
  }
}
