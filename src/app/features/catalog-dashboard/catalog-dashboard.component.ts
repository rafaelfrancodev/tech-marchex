import { Component } from '@angular/core';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

@Component({
  selector: 'app-catalog-dashboard',
  imports: [ProductListComponent, ProductDetailsComponent],
  templateUrl: './catalog-dashboard.component.html',
  styleUrl: './catalog-dashboard.component.css'
})
export class CatalogDashboardComponent { }
