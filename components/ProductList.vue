<script setup lang="ts">
import { Product, Image } from '@prisma/client'
const loading = ref(true)
const { data: products } = await useFetch<(Product & Image)[]>("/api/products")
if (products) loading.value = false
</script>
<template>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div v-if="loading && !products">Loading...</div>
        <div v-else-if="!loading && !products">No products found</div>
        <div v-else v-for="product in products">
            <figure class="flex flex-auto flex-col">
                <div class="w-full bg-slate-500">
                    <figure v-if="product.images[0]" :id="product.images[0].id">
                        <img :src="product.images[0].url" class="object-cover min-w-full min-h-full max-h-full" />
                    </figure>
                    <span v-else class="block pt-[100%]"></span>
                </div>

                <div id="product-info-card" class="flex flex-col justify-start grow py-2 text-sm">
                    <div id="product-sale" v-if="product.sale">{{ product.sale }}</div>
                    <div class="flex justify-between">
                        <div id="product-title" class="font-semibold text-base">
                            <NuxtLink :href="`/products/${product.name}/${product.id}`">
                                {{ product.displayName }}
                            </NuxtLink>
                        </div>
                        <div id="product-price" class="flex flex-col relative top-1">{{ formatPrice(product.price) }}</div>
                    </div>
                    <div id="product-subtitle" class="text-xs mb-2">Men's Shoe</div>
                    <div id="product-variety" v-if="product.variations"></div>
                    <div id="product description" class="line-clamp-2">{{ product.description }}</div>
                </div>
            </figure>
        </div>
    </div>
</template>