import { useEffect, useState } from 'react'
import { search } from '@/lib/semantic'

export function useSemantic(q: string, catalog: any[]) {
    const [res, setRes] = useState<any[]>([])

    useEffect(() => {
        if (q && q.length > 2) {
            search(q, catalog).then(setRes)
        } else {
            setRes([])
        }
    }, [q, catalog])

    return res
}
