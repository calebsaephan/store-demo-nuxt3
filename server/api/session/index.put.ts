export default defineEventHandler((event) => {
    const userCookie = getCookie(event, 'user')
    if (userCookie) {
        const user: Awaited<ReturnType<typeof authenticate>> = JSON.parse(userCookie)
        setCookie(event, 'session', user.cartId)
    }
    return 200
})