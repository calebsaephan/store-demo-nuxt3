export async function updateUserCartId(userId: string, cartId: string) {
    const user = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            cartId: cartId
        }
    })

    return user
}