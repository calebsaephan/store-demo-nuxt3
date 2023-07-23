import crypto from "crypto"

export default defineEventHandler((event) => {
    const sessionId = getCookie(event, "session")

    if (!sessionId) {
        const newSession = crypto.randomUUID()
        setCookie(event, 'session', newSession)
        return newSession
    }

    return sessionId
})