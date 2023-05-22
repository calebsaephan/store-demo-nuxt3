<script setup lang="ts">
import { Product } from '@prisma/client'
const loading = ref(true)
const { data: products } = await useFetch<Product[]>("/api/products")
if (products) loading.value = false
</script>
<template>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div v-if="loading && !products">Loading...</div>
        <div v-else-if="!loading && !products">No products found</div>
        <div v-else v-for="product in products">
            <figure class="flex flex-auto flex-col">
                <div class="w-full bg-slate-500">
                    <span class="block pt-[100%]"></span>
                </div>

                <div id="product-info-card" class="flex flex-col justify-start grow p-2 text-sm">
                    <div id="product-sale" v-if="product.sale">{{ product.sale }}</div>
                    <div class="flex justify-between">
                        <div id="product-title" class="font-semibold text-base">
                            <NuxtLink :href="`/products/${product.name}/${product.id}`">
                                {{ product.displayName }}
                            </NuxtLink>
                        </div>
                        <div id="product-price" class="flex flex-col relative top-1">{{ product.price }}</div>
                    </div>
                    <div id="product-subtitle" class="text-xs mb-2">Men's Shoe</div>
                    <div id="product-variety" v-if="product.variations"></div>
                    <div id="product description">{{ product.description }}</div>
                </div>
            </figure>
        </div>
    </div>
</template>