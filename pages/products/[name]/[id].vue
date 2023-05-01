<script setup lang="ts">
import { Product } from '~~/utils/types'
const { addToCart } = useCart()
const productParams = useRoute().params

const { data, error } = await useFetch<Product>("/api/mock/products/" + productParams.id)
const photos = [
    "/images/akram.jpg",
    "/images/plomp.jpg",
    "/images/akram.jpg",
    "/images/plomp.jpg",
    "/images/akram.jpg",
    "/images/plomp.jpg",
]

const handleAddToCart = (e: Event) => {
    e.preventDefault()

    const product: Partial<Product> = {
        id: parseInt(productParams.id as string),
    }

    addToCart(product)
}

</script>

<template>
    <div v-if="error">
        <div class="flex">
            <span class="mx-auto">
                This product does not exist or there is an issue with the server
            </span>
        </div>
    </div>
    <div v-else="!error" class="grid grid-cols-1 sm:grid-cols-12 gap-2 bg-slate-100">
        <div class="sm:col-span-8">
            <div class="flex flex-nowrap overflow-x-scroll overflow-y-hidden scroll-smooth bg-red-400 max-h-[80vh]">
                <figure v-for="photo in photos" class="bg-emerald-500 min-w-[90%] min-h-full max-h-full mr-2">
                    <img :src="photo" class="object-cover min-w-full min-h-full max-h-full" />
                </figure>
            </div>
        </div>
        <div id="product-details" class="flex flex-col sm:col-span-4 max-w-full sm:min-w-md sm:max-w-md mx-auto">
            <div>
                <pre class="bg-slate-900 text-white p-4 text-xs">{{ data }}</pre>
            </div>

            <div id="reviews">&star;&star;&star;&star;&star; 778 Reviews</div>
            <div id="product-feature-title">NEW / SALE / CLEARANCE / LIMITED EDITION</div>
            <div id="product-name">{{ data?.title }}</div>
            <div id="product-price">{{ data?.price }}</div>
            <div id="product-description">{{ data?.description }}</div>
            <button @click="handleAddToCart">Add to cart</button>
        </div>
    </div>
</template>