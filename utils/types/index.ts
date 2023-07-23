export interface Product {
    id: string,
    name: string,
    title: string,
    description: string,
    price: number,
    available: boolean
    variations?: Object[],
}