import { CartProduct } from "~~/utils/models/CartProduct"
import { Product } from "~/utils/types"

export const useCart = () => {
    const cart = useState<Array<CartProduct>>('cart', () => [])


    const addToCart = async (product: Partial<Product>) => {
        const itemExistsInCart = cart.value.find(item => item.product?.id === product.id)

        if (itemExistsInCart) {
            itemExistsInCart.incrementQuantity()
        } else {
            const { data, error } = await useFetch<Product>("/api/mock/products/" + product.id)

            if (data.value) {
                const newCartItem: CartProduct = new CartProduct(data.value)
                cart.value.push(newCartItem)
            }
        }
    }

    return {
        cart: cart.value,
        addToCart
    }
}