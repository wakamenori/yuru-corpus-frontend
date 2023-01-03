import { useRouter } from 'next/router'
import { useCallback } from 'react'

export function useHash(): [string, (newHash: string) => void] {
  const router = useRouter()
  const hash = extractHash(router.asPath)
  const setHash = useCallback(
    (newHash: string) => {
      try {
        router.replace({ hash: newHash }, undefined, { shallow: true })
      } catch (e) {
        console.log(e)
      }
    },
    [router],
  )
  return [hash, setHash]
}

function extractHash(url: string): string {
  return url.split('#')[1] ?? ''
}
