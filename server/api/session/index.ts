export default defineEventHandler((event) => {
    const session = getCookie(event, 'session')

    if (!session) {
        setCookie(event, 'session', crypto.randomUUID())
    }

    return { session }
})