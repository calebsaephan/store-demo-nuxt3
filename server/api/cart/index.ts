import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const session = getCookie(event, 'session')
    const data = await redis.hgetall(`cart:${session}`)

    // convert to array [id]: [quantity]
    const sessionCart = data ? Object.entries(data).map((entry) => {
        const id = entry[0].replace('product:', '')
        return ({ [id]: entry[1] })
    }) : []


    return await mapSessionToCart(sessionCart)

})

async function mapSessionToCart(sessionCart: any[]) {
    const ids = sessionCart.flatMap((entry) => Object.keys(entry))

    const data = await prisma.product.findMany({
        where: {
            id: {
                in: ids
            }
        }
    })

    const cart = data.map((entry) => {
        const quantity: number = sessionCart.find(item => Object.keys(item).at(0) === entry.id)[entry.id]

        return {
            product: entry,
            quantity: quantity
        }
    })

    return cart
}