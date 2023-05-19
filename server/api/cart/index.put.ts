export default defineEventHandler(async (event) => {
    const session = getCookie(event, 'session')
    const { productId } = await readBody(event)

    const data = await redis.hincrby(`cart:${session}`, `product:${productId}`, 1)

    return data
})