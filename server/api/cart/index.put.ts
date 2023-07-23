export default defineEventHandler(async (event) => {
    const session = getCookie(event, 'session')
    const { productId, quantity } = await readBody(event)

    const data = quantity ? await redis.hincrby(`cart:${session}`, `product:${productId}`, quantity) : await redis.hincrby(`cart:${session}`, `product:${productId}`, 1)

    return data
})