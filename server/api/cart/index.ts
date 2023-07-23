import { convertRedisCartToCart, getCartSession } from "~/server/utils/cart"

export default defineEventHandler(async (event) => {
    const session = getCookie(event, 'session')
    if (session) {
        const data = await getCartSession(session)
        return await convertRedisCartToCart(data)
    } else {
        throw createError("Session Error")
    }
})

