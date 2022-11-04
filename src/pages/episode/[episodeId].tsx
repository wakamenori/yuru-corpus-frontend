import { useState } from "react";
import axios from "axios";
import { GetStaticPropsResult, NextPage } from "next";
import { Box, useMediaQuery, useScrollTrigger } from "@mui/material";
import { Utterance } from "../../components/utterance/Utterance";
import { Morpheme } from "../../types/morpheme/morpheme"
import { Summary } from "../../types/episode/summary";
import { Player } from "../../components/youtube/Player";
import { Header } from "../../feature/episode/components/Header";
import { Editor } from "../../feature/episode/components/Editor";
import { Button } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { Snackbar } from "../../components/ui/Snackbar";
import { getMorphemesApi } from "../../feature/episode/utils/api";


type Props = {
  morphemes: Morpheme[];
  summary: Summary;
  window?: () => Window;
}

const EpisodeDetail: NextPage<Props> = ({ morphemes, summary, window }) => {
  const [morphemesState, setMorphemesState] = useState<Morpheme[]>(morphemes);
  const videoId = summary.videoUrl.split('=')[1]
  const isWide = useMediaQuery('(min-width:900px)');
  const [isEdit, setIsEdit] = useState(false);
  const [defaultTimestamp, setDefaultTimestamp] = useState<string>("");
  const [defaultSpeaker, setDefaultSpeaker] = useState<string>("");
  const [defaultText, setDefaultText] = useState<string>("");

  const [isShowSnackbar, setIsShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const openSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setIsShowSnackbar(true);
  }

  const hideSnackbar = () => {
    setIsShowSnackbar(false);
  }

  const enableEdit = (timestamp: string, speaker: string, text: string) => {
    setDefaultTimestamp(timestamp);
    setDefaultSpeaker(speaker);
    setDefaultText(text);
    setIsEdit(true);
  }
  const onSubmit = (data: any) => {
    setIsEdit(false);
  }
  const toggleIsEdit = () => {
    setIsEdit(prev => !prev);
  }
  const reloadMorphemes = async () => {
    morphemes = await getMorphemesApi(summary.id)
    setMorphemesState(morphemes);
  }
  return (
    <>
      {isShowSnackbar && (<Snackbar message={snackbarMessage} severity={snackbarSeverity} onClose={hideSnackbar} />)}
      <Box marginLeft={2} marginRight={2}>
        <Header title={summary.title} hideOnScloll={!isWide} />
        <Box marginTop={{ xs: 16, sm: 18 }} marginRight={isWide ? 2 : 0}>
          <Box sx={isWide ? { width: "50%" } : { width: "100%" }}>
            {morphemesState.map((morpheme, index) => (
              <Utterance
                url={summary.videoUrl}
                key={morpheme.timestamp}
                timestamp={morpheme.timestamp}
                text={morpheme.token}
                odd={index % 2 != 0}
                speaker={morpheme.speaker || "???"}
                enableEdit={enableEdit}
                isEdit={isEdit}
                showEditIcon={isWide}
              />
            ))}
          </Box>
        </Box>
        {isWide && (
          <Box marginTop={{ xs: 16, sm: 18 }} sx={{ position: "fixed", top: 0, right: 0, width: "50%", paddingRight: 2 }}>
            <Box sx={{ width: "80%", margin: "0 auto" }}>
              <Player videoId={videoId} width={0} />
            </Box>
            {isEdit ? (
              <Editor
                defaultText={defaultText}
                defaultSpeaker={defaultSpeaker}
                defaultTimestamp={defaultTimestamp}
                toggleIsEdit={toggleIsEdit}
                reloadMorphemes={reloadMorphemes}
                episodeId={summary.id}
                showSnackbar={openSnackbar}
              />
            ) : (
              <Box sx={{ textAlign: "center", marginTop: 8 }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    toggleIsEdit()
                    enableEdit("", "", "")
                  }}
                  startIcon={<AddCircle />}
                >
                  文字起こしを新規追加
                </Button>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </>
  )
}

type PathParams = {
  episodeId: string;
}

export const getStaticProps = async (context: any): Promise<GetStaticPropsResult<Props>> => {
  try {
    const { episodeId } = context.params as PathParams
    const morphemeData = await getMorphemesApi(+episodeId);
    const { data: summaryData } = await axios.get<Summary>(`${process.env.NEXT_PUBLIC_API_ROOT}/summary/by_episode/${episodeId}/`);
    return {
      revalidate: 60,
      props: {
        morphemes: morphemeData, summary: summaryData
      }
    };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
}

export const getStaticPaths = async () => {
  const { data: allEpisodes } = await axios.get<{ summary: Summary[] }>(`${process.env.NEXT_PUBLIC_API_ROOT}/summary/`);
  return {
    paths: allEpisodes.summary.filter(summary => summary.isAnalyzed).map((episode) => ({ params: { episodeId: episode.id.toString() } })),
    fallback: "blocking",
  };
}

export default EpisodeDetail;
