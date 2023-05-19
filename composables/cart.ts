import { Product } from "@prisma/client"
import { storeToRefs } from "pinia"
import { useCartStore } from "~/pinia/cart"
import { CartProduct } from "~~/utils/models/CartProduct"

export const useCart = () => {
    /**
     * we shouldn't use classes in nuxt usestate, but in theory this should work
     * future: can replace with pinia
     */
    const cartStore = useCartStore()
    const { cart } = storeToRefs(cartStore)

    const loadCart = async () => {
        const data = await $fetch('/api/cart')
        cart.value = []

        data.forEach((item) => {
            const product = new CartProduct(item.product, item.quantity)
            cart.value.push(product)
        })
        console.log(data, cart);
        
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
        cart: cart.value,
        cartSize,
        addToCart,
        removeFromCart,
        loadCart
    }
}

async function updateRedisCart(productId: string) {
    await $fetch("/api/cart", {
        method: "PUT", body: {
            productId: productId
        }
    })
}