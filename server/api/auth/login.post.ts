import { authenticate } from "~/server/utils/auth"

export default defineEventHandler(async (event) => {
    let basicAuthorization = getHeader(event, "authorization")

    if (!basicAuthorization) {
        throw createError({ statusCode: 401, message: "Unauthorized" })
    } else {
        basicAuthorization = basicAuthorization?.replace("Basic ", "")
        basicAuthorization = atob(basicAuthorization)
        const creds = basicAuthorization.split(":")

        const user = await authenticate({
            username: creds[0],
            password: creds[1]
        })

        if (user && user.id) {
            setCookie(event, "user", JSON.stringify(user))
        }

        return user
    }
})