import axios from 'axios'

import { Morpheme } from '../../../types/morpheme/morpheme'

export const postMorphemeApi = async (episodeId: number, data: Morpheme) => {
  const url = `${process.env.NEXT_PUBLIC_API_ROOT}/morpheme/by_episode/${episodeId}/`
  const response = await axios.post(url, data)
  return response.data
}

export const putMorphemeApi = async (episodeId: number, data: Morpheme) => {
  const url = `${process.env.NEXT_PUBLIC_API_ROOT}/morpheme/by_episode/${episodeId}/`
  const response = await axios.put(url, data)
  return response.data
}

type GetMorphemeResponse = {
  morphemes: Morpheme[]
}

export const getMorphemesApi = async (episodeId: number) => {
  const url = `${process.env.NEXT_PUBLIC_API_ROOT}/morpheme/by_episode/${episodeId}/`
  const res = await axios.get<GetMorphemeResponse>(url)
  return res.data.morphemes
}

export const deleteMorphemeApi = async (episodeId: number, timestamp: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_ROOT}/morpheme/by_episode/${episodeId}/?timestamp=${timestamp}`
    const response = await axios.delete(url)
    return response.data
  } catch (e) {
    console.log(e)
  }
}
