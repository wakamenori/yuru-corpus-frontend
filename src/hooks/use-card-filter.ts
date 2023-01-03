import { useEffect, useState } from 'react'

import { Summary } from '../types/episode/summary'

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

export const useCardFilter = (
  summaries: Summary[],
): { filterConf: FilterConf; filteredSummaries: Summary[] } => {
  const [showGengo, setShowGengo] = useState(true)
  const toggleGengo = () => {
    console.log('toggleGengo')
    setShowGengo((prev) => !prev)
  }
  const [showCom, setShowCom] = useState(true)
  const toggleCom = () => setShowCom((prev) => !prev)
  const [showShodo, setShowShodo] = useState(true)
  const toggleShodo = () => setShowShodo((prev) => !prev)
  const [showTenmon, setShowTenmon] = useState(true)
  const toggleTenmon = () => setShowTenmon((prev) => !prev)
  const [showSeitai, setShowSeitai] = useState(true)
  const toggleSeitai = () => setShowSeitai((prev) => !prev)
  const [showTetsugaku, setShowTetsugaku] = useState(true)
  const toggleTetsugaku = () => setShowTetsugaku((prev) => !prev)
  const [showOngaku, setShowOngaku] = useState(true)
  const toggleOngaku = () => setShowOngaku((prev) => !prev)
  const [showMinzoku, setShowMinzoku] = useState(true)
  const toggleMinzoku = () => setShowMinzoku((prev) => !prev)
  const [showGakuto, setShowGakuto] = useState(true)
  const toggleGakuto = () => setShowGakuto((prev) => !prev)
  const [showOthers, setShowOthers] = useState(true)
  const toggleOthers = () => setShowOthers((prev) => !prev)

  const [filteredSummaries, setFilteredSummaries] = useState(summaries)

  useEffect(() => {
    setFilteredSummaries(
      summaries.filter((summary) => {
        if (!showGengo && summary.channel === 'ゆる言語学ラジオ') {
          return false
        }else if(!showCom && summary.channel === 'ゆるコンピュータ科学ラジオ'){
          return false
        }else if(!showShodo && summary.channel === 'ゆる書道学ラジオ'){
          return false
        }else if(!showTenmon && summary.channel === 'ゆる天文学ラジオ'){
          return false
        }else if(!showSeitai && summary.channel === 'ゆる生態学ラジオ'){
          return false
        }else if(!showTetsugaku && summary.channel === 'ゆる哲学ラジオ'){
          return false
        }else if(!showOngaku && summary.channel === 'ゆる音楽学ラジオ'){
          return false
        }else if(!showMinzoku && summary.channel === 'ゆる民俗学ラジオ'){
          return false
        } else {
          return true
        }
      }),
    )
  }, [summaries, showGengo, showCom, showShodo, showTenmon, showSeitai, showTetsugaku, showOngaku, showMinzoku])

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
      showTetsugaku ,
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
