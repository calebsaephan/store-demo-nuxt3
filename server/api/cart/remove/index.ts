export default defineEventHandler(async (event) => {
    const { productId } = getQuery(event)
    const session = getCookie(event, 'session')

    if (productId) {
        const data = await redis.hdel(`cart:${session}`, `product:${productId}`)
        return data
    }

    return "removed"
})