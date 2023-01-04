import { Box } from '@mui/material'
import Image, { ImageLoaderProps } from 'next/image'
import styled from 'styled-components'

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

type Props = {
  thumbnailUrl: string
  title: string
}

export const Thumbnail = ({ thumbnailUrl, title }: Props) => {
  return (
    <Box justifyContent='center' alignItems='center' textAlign='center' display='flex'>
      <ImageContainer>
        <Image
          loader={myLoader}
          src={thumbnailUrl}
          alt={title}
          width={256}
          height={144}
          objectFit='cover'
        />
      </ImageContainer>
    </Box>
  )
}