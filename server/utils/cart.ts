import { H3Event } from 'h3'
import Stripe from "stripe"
import { prisma } from './prisma'

export const getCartSession = async (session: string) => {
    const data = await redis.hgetall(`cart:${session}`)

    return data
}

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

export async function convertRedisCartToCart(data: Awaited<ReturnType<typeof getCartSession>>) {
    // convert to array [id]: [quantity]
    const sessionCart = data ? Object.entries(data).map((entry) => {
        const id = entry[0].replace('product:', '')
        return ({ [id]: entry[1] })
    }) : []


    return await mapSessionToCart(sessionCart)
}

export function mapCartToStripePayment(cartItems: Awaited<ReturnType<typeof convertRedisCartToCart>>): Stripe.Checkout.SessionCreateParams.LineItem[] {
    const stripeLineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = []
    for (let i = 0; i < cartItems.length; i++) {
        stripeLineItems[i] = {
            price_data: {
                currency: 'USD',
                product_data: {
                    name: cartItems[i].product.displayName
                },
                unit_amount_decimal: convertPriceToUnitAmountDecimal(cartItems[i].product.price)
            },
            quantity: cartItems[i].quantity
        }
    }
    return stripeLineItems
}

function convertPriceToUnitAmountDecimal(price: number | string): string {
    return (Number(price) * 100).toString()
}