import useSWR from 'swr'

export function useHistory() {
    return useSWR('/api/user/history', url => fetch(url).then(r => r.json()))
}
