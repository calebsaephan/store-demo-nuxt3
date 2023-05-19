<script setup lang="ts">
import { triggerCartAnimationKey } from '~~/shared/symbols'
import crypto from "crypto"
import { useCartStore } from '~/pinia/cart'
import { storeToRefs } from 'pinia'

const sessionCookie = useCookie('session')
sessionCookie.value = sessionCookie.value || crypto.randomUUID()

useSession(sessionCookie.value)

const cartStore = useCartStore()
const { loadCart } = cartStore
const { cartSize } = storeToRefs(cartStore)
loadCart()

const cartUpdateAnimation = ref(false)

const triggerCartAnimation = () => {
    cartUpdateAnimation.value = true
    setTimeout(() => {
        cartUpdateAnimation.value = false
    }, 1000)
}

provide(triggerCartAnimationKey, triggerCartAnimation)

</script>
<template>
    <div class="flex justify-between py-2 px-4">
        <div>Menu</div>
        <NuxtLink to="/">
            <h1 class="text-xl font-bold">Sike Footwear</h1>
        </NuxtLink>
        <div>
            <NuxtLink to="/cart">
                Cart
                <span :class="{ 'cart-animation': cartUpdateAnimation }" class="rounded px-1">{{ cartSize }}</span>
            </NuxtLink>
        </div>
    </div>
    <div>
        <slot />
    </div>
</template>

<style scoped>
.cart-animation {
    animation: cartUpdate 1s;
}

@keyframes cartUpdate {
    0% {
        @apply bg-sky-300;
    }

    100% {
        @apply bg-transparent;
    }
}
</style>