import { updateUserCartId } from "~/server/utils/user"

export default defineEventHandler(async (event) => {
    const userCookie = getCookie(event, "user")
    if (!userCookie) {
        throw createError("Error Transferring Cart")
    }
    const user: Awaited<ReturnType<typeof authenticate>> = JSON.parse(userCookie)
    const { cartId } = await readBody(event)

    return await updateUserCartId(user.id, cartId)
})