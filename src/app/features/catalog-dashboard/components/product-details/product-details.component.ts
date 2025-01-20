import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { Product } from '../../../../core/models/product.model';
import { ProductService } from '../../../../core/services/product.service';
echarts.use([BarChart, GridComponent, CanvasRenderer]);
echarts.use([TooltipComponent]);

@Component({
  selector: 'app-product-details',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgxEchartsModule,
    NgxEchartsDirective,
  ],
  providers: [
    provideEchartsCore({ echarts })
  ],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  selectedProduct: Product | null = null;
  chartOptions: any = {};

  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.productService.selectedProduct$.subscribe((product) => {
      if (product) {
        this.selectedProduct = product;
        this.updateChart(product);
      }
    });

    this.productService.getProducts().subscribe((products) => {
      if (products) {
        this.handleProductListUpdate(products);
      }
    });
  }

  updateChart(product: Product) {
    this.chartOptions = {
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: ['Orders', 'Total Sales', 'Inventory'] },
      yAxis: { type: 'value' },
      series: [
        {
          name: product.name,
          type: 'bar',
          data: [product.orders, product.totalSales, product.inventory],
        },
      ],
    };
  }

  private handleProductListUpdate(products: any[]): void {
    if (this.selectedProduct) {
      const updatedProduct = products.find((p) => p.id === this.selectedProduct?.id);
      if (updatedProduct) {
        this.selectedProduct = updatedProduct;
        this.updateChart(updatedProduct);
      } else {
        this.resetDetails();
      }
    } else {
      console.log('No product selected, no update required.');
    }
  }

  private resetDetails(): void {
    this.selectedProduct = null;
    this.chartOptions = {
      xAxis: { type: 'category', data: [] },
      yAxis: { type: 'value' },
      series: [],
    };
  }
}
