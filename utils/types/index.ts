export interface Product {
    id: number,
    name: string,
    title: string,
    price: number,
    available: boolean
    variations?: Object[],
}