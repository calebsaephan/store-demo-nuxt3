import { useCartStore } from "~/pinia/cart"

export const useCart = () => {
    return useCartStore()
}