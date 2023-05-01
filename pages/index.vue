<script setup lang="ts">
const cart = useCart()

const { data } = await useFetch("/api/mock/products")

let products = JSON.parse(JSON.stringify(data.value))
products = products!.concat(products)
products = products.concat(products)
// console.log(products);


</script>
<template>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:max-w-5xl">
        <div class="" v-for="product in products">
            <figure class="flex flex-auto flex-col">
                <div class="w-full bg-slate-500">
                    <span class="block pt-[100%]"></span>
                </div>

                <div id="product-info-card" class="flex flex-col justify-start grow p-2 text-sm">
                    <!-- <div id="product-sale" v-if="product.sale">{{ product.sale }}</div> -->
                    <div class="flex justify-between">
                        <div id="product-title" class="font-semibold text-base">
                            <NuxtLink :href="`/products/underground-stompers/${product.id}`">
                                {{ product.title }}
                            </NuxtLink>
                        </div>
                        <div id="product-price" class="flex flex-col relative top-1">{{ product.price }}</div>
                    </div>
                    <div id="product-subtitle" class="text-xs mb-2">Men's Shoe</div>
                    <div id="product-variety" v-if="product.variations.length">{{ product.variations.length }}</div>
                    <div id="product description">{{ product.description }}</div>
                </div>
            </figure>
        </div>
    </div>
    <div>
        {{ cart }}
    </div>
</template>