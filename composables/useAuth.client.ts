export type BasicCredentials = {
    username: String,
    password: String
}
const isAuthenticated = ref(false)
export const useAuth = () => {


    async function login(credentials: BasicCredentials) {
        const user = await _authenticate(credentials)

        if (user) {
            isAuthenticated.value = true
            const cart = useCart()
            cart.transfer(user.cartId)
            await navigateTo("/dashboard")
        }

    }

    async function _authenticate(credentials: BasicCredentials) {
        const creds = btoa(`${credentials.username}:${credentials.password}`)

        const { data } = await useFetch("/api/auth/login", {
            method: "POST",
            headers: {
                Authorization: "Basic " + creds
            }
        })

        return data.value
    }

    async function logout() {
        const session = useSession()
        session.setSession("")
        const user = useCookie("user")
        user.value = null

        _clearCartSession()

        isAuthenticated.value = false
        await navigateTo("/#")
        useCart().load()
    }

    async function _clearCartSession() {
        await useFetch("/api/session", {
            method: "DELETE"
        })
    }


    return {
        login,
        logout,
        isAuthenticated
    }
}