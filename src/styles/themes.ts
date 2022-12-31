type Channel = {
  [key: string]: {
    color: string
    backgroundColor: string
    backgroundColor1?: string
  }
}

export const channelThemes: Channel = {
  ゆる言語学ラジオ: { color: '#1F2937', backgroundColor: '#E7DBD0' }, // ゆる言語学ラジオ
  ゆるコンピュータ科学ラジオ: { color: '#FFF', backgroundColor: '#2392AC' }, // ゆるコンピュータ科学ラジオ

  ゆる書道学ラジオ: { color: '#FFF', backgroundColor: '#9C392B' }, // ゆる書道ラジオ
  ゆる天文学ラジオ: { color: '#FFF', backgroundColor: '#1B4D93' }, // ゆる天文学ラジオ
  'ゆる天文学/書道学ラジオ': {
    color: '#FFF',
    backgroundColor: '#1B4D93',
    backgroundColor1: '#9C3928',
  },

  ゆる生態学ラジオ: { color: '#FFF', backgroundColor: '#8A4F15' }, // ゆる生態学ラジオ
  ゆる哲学ラジオ: { color: '#FFF', backgroundColor: '#CF603C' }, // ゆる哲学ラジオ
  'ゆる哲学/生態学ラジオ': {
    color: '#FFF',
    backgroundColor: '#CF603C',
    backgroundColor1: '#8A4F15',
  },

  ゆる音楽学ラジオ: { color: '#FFF', backgroundColor: '#262820' }, // ゆる音楽学ラジオ
  ゆる民俗学ラジオ: { color: '#FFF', backgroundColor: '#4B3CAC' }, // ゆる民俗学ラジオ
  'ゆる音楽学/民俗学ラジオ': {
    color: '#FFF',
    backgroundColor: '#262820',
    backgroundColor1: '#4B3CAC',
  },

  ゆる学徒ハウス: { color: '#FFF', backgroundColor: '#1C8C8E' }, // ゆる学徒ハウス
  監修者: { color: '#FFF', backgroundColor: '#55535C' }, // ゆる学徒ハウス
  ゲスト: { color: '#FFF', backgroundColor: '#55535C' }, // ゆる学徒ハウス
}
