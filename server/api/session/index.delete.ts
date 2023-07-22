export default defineEventHandler((event) => {
    deleteCookie(event, 'session')
    return 200
})