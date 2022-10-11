import useSWR from 'swr'
import fetcher from './fetcher'

interface SWRResponse {
    [key: string]: any
    isLoading: boolean
    isError: Error
}

export const useMe = (): SWRResponse => {
    const { data, error } = useSWR('/me', fetcher)

    return {
        user: data,
        isLoading: !data && !error,
        isError: error,
    }
}

const usePlaylists = (): SWRResponse => {
    const { data, error } = useSWR('/playlist', fetcher)

    return {
        playlists: data || [],
        isLoading: !data && !error,
        isError: error,
    }
}
