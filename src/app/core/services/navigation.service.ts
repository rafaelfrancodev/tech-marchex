import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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
}
