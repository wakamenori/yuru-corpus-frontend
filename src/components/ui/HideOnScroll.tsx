import {useScrollTrigger, Slide} from '@mui/material';
import {ReactElement} from "react";

type Props = {
  window?: () => Window;
  children: ReactElement;
  enabled?: boolean;
}

export const HideOnScroll = (props: Props) => {
  const {children, window, enabled} = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  if (enabled === false) {
    return children;
  }
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
