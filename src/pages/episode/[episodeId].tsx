import axios from 'axios'
import { GetStaticPropsResult, NextPage } from 'next'
import { useState } from 'react'
import styled from 'styled-components'

import { Player } from '../../components/youtube/Player'
import { Header } from '../../feature/episode/components/Header'
import { ScrollArea } from '../../feature/episode/components/ScrollArea'
import { Panel } from '../../feature/episode/components/panel/Panel'
import { SpeakerInfo } from '../../feature/episode/types/speaker'
import { getMorphemesApi } from '../../feature/episode/utils/api'
import { useWindowDimensions } from '../../hooks/use-window-dimensions'
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
  const reloadMorphemes = async () => {
    setMorphemesState(await getMorphemesApi(summary.id))
  }

  const { width } = useWindowDimensions()
  const headerHeight = width > 600 ? 64 : 56
  const panelHeight = 84
  const utterancePosition = (width * 9) / 16 + headerHeight + panelHeight
  const speakerColor = new SpeakerColorGenerator()
  const speakersInfo: SpeakerInfo = {}

  type MorphemeSetItem = {
    speaker: string
    morphemes: Morpheme[]
  }

  const morphemesBySpeaker: MorphemeSetItem[] = []
  let processingMorphemeSetItem: MorphemeSetItem = {
    speaker: morphemesState[0].speaker,
    morphemes: [],
  }

  for (let i = 0; i < morphemesState.length; i++) {
    const speaker = morphemesState[i]?.speaker
    if (speaker in speakersInfo) {
      speakersInfo[speaker].count += 1
    } else {
      speakersInfo[speaker] = {
        ...speakerColor.getSpeakerColor(speaker),
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

  return (
    <>
      <Header title={summary.title} hideOnScloll={false} />
      <PlayerWithPanel>
        <Player videoId={videoId} />
        <Panel speakersInfo={speakersInfo} isEdit={isEdit} toggleIsEdit={toggleIsEdit} />
      </PlayerWithPanel>
      <ScrollArea
        episodeId={summary.id}
        morphemesBySpeaker={morphemesBySpeaker}
        speakersInfo={speakersInfo}
        topPosition={utterancePosition}
        isEdit={isEdit}
        reloadMorphemes={reloadMorphemes}
        morphemes={morphemesState}
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
    fallback: false,
  }
}

export default EpisodeDetail
