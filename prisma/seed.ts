import { PrismaClient } from "@prisma/client";
import { randomInt, randomUUID } from "crypto";
const prisma = new PrismaClient();

const images = [
    {
        url: "/images/ss/ssg_01.avif",
        hero: true,
    },
    {
        url: "/images/ss/ssg_02.avif",
    },
    {
        url: "/images/ss/ssg_03.avif",
    },
    {
        url: "/images/ss/ssg_04.avif",
    },
    {
        url: "/images/ss/ssg_05.avif",
    },
    {
        url: "/images/ss/ssg_06.avif",
    },
    {
        url: "/images/ss/ssg_07.avif",
    },
    {
        url: "/images/ss/ssg_08.avif",
    },
];

const videos = [
    {
        url: "/images/ss/ssg_video.webm",
    },
];

const defaultImages = [
    {
        url: "/images/akram.jpg",
    },
    {
        url: "/images/plomp.jpg",
    },
    {
        url: "/images/akram.jpg",
    },
    {
        url: "/images/plomp.jpg",
    },
    {
        url: "/images/akram.jpg",
    },
    {
        url: "/images/plomp.jpg",
    },
    {
        url: "/images/akram.jpg",
    },
    {
        url: "/images/plomp.jpg",
    },
    {
        url: "/images/akram.jpg",
    },
    {
        url: "/images/plomp.jpg",
    },
    {
        url: "/images/akram.jpg",
    },
    {
        url: "/images/plomp.jpg",
    },
];

async function main() {
    await prisma.image.deleteMany();
    await prisma.video.deleteMany();
    seedUsers();
    seedProducts();
}

main()
    .then(async () => {
        await prisma.$disconnect();
        console.log("done seeding");
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

async function seedProducts() {
    await prisma.product.deleteMany();

    const itemSize = 10;
    await prisma.product.create({
        data: {
            sku: `SKU-SSG-1-0`,
            name: `superstar-storm-green`,
            displayName: `Superstar Shoes`,
            description:
                "A legend for over 50 years, the adidas Superstar shoes stay as fresh as the original design with always-evolving details. The two-tone serrated 3-Stripes on this version add a playful texture and color pop. The signature rubber shell toe and sleek profile have timeless style. The final winning combination? These sneakers are as comfortable as they are good-looking.",
            price: randomInt(1, 300) + randomInt(1, 100) / 100,
            images: {
                create: images,
            },
            videos: {
                create: videos,
            },
        },
    });
    for (let i = 1; i < itemSize; i++) {
        await prisma.product.create({
            data: {
                sku: `SKU-ABCD-${i}-0`,
                name: `shoe-${i}`,
                displayName: `Shoe ${i}`,
                description: "Sample description",
                price: randomInt(1, 300) + randomInt(1, 100) / 100,
                images: {
                    create: defaultImages,
                },
            },
        });
    }
}

async function seedUsers() {
    await prisma.user.deleteMany();

    const data = await prisma.user.create({
        data: {
            username: "test",
            password: "test",
        },
    });
}
