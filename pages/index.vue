<script setup lang="ts">
const routes = [
    {
        to: "#",
        name: "All Shoes"
    },
    {
        to: "#",
        name: "Sneakers"
    },
    {
        to: "#",
        name: "Sandals"
    },
    {
        to: "#",
        name: "Boots"
    },
]
</script>
<template>
    <div class="container grid grid-cols-12 gap-2 mx-auto max-w-6xl">
        <div class="col-span-3">
            <ul>
                <a v-for="route in routes" :href="route.to" class="hover:text-sky-500 font-semibold">
                    <li>
                        {{ route.name }}
                    </li>
                </a>
            </ul>
        </div>
        <div class="col-span-9">
            <ProductList></ProductList>
        </div>
    </div>
</template>