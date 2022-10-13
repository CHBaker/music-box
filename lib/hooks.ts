import useSWR from 'swr'
import { validateToken } from './auth'
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

export const usePlaylist = (): SWRResponse => {
    const { data, error } = useSWR('/playlist', fetcher)

    return {
        playlists: (data as unknown as []) || [],
        isLoading: !data && !error,
        isError: error,
    }
}
