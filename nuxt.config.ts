// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    nitro: {
        preset: "vercel-edge",
    },
    runtimeConfig: {
        upstashRedisRestUrl: "",
        upstashRedisRestToken: "",
        stripeKey: "",
        stripeSuccessUrl: "",
        stripeCancelUrl: "",
        public: {},
    },
    css: ["~/assets/css/main.css"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: ["@pinia/nuxt"],
    typescript: {
        tsConfig: {
            compilerOptions: {
                moduleResolution: "bundler",
            },
        },
    },
});
