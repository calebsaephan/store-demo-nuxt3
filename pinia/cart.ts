import { Product } from '@prisma/client'
import { defineStore } from 'pinia'
import { CartProduct } from '~/utils/models/CartProduct'

export const useCartStore = defineStore('cart', () => {
    const cart = ref<CartProduct[]>([])

    const loadCart = async () => {
        const data = await $fetch('/api/cart')
        cart.value = []

        data.forEach((item) => {
            const product = new CartProduct(item.product, item.quantity)
            cart.value.push(product)
        })
        
    }

    const addToCart = async (product: Partial<Product>) => {
        const itemExistsInCart = cart.value.find(item => item.product?.id === product.id)

        if (itemExistsInCart) {
            itemExistsInCart.incrementQuantity()
            updateRedisCart(itemExistsInCart.product.id)
        } else {
            const data = await $fetch<Product>("/api/products/" + product.id)

            if (data) {
                const newCartItem: CartProduct = new CartProduct(data)
                cart.value.push(newCartItem)
                updateRedisCart(newCartItem.product.id)
            }
        }

    }

    const removeFromCart = async (productId: Product["id"]) => {
        cart.value = cart.value.filter((item) => item.product.id !== productId)
    }

    const cartSize = computed(() => cart.value.reduce((sum, item) => sum + item.quantity, 0))

    return {
        cart,
        cartSize,
        addToCart,
        removeFromCart,
        loadCart
    }

})

async function updateRedisCart(productId: string) {
    await $fetch("/api/cart", {
        method: "PUT", body: {
            productId: productId
        }
    })
}