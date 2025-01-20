import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    constructor(private router: Router) { }

    goToCatalog() {
        this.router.navigate(['/']);
    }

    goToCreateProduct() {
        this.router.navigate(['/create-product']);
    }

    navigateToEditPage(product: Product): void {
        this.router.navigate(['/edit-product', product.id]);
    }
}
