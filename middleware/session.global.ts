
export default defineNuxtRouteMiddleware(async (to, from) => {
    const session = useSession()
    const sessionCookie = useCookie("session")
    if (!sessionCookie.value && process.client) {
        const { data } = await useFetch("/api/session")
        if (data.value) {
            session.setSession(data.value)
        }
    }

    const cart = useCart()
    cart.load()
})