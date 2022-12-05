<script setup lang="ts">
const cart = useCart()

const { data } = await useFetch("/api/mock/products")
let products = data.value?.default
products = products?.concat(products)
products = products?.concat(products)

</script>
<template>
    <h1>Aegis Footwear</h1>
    <div class="flex flex-wrap justify-start">
        <div class="flex md:max-w-sm md:w-1/4 sm:w-1/3 w-full m-2" v-for="product in products">
            <figure class="flex flex-auto flex-col">
                <div class="w-full h-80 bg-slate-500"></div>

                <div id="product-info-card" class="flex flex-col justify-end grow p-2 text-sm">
                    <!-- <div id="product-sale" v-if="product.sale">{{ product.sale }}</div> -->
                    <div class="flex justify-between">
                        <div id="product-title" class="font-semibold text-base">
                            <NuxtLink href="/products/underground-stompers/12345">
                                {{ product.title }}
                            </NuxtLink>
                        </div>
                        <div id="product-price" class="flex flex-col relative top-1">{{ product.price }}</div>
                    </div>
                    <div id="product-subtitle" class="text-xs mb-2">Men's Shoe</div>
                    <div id="product-variety" v-if="product.variations.length">{{ product.variations.length }}</div>
                    <div id="product description">Nulla et lorem quis quam egestas egestas quis nec eros.</div>
                </div>
            </figure>
        </div>
    </div>
    <div>
        {{ cart }}
    </div>
</template>