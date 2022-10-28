import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";

type Props = {
  icon: JSX.Element;
  text: string;
  onClick: () => void;
}

export const DrawerItem = ({icon, text, onClick}: Props) => {
  return (
    <ListItem key={text} disablePadding onClick={onClick}>
      <ListItemButton>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={text}/>
      </ListItemButton>
    </ListItem>
  )
}