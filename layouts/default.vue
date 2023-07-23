<script setup lang="ts">
import { triggerCartAnimationKey } from '~~/shared/symbols'

const cart = useCart()

const cartUpdateAnimation = ref(false)

const triggerCartAnimation = () => {
    cartUpdateAnimation.value = true
    setTimeout(() => {
        cartUpdateAnimation.value = false
    }, 1000)
}

provide(triggerCartAnimationKey, triggerCartAnimation)

const auth = useAuth()

const handleLogout = () => {
    auth.logout()
}

</script>
<template>
    <div class="flex justify-between py-2 px-4">
        <div></div>
        <NuxtLink to="/">
            <h1 class="text-xl font-bold">Shoe Store</h1>
        </NuxtLink>
        <div>
            <NuxtLink to="/cart">
                Cart
                <span :class="{ 'cart-animation': cartUpdateAnimation }" class="rounded px-1">{{ cart.size }}</span>
            </NuxtLink> |
            <NuxtLink to="/login" v-if="!auth.isAuthenticated.value">
                Sign In
            </NuxtLink>
            <PrimaryButton @click="handleLogout" v-else>
                Sign Out
            </PrimaryButton>
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