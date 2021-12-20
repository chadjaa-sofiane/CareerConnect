import { useHistory } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeIcon from "@material-ui/icons/Home";
import ExploreIcon from "@material-ui/icons/Explore";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import SettingsIcon from "@material-ui/icons/Settings";
import CloseIcon from "@material-ui/icons/Close";
import Drawer from "@material-ui/core/Drawer";
import React from "react";
import { makeStyles } from "@material-ui/styles";
import { IconButton } from "@material-ui/core";
import { userInfo } from "../../../cache";

const useStyles = makeStyles((theme) => ({
  mainList: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  userList: {
    width: "15em",
  },
}));

function PhoneNav({ open = false, setOpen = () => {} }) {
  const classes = useStyles();
  const { push } = useHistory();
  function Redirect(path) {
    push(path);
    setOpen(false);
  }
  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <List>
        <ListItem>
          <ListItemIcon>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </ListItemIcon>
        </ListItem>
      </List>
      <Divider />
      <List className={classes.mainList}>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText> Home </ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon onClick={() => Redirect("/dashboard/search")}>
            <ExploreIcon />
          </ListItemIcon>
          <ListItemText> Search </ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List className={classes.userList}>
        <ListItem button>
          <ListItemIcon
            onClick={() =>
              Redirect(
                `/dashboard/profile/${userInfo().firstName}_${
                  userInfo().lastName
                }`
              )
            }
          >
            <PersonIcon />
          </ListItemIcon>
          <ListItemText> Profile </ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText> Notification </ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ChatBubbleOutlineIcon />
          </ListItemIcon>
          <ListItemText> Chat </ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText> Setting </ListItemText>
        </ListItem>
        <Divider />
      </List>
    </Drawer>
  );
}

export default PhoneNav;
