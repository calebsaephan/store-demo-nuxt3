<script setup lang="ts">
const cart = useCart()

const { data } = await useFetch("/api/mock/products")
const products = data.value?.default

</script>
<template>
    <h1>Hello welcome to my store!</h1>
    <figure v-for="product in products">
        {{ product }}
        <img />
        <div id="product-info-card">
            <div id="product-notice">SALE</div>
            <div id="product-title">
                <NuxtLink href="/products/underground-stompers/12345">
                    {{ product.title }}
                </NuxtLink>
            </div>
            <div id="product-subtitle">Men's Shoe</div>
            <div id="product-variety" v-if="product.variations.length">{{ product.variations.length }}</div>
            <div id="product-price">{{ product.price }}</div>
        </div>
    </figure>

    <div>
        {{ cart }}
    </div>
</template>