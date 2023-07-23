import { Product } from '@prisma/client'
import { defineStore } from 'pinia'
import { CartProduct } from '~/utils/models/CartProduct'

export const useCartStore = defineStore('cart', () => {
    const items = ref<CartProduct[]>([])

    const load = async () => {
        const { data } = await useFetch('/api/cart')
        items.value = []

        if (data.value) {
            data.value.forEach((item) => {
                const product = new CartProduct(item.product, item.quantity)
                items.value.push(product)
            })
        }

    }

    const add = async (product: Partial<Product>, quantity: number) => {
        const itemExistsInCart = items.value.find(item => item.product?.id === product.id)

        if (itemExistsInCart) {
            itemExistsInCart.incrementQuantity()
            updateRedisCart(itemExistsInCart.product.id, quantity)
        } else {
            const { data } = await useFetch<Product>("/api/products/" + product.id)

            if (data.value) {
                const newCartItem: CartProduct = new CartProduct(data.value)
                newCartItem.quantity = quantity ?? 1
                items.value.push(newCartItem)
                updateRedisCart(newCartItem.product.id, quantity)
            }
        }

    }

    const remove = async (productId: Product["id"]) => {
        items.value = items.value.filter((item) => item.product.id !== productId)
    }

    const size = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))

    const transfer = async (newSession: string) => {
        const oldSession = useCookie("session")

        if (!newSession) {
            newSession = oldSession.value!
            await useFetch("/api/cart/user", {
                method: "PUT",
                body: {
                    cartId: newSession
                }
            })
        } else if (oldSession.value != newSession) {
            const oldCart = items.value

            await useFetch("/api/session", {
                method: "PUT"
            })

            load()

            for (let i = 0; i < oldCart.length; i++) {
                add(oldCart[i].product, oldCart[i].quantity)
            }
        } else {
            await useFetch("/api/session", {
                method: "PUT"
            })
        }

        load()
    }

    return {
        items,
        size,
        add,
        remove,
        load,
        transfer
    }

})

async function updateRedisCart(productId: string, quantity: number) {
    await $fetch("/api/cart", {
        method: "PUT", body: {
            productId: productId,
            quantity: quantity
        }
    })
}