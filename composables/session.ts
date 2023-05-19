export const useSession = (sess: string) => {
    const session = useState<string>('session', () => sess)

    return { session }
}