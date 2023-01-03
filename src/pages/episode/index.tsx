import { Box } from '@mui/material'
import axios from 'axios'
import { GetStaticPropsResult, NextPage } from 'next'

import { CardList } from '../../feature/episode/components/list/CardList'
import { CardFilter } from '../../feature/episode/components/list/filter/CardFilter'
import { useCardFilter } from '../../feature/episode/hooks/use-card-filter'
import { Summary } from '../../types/episode/summary'

type Props = {
  summary: Summary[]
}
const Episode: NextPage<Props> = ({ summary }) => {
  const { filterConf, filteredSummaries } = useCardFilter(summary)

  return (
    <>
      <Box marginTop={{ xs: 8, sm: 10 }} marginBottom={{ xs: 9, sm: 9 }}>
        <CardFilter filterConf={filterConf} />
        <CardList summaries={filteredSummaries} />
      </Box>
    </>
  )
}

type SummaryResponse = {
  summary: Summary[]
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  try {
    const { data } = await axios.get<SummaryResponse>(
      `${process.env.NEXT_PUBLIC_API_ROOT}/summary/`,
    )
    return { props: { summary: data.summary.filter((summary) => summary.isAnalyzed) } }
  } catch (error) {
    console.log(error)
    return { notFound: true }
  }
}

export default Episode
