import { PrismaClient } from "@prisma/client"
import { randomInt } from "crypto"
const prisma = new PrismaClient()

async function main() {
    await prisma.product.deleteMany()

    const itemSize = 10
    for (let i = 0; i < itemSize; i++) {
        const data = await prisma.product.create({
            data: {
                sku: `SKU-ABCD-${i}-0`,
                name: `shoe-${i}`,
                displayName: `Shoe ${i}`,
                description: "Sample description",
                price: randomInt(1, 300) + randomInt(1, 100)/100
            }
        })
        console.log(data);
        
    }

}

main().then(async () => {
    await prisma.$disconnect()
    console.log("done seeding");
    
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})