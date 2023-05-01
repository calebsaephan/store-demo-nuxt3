<script setup lang="ts">
const { cart } = useCart()
</script>
<template>
    <div>
        This is what's in your cart:
        <ul v-for="cartItem in cart">
            <li>{{ cartItem }}</li>
        </ul>
    </div>
</template>