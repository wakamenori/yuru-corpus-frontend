import { Slide, useScrollTrigger } from '@mui/material'
import { ReactElement } from 'react'

type Props = {
  window?: () => Window
  children: ReactElement
  enabled?: boolean
  threshold?: number
}

export const HideOnScroll = (props: Props) => {
  const { children, window, enabled } = props
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    threshold: props.threshold || 100,
  })

  if (enabled === false) {
    return children
  }
  return (
    <Slide appear={false} direction='down' in={!trigger} unmountOnExit>
      {children}
    </Slide>
  )
}
