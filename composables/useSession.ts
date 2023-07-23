const id = ref<string>()
export const useSession = (sessionId?: string) => {

    if (sessionId) {
        setSession(sessionId)
    }

    function setSession(sess: string) {
        id.value = sess
    }

    return { id, setSession }
}