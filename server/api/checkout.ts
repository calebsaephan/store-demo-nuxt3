const config = useRuntimeConfig()
import Stripe from "stripe"
const stripe = new Stripe(config.stripeKey, { apiVersion: '2022-11-15' })

import { getCartSession, convertRedisCartToCart, mapCartToStripePayment } from "../utils/cart"

export default defineEventHandler(async (event) => {

    const session = getCookie(event, 'session')
    if (session) {
        const data = await getCartSession(session)
        const dataTransformed = await convertRedisCartToCart(data)

        const stripeSession = await stripe.checkout.sessions.create({
            line_items: mapCartToStripePayment(dataTransformed),
            mode: 'payment',
            success_url: config.stripeSuccessUrl,
            cancel_url: config.stripeCancelUrl
        })

        if (stripeSession.url) {
            return stripeSession.url
        } else {
            throw createError("Stripe Checkout Error")
        }
    } else {
        throw createError("Session Error")
    }
})