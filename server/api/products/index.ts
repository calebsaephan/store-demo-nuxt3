import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const data = await prisma.product.findMany({
        include: {
            images: {
                where: {
                    hero: true,
                },
            },
        },
    })
    return data
})
