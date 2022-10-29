import axios from "axios";
import { GetStaticPropsResult, NextPage } from "next";
import { Box } from "@mui/material";
import { Utterance } from "../../components/utterance/Utterance";
import { Morpheme } from "../../types/morpheme/morpheme"
import { Summary } from "../../types/episode/summary";


type Props = {
  morphemes: Morpheme[];
  summary: Summary;
}
const EpisodeDetail: NextPage<Props> = ({ morphemes, summary }) => {
  return (
    <Box marginTop={{ xs: 16, sm: 18 }}>
      {morphemes.map((morpheme, index) => (
        <Utterance
          url={summary.videoUrl}
          key={morpheme.timestamp}
          timestamp={morpheme.timestamp}
          text={morpheme.token}
          odd={index % 2 != 0}
        />
      ))}
    </Box>
  )
}

type MorphemeResponse = {
  morphemes: Morpheme[];
}
type PathParams = {
  episodeId: string;
}

export const getStaticProps = async (context: any): Promise<GetStaticPropsResult<Props>> => {
  try {
    const { episodeId } = context.params as PathParams
    const { data: morphemeData } = await axios.get<MorphemeResponse>(`${process.env.NEXT_PUBLIC_API_ROOT}/morpheme/by_episode/${episodeId}/`);
    const { data: summaryData } = await axios.get<Summary>(`${process.env.NEXT_PUBLIC_API_ROOT}/summary/by_episode/${episodeId}/`);
    return {
      revalidate: 3600,
      props: { morphemes: morphemeData.morphemes, summary: summaryData 
    } };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
}

export const getStaticPaths = async () => {
  const { data : allEpisodes } = await axios.get<{summary: Summary[] }>(`${process.env.NEXT_PUBLIC_API_ROOT}/summary/`);
  return {
    paths: allEpisodes.summary.filter(summary => summary.analysed).map((episode) => ({params: {episodeId: episode.id.toString()}})),
    fallback: false,
  };
}

export default EpisodeDetail;
