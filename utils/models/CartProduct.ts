import { Product } from "../types";

export class CartProduct {
    product: Product
    quantity: number

    constructor(product: Product) {
        this.product = product
        this.quantity = 1
    }

    updateQuantity(amount: number) {
        this.quantity = amount
    }

    incrementQuantity() {
        this.quantity++
    }

    decrementQuantity() {
        if (this.quantity > 0) this.quantity--
    }

    getProduct() {
        return this.product
    }
}