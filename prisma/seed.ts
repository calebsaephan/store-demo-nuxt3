import { PrismaClient } from "@prisma/client"
import { randomInt } from "crypto"
const prisma = new PrismaClient()

async function main() {
    seedUsers()
    seedProducts()
}

main().then(async () => {
    await prisma.$disconnect()
    console.log("done seeding")

}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})

async function seedProducts() {
    await prisma.product.deleteMany()

    const itemSize = 10
    for (let i = 0; i < itemSize; i++) {
        const data = await prisma.product.create({
            data: {
                sku: `SKU-ABCD-${i}-0`,
                name: `shoe-${i}`,
                displayName: `Shoe ${i}`,
                description: "Sample description",
                price: randomInt(1, 300) + randomInt(1, 100) / 100
            }
        })
        console.log(data)

    }
}

async function seedUsers() {
    await prisma.user.deleteMany()

    const data = await prisma.user.create({
        data: {
            username: "test",
            password: "test"
        }
    })
}