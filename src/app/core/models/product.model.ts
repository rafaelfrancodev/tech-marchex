export interface Product {
    id: string,
    name: string;
    unit: number;
    orders: number;
    description: string;
    imageLink: string;
    totalSales: number;
    inventory?: number;
}