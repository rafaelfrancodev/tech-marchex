import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../core/models/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CreateProductComponent } from '../../../create-product/create-product.component';
import { NavigationService } from '../../../../core/services/navigation.service';

@Component({
  selector: 'app-product-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  displayedColumns: string[] = ['name', 'unit', 'orders', 'totalSales', 'inventory'];
  dataSource = new MatTableDataSource<Product>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private navigationService: NavigationService
  ) { }


  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.dataSource.data = products;
      },
      error: (err) => {
        console.error('Error loading products:', err);
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onSelectProduct(product: Product) {
    this.productService.selectProduct(product);

    if (window.innerWidth < 1024) {
      this.dialog.open(ProductDetailsComponent, {
        width: "600px",
        panelClass: 'custom-dialog-container'
      });
    }
  }

  onRightClick(event: MouseEvent, product: any): void {
    event.preventDefault();
    this.navigationService.navigateToEditPage(product)
  }
}
