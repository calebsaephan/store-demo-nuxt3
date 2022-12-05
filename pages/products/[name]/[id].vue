<script setup lang="ts">
import { CartProduct } from '~~/utils/classes/Cart';

const cart = useCart()
const product = useRoute().params

const handleAddToCart = (e: Event) => {
    e.preventDefault()

    const itemInCart = cart.value.find(item => item.product.id === parseInt(product.id as string))

    if (itemInCart) {
        itemInCart.incrementQuantity()
    } else {
        const newCartItem: CartProduct = new CartProduct({
            id: parseInt(product.id as string),
            name: "",
            title: "",
            price: 160,
            available: true
        })

        cart.value.push(newCartItem)
    }

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
            <div id="product-price">$160</div>
            <div id="product-description">asf</div>
            <button @click="handleAddToCart">Add to cart</button>
        </div>
    </div>
    <div>
        cart
        {{ cart }}
    </div>
</template>