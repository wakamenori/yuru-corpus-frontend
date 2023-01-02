import { Box, CardActionArea, Grid } from '@mui/material'
import Image, { ImageLoaderProps } from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

import { Chip } from '../../../../../components/ui/Chip'
import { channelThemes } from '../../../../../styles/themes'
import { Summary } from '../../../../../types/episode/summary'

const ImageContainer = styled.div`
  width: 256px;
  height: 144px;
  margin: auto;

  @media (max-width: 600px) {
    width: 144px;
    height: 81px;
  }
`

const myLoader = (props: ImageLoaderProps) => {
  return `${props.src}?w=${props.width}&q=${props.quality || 75}`
}

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

export const Card = (summary: Summary) => {
  return (
    <Grid item xs={12} md={12} lg={6}>
      <Link href={`/episode/${summary.id}`}>
        <CardActionArea>
          <Box
            sx={{
              display: 'flex',
              borderRadius: 1,
              overflow: 'hidden',
              boxShadow: 4,
              mr: 1,
              ml: 1,
            }}
          >
            <Box justifyContent='center' alignItems='center' textAlign='center' display='flex'>
              <ImageContainer>
                <Image
                  loader={myLoader}
                  src={summary.thumbnailUrl}
                  alt={summary.title}
                  width={256}
                  height={144}
                  objectFit='cover'
                />
              </ImageContainer>
            </Box>
            <Box sx={{ pl: 1, pr: 1 }}>
              <StyledTitle>{summary.title}</StyledTitle>
              <Chip
                label={summary.publicationDate.replace(/-/g, '/')}
              />
                {/* TODO: GroupNameに変更 */}
              <Chip
                label={summary.channel}
                backgroundColor={channelThemes[summary.channel].backgroundColor}
                color={channelThemes[summary.channel].color}
              />
            </Box>
          </Box>
        </CardActionArea>
      </Link>
    </Grid>
  )
}
