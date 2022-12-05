import { CartProduct } from "~~/utils/classes/Cart";

export const useCart = () => useState<Array<CartProduct>>('cart', () => [])