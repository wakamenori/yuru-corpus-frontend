import axios from 'axios'
import { GetStaticPropsResult, NextPage } from 'next'
import { useCallback, useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import styled from 'styled-components'

import { Player } from '../../components/youtube/Player'
import { Header } from '../../feature/episode/components/detail/Header'
import { ScrollArea } from '../../feature/episode/components/detail/ScrollArea'
import { Panel } from '../../feature/episode/components/detail/panel/Panel'
import { SpeakerInfo } from '../../feature/episode/types/speaker'
import { getMorphemesApi } from '../../feature/episode/utils/api'
import { Summary } from '../../types/episode/summary'
import { Morpheme } from '../../types/morpheme/morpheme'
import { SpeakerColorGenerator } from '../../utils/speakers'

type Props = {
  morphemes: Morpheme[]
  summary: Summary
}

const PlayerWithPanel = styled.div`
  position: fixed;
  width: 100%;
  padding-bottom: 0.5rem;
  z-index: 100;
  top: 64px;
  @media (max-width: 600px) {
    top: 56px;
  }
  @media (min-width: 900px) {
    width: 600px;
  }
`
const EpisodeDetail: NextPage<Props> = ({ morphemes, summary }) => {
  const [morphemesState, setMorphemesState] = useState<Morpheme[]>(morphemes)
  const videoId = summary.videoUrl.split('=')[1]
  const [isEdit, setIsEdit] = useState(false)
  const toggleIsEdit = () => {
    setIsEdit((prev) => !prev)
  }
  const reloadMorphemes = useCallback(async () => {
    setMorphemesState(await getMorphemesApi(summary.id))
  }, [summary.id])

  type MorphemeSetItem = {
    speaker: string
    morphemes: Morpheme[]
  }

  const [speakersInfoState, setSpeakersInfoState] = useState<SpeakerInfo>({})
  const [morphemesBySpeakerState, setMorphemesBySpeakerState] = useState<MorphemeSetItem[]>([])

  useEffect(() => {
    const speakerColor = new SpeakerColorGenerator()
    let processingMorphemeSetItem: MorphemeSetItem = {
      speaker: morphemesState[0].speaker,
      morphemes: [],
    }
    const speakersInfo: SpeakerInfo = {}
    const morphemesBySpeaker: MorphemeSetItem[] = []
    for (let i = 0; i < morphemesState.length; i++) {
      const speaker = morphemesState[i]?.speaker
      let speakerColorInfo: { color: string; backgroundColor: string }
      if (speaker in speakersInfo) {
        speakersInfo[speaker].count += 1
        speakerColorInfo = {
          color: speakersInfo[speaker].color,
          backgroundColor: speakersInfo[speaker].backgroundColor,
        }
      } else {
        speakerColorInfo = speakerColor.getSpeakerColor(speaker)
        speakersInfo[speaker] = {
          ...speakerColorInfo,
          count: 1,
        }
      }
      if (speaker === processingMorphemeSetItem.speaker) {
        processingMorphemeSetItem.morphemes.push(morphemesState[i])
      } else {
        morphemesBySpeaker.push(processingMorphemeSetItem)
        processingMorphemeSetItem = {
          speaker: speaker,
          morphemes: [morphemesState[i]],
        }
      }
    }
    morphemesBySpeaker.push(processingMorphemeSetItem)
    for (let speaker in speakersInfo) {
      speakersInfo[speaker].percentage = Math.ceil(
        (speakersInfo[speaker].count / morphemesState.length) * 100,
      )
    }

    setSpeakersInfoState(speakersInfo)
    setMorphemesBySpeakerState(morphemesBySpeaker)
  }, [morphemesState, summary.id, reloadMorphemes])

  return (
    <>
      <Header title={summary.title} hideOnScloll={false} />
      <PlayerWithPanel>
        <Player videoId={videoId} />
        <Panel speakersInfo={speakersInfoState} isEdit={isEdit} toggleIsEdit={toggleIsEdit} />
      </PlayerWithPanel>
      <ScrollArea
        morphemes={morphemesState}
        episodeId={summary.id}
        morphemesBySpeaker={morphemesBySpeakerState}
        speakersInfo={speakersInfoState}
        isEdit={isEdit}
        reloadMorphemes={reloadMorphemes}
      />
    </>
  )
}

type PathParams = {
  episodeId: string
}

export const getStaticProps = async (context: any): Promise<GetStaticPropsResult<Props>> => {
  try {
    const { episodeId } = context.params as PathParams
    const morphemeData = await getMorphemesApi(+episodeId)
    const { data: summaryData } = await axios.get<Summary>(
      `${process.env.NEXT_PUBLIC_API_ROOT}/summary/by_episode/${episodeId}/`,
    )
    return {
      revalidate: 60,
      props: {
        morphemes: morphemeData,
        summary: summaryData,
      },
    }
  } catch (error) {
    console.log(error)
    return { notFound: true }
  }
}

export const getStaticPaths = async () => {
  const { data: allEpisodes } = await axios.get<{ summary: Summary[] }>(
    `${process.env.NEXT_PUBLIC_API_ROOT}/summary/`,
  )
  return {
    paths: allEpisodes.summary
      .filter((summary) => summary.isAnalyzed)
      .map((episode) => ({ params: { episodeId: episode.id.toString() } })),
    fallback: 'blocking',
  }
}

export default EpisodeDetail
