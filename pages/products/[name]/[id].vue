<script setup lang="ts">
import { Product } from '~~/utils/types'
const { cart, addToCart } = useCart()
const productParams = useRoute().params

const { data, error } = await useFetch<Product>("/api/mock/products/" + productParams.id)


const handleAddToCart = (e: Event) => {
    e.preventDefault()

    const product: Partial<Product> = {
        id: parseInt(productParams.id as string),
    }

    addToCart(product)
}

</script>
<template>
    <div>
        <div>
            <figure>
                <img />
            </figure>
        </div>
        <div id="product-details">
            {{ data }} {{ error }}
            <div id="product-price">{{ data?.price }}</div>
            <div id="product-description">{{ data?.description }}</div>
            <button @click="handleAddToCart">Add to cart</button>
        </div>
    </div>
    <div>
        This is what's in your cart:
        <ul v-for="cartItem in cart">
            <li>{{ cartItem }}</li>
        </ul>
    </div>
</template>