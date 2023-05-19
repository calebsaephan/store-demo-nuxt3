import { default as data } from "@/data/products.json"
export default defineEventHandler((event) => {
    const productId = event.context.params!.id

    if (!Number.isInteger(productId)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Product ID should be an integer'
        })
    }

    const product = data.find((item) => item.id === productId)
    
    return product
})