<script setup lang="ts">
import { Product } from '@prisma/client'
import { triggerCartAnimationKey } from '~~/shared/symbols'
const { addToCart } = useCart()
const productParams = useRoute().params

const { data, error } = await useFetch<Partial<Product>>("/api/products/" + productParams.id, {
    transform: (d: Partial<Product>) => {
        Object.assign(d, { status: ["new"] })
        return d
    }
})

const photos = [
    "/images/akram.jpg",
    "/images/plomp.jpg",
    "/images/akram.jpg",
    "/images/plomp.jpg",
    "/images/akram.jpg",
    "/images/plomp.jpg",
]

const triggerCartAnimation = inject(triggerCartAnimationKey)

const buttonDisabled = ref(false)
const handleAddToCart = (e: Event) => {
    e.preventDefault()

    buttonDisabled.value = true
    setTimeout(() => {
        buttonDisabled.value = false
    }, 200)


    const product: Partial<Product> = {
        id: productParams.id as string,
    }

    addToCart(product)

    if (triggerCartAnimation) {
        triggerCartAnimation()
    }

}

</script>

<template>
    <div class="container max-w-6xl mx-auto">
        <div v-if="error">
            <div class="flex">
                <span class="mx-auto">
                    This product does not exist or there is an issue with the server
                </span>
            </div>
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-12 gap-8">
            <div class="sm:col-span-8 rounded">
                <div
                    class="flex flex-nowrap overflow-x-scroll overflow-y-hidden scroll-smooth snap-x max-h-[80vh] sm:max-h-[50vh]">
                    <figure v-for="photo in photos"
                        class="bg-emerald-500 min-w-[90%] min-h-full max-h-full ml-2 snap-center">
                        <img :src="photo" class="object-cover min-w-full min-h-full max-h-full" />
                    </figure>
                </div>
            </div>
            <div id="product-details"
                class="flex flex-col sm:col-span-4 max-w-full sm:min-w-md sm:max-w-md px-4 py-2 rounded">
                <div>
                    <div hidden>
                        <pre
                            class="bg-slate-900 text-white p-4 text-xs whitespace-pre-wrap overflow-auto max-w-full">{{ data }}</pre>
                    </div>

                    <!-- <div id="reviews">&star;&star;&star;&star;&star; 778 Reviews</div> -->
                    <div id="product-status">
                        <span id="product-new" v-if="data?.status?.includes('new')"
                            class="text-xs font-semibold">NEW</span>
                        <span id="product-sale" v-if="data?.status?.includes('sale')" class="text-xs text-red-400 font-semibold">SALE / CLEARANCE</span>
                        <span id="product-feature" v-if="data?.status?.includes('limited')" class="text-xs text-indigo-400 font-semibold">LIMITED EDITION</span>
                    </div>
                    <div id="product-main-title" class="my-4">
                        <div id="product-name" class="text-xl font-semibold">{{ data?.displayName }}</div>
                        <div id="product-price" class="font-semibold">{{ formatPrice(Number(data?.price)) }}</div>
                    </div>
                    <div id="product-description">{{ data?.description }}</div>
                    <div id="product-actions" class="mt-4">
                        <PrimaryButton @click=" handleAddToCart " :disabled=" buttonDisabled " class="w-full rounded-3xl">Add to
                            Cart</PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#product-sale::before,
#product-feature::before {
    content: '\00B7';
    margin: 0 .5rem;
    @apply text-black;
}</style>