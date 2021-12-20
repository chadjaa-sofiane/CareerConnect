import { useState } from "react";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/avatar";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import SettingsIcon from "@material-ui/icons/Settings";
import { userInfo } from "../../../cache";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useLogout } from "../../../lib/hooks";

const useStyles = makeStyles((theme) => ({
  userBarContainer: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
    marginLeft: "auto",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  avatar: {
    marginLeft: "2rem",
    cursor: "pointer",
  },
}));

const UserBar = () => {
  const logout = useLogout();
  // menu
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const goToSetting = () => {
    handleClose();
    history.push("/dashboard/profile/setting");
  };
  const classes = useStyles();
  const myInfo = userInfo();
  const history = useHistory();
  console.log(myInfo);
  if (!myInfo) return "";
  const userName = `${myInfo?.firstName}_${myInfo?.lastName}`;
  if (myInfo)
    return (
      <div className={classes.userBarContainer}>
        <IconButton>
          <NotificationsIcon />
        </IconButton>
        <IconButton>
          <ChatBubbleOutlineIcon />
        </IconButton>
        <IconButton
          aria-controls="setting"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <SettingsIcon />
        </IconButton>
        <Menu
          id="setting"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem button onClick={(handleClose, logout)}>
            Logout
          </MenuItem>
          <MenuItem button onClick={goToSetting}>
            setting
          </MenuItem>
        </Menu>
        <Avatar
          onClick={() => history.push(`/dashboard/profile/${userName}`)}
          src={myInfo.profileImage ? `/images/${myInfo.profileImage}` : ""}
          className={classes.avatar}
        ></Avatar>
      </div>
    );
};

export default UserBar;
