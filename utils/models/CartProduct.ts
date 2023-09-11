import { Product, Image, Video } from "@prisma/client";

export class CartProduct {
    product:
        | Product
        | (Product & Image)
        | (Product & Video)
        | (Product & Image & Video);
    quantity: number;

    constructor(product: Product, quantity: number = 1) {
        this.product = product;
        this.quantity = quantity;
    }

    updateQuantity(amount: number) {
        this.quantity = amount;
    }

    incrementQuantity() {
        this.quantity++;
    }

    decrementQuantity() {
        if (this.quantity > 0) this.quantity--;
    }
}
