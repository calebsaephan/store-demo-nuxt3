export interface Product {
    id: number,
    name: string,
    title: string,
    description: string,
    price: number,
    available: boolean
    variations?: Object[],
}