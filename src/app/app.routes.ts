import { Routes } from '@angular/router';
import { CatalogDashboardComponent } from './features/catalog-dashboard/catalog-dashboard.component';
import { CreateProductComponent } from './features/create-product/create-product.component';

export const routes: Routes = [
    {
        path: "",
        component: CatalogDashboardComponent,
        title: "Marchex - Catalog Dashboard"
    },
    {
        path: "create-product",
        component: CreateProductComponent,
        title: "Marchex - Create Product"

    },
    {
        path: 'edit-product/:id',
        component: CreateProductComponent,
        title: "Marchex - Edit Product"
    },

];
