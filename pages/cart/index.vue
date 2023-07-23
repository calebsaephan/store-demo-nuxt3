<script setup lang="ts">
import { formatPrice } from "~/utils/price"
const cart = useCart()

const handleRemoveItem = async (e: Event, productId: string) => {
    e.preventDefault()
    cart.remove(productId)
    await useFetch(`/api/cart/remove?productId=${productId}`)
}

const handleCheckout = async (e: Event) => {
    const { data } = await useFetch("/api/checkout")

    await navigateTo(data.value, { external: true })
}
</script>
<template>
    <div class="container mx-auto">
        <ul>
            <li v-for="item in cart.items" class="py-4 border-b-[1px]">
                <div class="flex">
                    <div>
                        <div class="w-[100px] h-[100px] bg-slate-500"></div>
                    </div>
                    <div class="flex flex-col pl-4">
                        <span class="text-xl font-semibold">{{ item.product.displayName }}</span>
                        <div>Qty: {{ item.quantity }}</div>
                        <div id="actions">
                            <button type="submit" @click="handleRemoveItem($event, item.product.id)">Remove</button>
                        </div>
                        <span class="font-semibold">
                            {{ formatPrice(item.product.price) }}
                        </span>
                    </div>
                </div>
            </li>
        </ul>

        <button @click="handleCheckout">Checkout</button>
    </div>
</template>
<style scoped></style>