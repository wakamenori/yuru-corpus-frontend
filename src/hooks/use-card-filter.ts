import type { NextRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Summary } from '../types/episode/summary'
import { useRouter } from './use-router'

export type FilterConf = {
  showGengo: boolean
  toggleGengo: () => void
  showCom: boolean
  toggleCom: () => void
  showShodo: boolean
  toggleShodo: () => void
  showTenmon: boolean
  toggleTenmon: () => void
  showSeitai: boolean
  toggleSeitai: () => void
  showTetsugaku: boolean
  toggleTetsugaku: () => void
  showOngaku: boolean
  toggleOngaku: () => void
  showMinzoku: boolean
  toggleMinzoku: () => void
  showGakuto: boolean
  toggleGakuto: () => void
  showOthers: boolean
  toggleOthers: () => void
}

const switchFilter = (
  setFunc: React.Dispatch<React.SetStateAction<boolean>>,
  newQueryKey: string,
  newQueryValue: boolean,
  router: NextRouter,
) => {
  setFunc((prev) => !prev)
  if (!newQueryValue) {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, [newQueryKey]: newQueryValue },
    })
  } else {
    const { [newQueryKey]: _, ...newQuery } = router.query
    router.push({
      pathname: router.pathname,
      query: newQuery,
    })
  }
}

const getFilter = (router: NextRouter, key: string): boolean => {
  const query = router.query[key]
  if (typeof query === 'string') {
    return !(query === 'false')
  }
  return true
}

export const useCardFilter = (
  summaries: Summary[],
): { filterConf: FilterConf; filteredSummaries: Summary[] } => {
  const router = useRouter()
  const [showGengo, setShowGengo] = useState(true)
  const toggleGengo = () => switchFilter(setShowGengo, 'showGengo', !showGengo, router)
  const [showCom, setShowCom] = useState(true)
  const toggleCom = () => switchFilter(setShowCom, 'showCom', !showCom, router)
  const [showShodo, setShowShodo] = useState(true)
  const toggleShodo = () => switchFilter(setShowShodo, 'showShodo', !showShodo, router)
  const [showTenmon, setShowTenmon] = useState(true)
  const toggleTenmon = () => switchFilter(setShowTenmon, 'showTenmon', !showTenmon, router)
  const [showSeitai, setShowSeitai] = useState(true)
  const toggleSeitai = () => switchFilter(setShowSeitai, 'showSeitai', !showSeitai, router)
  const [showTetsugaku, setShowTetsugaku] = useState(true)
  const toggleTetsugaku = () =>
    switchFilter(setShowTetsugaku, 'showTetsugaku', !showTetsugaku, router)
  const [showOngaku, setShowOngaku] = useState(true)
  const toggleOngaku = () => switchFilter(setShowOngaku, 'showOngaku', !showOngaku, router)
  const [showMinzoku, setShowMinzoku] = useState(true)
  const toggleMinzoku = () => switchFilter(setShowMinzoku, 'showMinzoku', !showMinzoku, router)
  const [showGakuto, setShowGakuto] = useState(true)
  const toggleGakuto = () => switchFilter(setShowGakuto, 'showGakuto', !showGakuto, router)
  const [showOthers, setShowOthers] = useState(true)
  const toggleOthers = () => switchFilter(setShowOthers, 'showOthers', !showOthers, router)

  const [filteredSummaries, setFilteredSummaries] = useState(summaries)
  useEffect(() => {
    if (router.isReady) {
      setShowGengo(getFilter(router, 'showGengo'))
      setShowCom(getFilter(router, 'showCom'))
      setShowShodo(getFilter(router, 'showShodo'))
      setShowTenmon(getFilter(router, 'showTenmon'))
      setShowSeitai(getFilter(router, 'showSeitai'))
      setShowTetsugaku(getFilter(router, 'showTetsugaku'))
      setShowOngaku(getFilter(router, 'showOngaku'))
      setShowMinzoku(getFilter(router, 'showMinzoku'))
      setShowGakuto(getFilter(router, 'showGakuto'))
      setShowOthers(getFilter(router, 'showOthers'))
    }
  }, [router.isReady, router])

  useEffect(() => {
    setFilteredSummaries(
      summaries.filter((summary) => {
        if (!showGengo && summary.channel === 'ゆる言語学ラジオ') {
          return false
        } else if (!showCom && summary.channel === 'ゆるコンピュータ科学ラジオ') {
          return false
        } else if (!showShodo && summary.channel === 'ゆる書道学ラジオ') {
          return false
        } else if (!showTenmon && summary.channel === 'ゆる天文学ラジオ') {
          return false
        } else if (!showSeitai && summary.channel === 'ゆる生態学ラジオ') {
          return false
        } else if (!showTetsugaku && summary.channel === 'ゆる哲学ラジオ') {
          return false
        } else if (!showOngaku && summary.channel === 'ゆる音楽学ラジオ') {
          return false
        } else if (!showMinzoku && summary.channel === 'ゆる民俗学ラジオ') {
          return false
        } else {
          return true
        }
      }),
    )
  }, [
    summaries,
    showGengo,
    showCom,
    showShodo,
    showTenmon,
    showSeitai,
    showTetsugaku,
    showOngaku,
    showMinzoku,
  ])

  return {
    filterConf: {
      showGengo,
      toggleGengo,
      showCom,
      toggleCom,
      showShodo,
      toggleShodo,
      showTenmon,
      toggleTenmon,
      showSeitai,
      toggleSeitai,
      showTetsugaku,
      toggleTetsugaku,
      showOngaku,
      toggleOngaku,
      showMinzoku,
      toggleMinzoku,
      showGakuto,
      toggleGakuto,
      showOthers,
      toggleOthers,
    },
    filteredSummaries: filteredSummaries,
  }
}