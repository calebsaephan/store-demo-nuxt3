<script setup lang="ts">
const auth = useAuth()
const handleLogin = async (e) => {
    e.preventDefault()
    await auth.login({
        username: "test",
        password: "test"
    })

}

const registerDialog = ref<HTMLDialogElement>()
const handleRegister = () => {
    handleOpenDialog()
}

const handleOpenDialog = () => {
    registerDialog.value!.showModal()
}

const handleCloseDialog = (e) => {
    if (e.target.id === registerDialog.value!.id) {
        registerDialog.value!.close()
    }
}
</script>
<template>
    <div class="flex justify-center items-center gap-16 mt-40">
        <div class="w-96 p-8">
            <div class="flex flex-col text-center gap-2">
                <div class="text-2xl font-bold">Join VIP</div>
                <div class="my-4">Create an account to start enjoying exclusive member benefits</div>
                <div class="my-8">
                    <ul>
                        <li>25% off your first purchase</li>
                        <li>VIP early access to new products and exclusives</li>
                        <li>Easy exchanges and faster checkout</li>
                    </ul>
                </div>
                <SecondaryButton @click="handleRegister" class="rounded-sm text-sm">
                    Create New Account
                </SecondaryButton>
            </div>
        </div>
        <div class=" w-[1px] h-48 bg-slate-300"></div>
        <div class="w-96 p-8 rounded bg-white">
            <div class="text-center mb-8 space-y-2">
                <div class="text-2xl font-bold">Sign In</div>
                <div class="text-sm">Welcome! Please sign in to your account</div>
            </div>
            <form class="flex flex-col gap-2">
                <label>Email</label>
                <input type="text" value="" />
                <label>Password</label>
                <input type="password" value="" />
                <PrimaryButton @click="handleLogin" class="rounded mt-8">Login</PrimaryButton>
            </form>
        </div>
    </div>

    <dialog id="registerDialog" ref="registerDialog" @click="handleCloseDialog">
        <code>
                                                        username: test
                                                        password: test
                                                    </code>
    </dialog>
</template>
<style scoped>
ul>li::before {
    content: "✔️";
    font-size: .8rem;
    margin-right: .2rem;
}

input {
    border: 1px solid;
    @apply border-slate-300 rounded p-2;
    @apply bg-slate-50;
}

label {
    @apply text-sm font-semibold mt-2;
}
</style>