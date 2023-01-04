import { UrlObject } from 'url'
import { useRouter } from 'next/router'
import { createContext, useEffect, useState } from 'react'

export const HistoryContext = createContext({
  history: [] as (UrlObject | string)[],
  firstVisit: true,
})

export const HistoryContextProvider = (props: any) => {
  const [history, setHistory] = useState<(UrlObject | string)[]>([])
  const router = useRouter()

  const addHistory = (url: UrlObject | string) => setHistory([...history, url])

  useEffect(() => {
    console.log('history', history)
    if (router.isReady) {
      addHistory(`${router.asPath}`)
    }
  }, [router.isReady, router.asPath])

  const [firstVisit, setFirstVisit] = useState(true)
  useEffect(() => {
    console.log('History changed', history)
    if (history.length > 1) {
      setFirstVisit(false)
    }
  }, [history])

  return (
    <HistoryContext.Provider value={{ history, firstVisit }}>
      {props.children}
    </HistoryContext.Provider>
  )
}