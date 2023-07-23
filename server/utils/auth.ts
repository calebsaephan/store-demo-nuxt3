import { type BasicCredentials } from '~/composables/useAuth.client'
export async function authenticate(credentials: BasicCredentials) {

    const user = await prisma.user.findFirst({
        where: {
            username: credentials.username.toString(),
            password: credentials.password.toString()
        }
    })

    if (!user) {
        throw createError({ statusCode: 401 })
    } else {

        return user
    }
}