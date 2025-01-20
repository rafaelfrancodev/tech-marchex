import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NavigationService } from '../../core/services/navigation.service';
import { ProductService } from '../../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-create-product',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup;
  id?: string | null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private navigationService: NavigationService,
    private route: ActivatedRoute
  ) {
    this.productForm = this.buildForm();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.loadProductById(this.id);
    }
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      id: [{ value: null, disabled: true }],
      name: ['', [Validators.required, Validators.maxLength(40)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      unit: [null, [Validators.required, Validators.min(0.01)]],
      orders: [null, [Validators.required, Validators.min(1)]],
      imageLink: [
        '',
        [Validators.required, Validators.pattern(/https?:\/\/.+\.(jpg|jpeg|png)$/)],
      ],
    });
  }

  onUpsert(): void {
    const product = this.productForm.value;
    const operation$ = this.id
      ? this.productService.updateProduct(this.id, product)
      : this.productService.addProduct(product);

    operation$.subscribe({
      next: () => {
        alert(`Product ${this.id ? 'updated' : 'added'} successfully!`);
        this.productForm.reset();
        this.navigationService.goToCatalog();
      },
      error: (err) => {
        console.error(`Failed to ${this.id ? 'update' : 'add'} product:`, err);
        alert(`Failed to ${this.id ? 'update' : 'add'} the product. Please try again.`);
      },
    });
  }

  onReset(): void {
    const emptyProduct = {
      name: null,
      description: null,
      unit: null,
      orders: null,
      imageLink: null
    } as unknown as Partial<Product>;

    this.id
      ? this.productForm.patchValue(emptyProduct)
      : this.productForm.reset();
  }

  onDelete(): void {
    if (this.id) {
      this.productService.deleteProduct(this.id).subscribe({
        next: () => {
          alert('Product deleted successfully!');
          this.productForm.reset();
          this.navigationService.goToCatalog();
        },
        error: (err) => {
          console.error('Failed to delete product:', err);
          alert('Failed to delete the product. Please try again later.');
        },
      });
    } else {
      alert('No product selected to delete.');
    }
  }

  private loadProductById(id: string): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => this.productForm.patchValue(product),
      error: (err) => {
        console.error('Error loading the product:', err);
        alert('Failed to load the product. Please try again later.');
      },
    });
  }
}
