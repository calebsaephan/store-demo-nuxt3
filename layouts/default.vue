<script setup lang="ts">
const { cartSize } = useCart()
</script>
<template>
    <div class="flex justify-between py-2 px-4">
        <div>Menu</div>
        <NuxtLink to="/">
            <h1 class="text-xl font-bold">Aegis Footwear</h1>
        </NuxtLink>
        <div>
            <NuxtLink to="/cart">
                Cart
                <span>{{ cartSize }}</span>
            </NuxtLink>
        </div>
    </div>
    <div>
        <slot />
    </div>
</template>