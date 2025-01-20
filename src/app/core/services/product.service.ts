import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { Product } from '../models/product.model';
import { JsonServerService } from './jsonServer.service';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private selectedProductSource = new BehaviorSubject<Product | null>(null);
    private originalProducts = new BehaviorSubject<Product[]>([]);
    private products = new BehaviorSubject<Product[]>([]);
    private filters = new BehaviorSubject<any>({
        unitCost: null,
        unitCostComparison: 'gt',
        totalSales: null,
        totalSalesComparison: 'gt',
        searchText: '',
    });

    selectedProduct$ = this.selectedProductSource.asObservable();
    filters$ = this.filters.asObservable();
    products$ = this.products.asObservable();

    constructor(private apiService: JsonServerService) {
        this.loadProducts();
    }

    getProductById(id: string): Observable<Product[]> {
        return this.apiService.getProductById(id);
    }

    getProducts(): Observable<Product[]> {
        return this.products$;
    }

    selectProduct(product: Product): void {
        this.selectedProductSource.next(product);
    }

    applyFilters(filters: any): void {
        const currentFilters = { ...this.filters.value, ...filters };
        this.filters.next(currentFilters);
        this.filterCombined(currentFilters);
    }

    filterByName(searchText: string): void {
        this.applyFilters({ searchText });
    }

    addProduct(newProduct: Product): Observable<void> {
        return this.apiService.createProduct(newProduct).pipe(
            tap(() => this.loadProducts()),
            catchError(this.handleError('add product'))
        );
    }

    updateProduct(id: string, updatedProduct: Product): Observable<void> {
        return this.apiService.updateProduct(id, updatedProduct).pipe(
            tap(() => this.loadProducts()),
            catchError(this.handleError('update product'))
        );
    }

    deleteProduct(id: string): Observable<void> {
        return this.apiService.deleteProduct(id).pipe(
            tap(() => this.loadProducts()),
            catchError(this.handleError('delete product'))
        );
    }

    private loadProducts(): void {
        this.apiService.getProducts().subscribe({
            next: (products: Product[]) => {
                const updatedProducts = products.map((product) => ({
                    ...product,
                    totalSales: product.unit * product.orders,
                }));

                this.originalProducts.next(updatedProducts);
                this.products.next(updatedProducts);
            },
            error: this.handleError('load products'),
        });
    }

    private handleError(operation: string) {
        return (error: any): Observable<never> => {
            console.error(`Failed to ${operation}:`, error);
            throw error;
        };
    }

    private filterCombined(filters: any): void {
        const { unitCost, unitCostComparison, totalSales, totalSalesComparison, searchText } = filters;

        const filteredProducts = this.originalProducts.value.filter((product) => {
            const matchesName = searchText
                ? product.name.toLowerCase().includes(searchText.trim().toLowerCase())
                : true;

            const matchesUnitCost =
                unitCost !== null && unitCost !== ''
                    ? unitCostComparison === 'gt'
                        ? +product.unit > +unitCost
                        : +product.unit < +unitCost
                    : true;

            const matchesTotalSales =
                totalSales !== null && totalSales !== ''
                    ? totalSalesComparison === 'gt'
                        ? product.totalSales > +totalSales
                        : product.totalSales < +totalSales
                    : true;

            return matchesName && matchesUnitCost && matchesTotalSales;
        });

        this.products.next(filteredProducts);
    }
}
