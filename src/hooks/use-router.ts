import type { UrlObject } from 'url'
import { useRouter as useNextRouter } from 'next/router'
import { useCallback, useContext } from 'react'

import { HistoryContext } from '../context/history'

interface TransitionOptions {
  shallow?: boolean
  locale?: string | false
  scroll?: boolean
}

export const useRouter = () => {
  const router = useNextRouter()
  const history = useContext(HistoryContext)

  const push = useCallback(
    (url: string | UrlObject, as?: string | UrlObject, options?: TransitionOptions) => {
      return router.push(url, as, options)
    },
    [router],
  )
  const back = useCallback(() => {
    if (history.firstVisit) {
      return router.push('/episode')
    }
    return router.back()
  }, [router])

  return { ...router, push, back }
}