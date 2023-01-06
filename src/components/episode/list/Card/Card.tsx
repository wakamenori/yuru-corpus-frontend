import { Box, Button, CardActionArea, Grid } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'

import { SearchResult } from '../../../../feature/search/context/search'
import { useWindowDimensions } from '../../../../hooks/use-window-dimensions'
import { channelThemes } from '../../../../styles/themes'
import { Summary } from '../../../../types/episode/summary'
import { Chip } from '../../../ui/Chip'
import { Thumbnail } from '../Thumbnail'
import { UtteranceSnippet } from '../UtteranceSnippet'

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const StyledTitle = styled.p`
  margin: 0 0;
  font-size: 0.7rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  @media (min-width: 600px) {
    margin: 0.5rem 0;
    font-size: 1rem;
  }
`
type Props = {
  summary: Summary
  searchResult?: SearchResult
}

export const Card = ({ summary, searchResult }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const toggleIsExpanded = () => setIsExpanded((prev) => !prev)
  const { width } = useWindowDimensions()
  return (
    <Box
      sx={{
        borderRadius: 1,
        width: width > 900 ? '50%' : '100%',
        boxShadow: 4,
        overflow: 'hidden',
        mr: 1,
        ml: 1,
      }}
    >
      <Link href={`/episode/${summary.id}`}>
        <CardActionArea>
          <Box
            sx={{
              display: 'flex',
              borderRadius: 1,
            }}
          >
            <Thumbnail thumbnailUrl={summary.thumbnailUrl} title={summary.title} />
            <Box sx={{ pl: 1, pr: 1 }}>
              <StyledTitle>{summary.title}</StyledTitle>
              <Chips>
                <Chip
                  label={summary.channel}
                  backgroundColor={channelThemes[summary.channel].backgroundColor}
                  color={channelThemes[summary.channel].color}
                />
                <Chip label={summary.publicationDate.replace(/-/g, '/')} />
              </Chips>
            </Box>
          </Box>
          {searchResult && (
            <UtteranceSnippet
              utterances={
                isExpanded ? searchResult.utterances : searchResult.utterances.slice(0, 3)
              }
            />
          )}
        </CardActionArea>
      </Link>
      {searchResult && searchResult.utterances.length > 3 && (
        <Grid container justifyContent='center'>
          <Button onClick={toggleIsExpanded}>{isExpanded ? '縮小' : '拡大'}</Button>
        </Grid>
      )}
    </Box>
  )
}
