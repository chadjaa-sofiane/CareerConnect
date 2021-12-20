import { useState } from "react";
import { useHistory } from "react-router";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import { isLoggedIn } from "../cache";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeIcon from "@material-ui/icons/Home";
import WorkIcon from "@material-ui/icons/Work";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import InfoIcon from "@material-ui/icons/Info";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

const useStyle = makeStyles((theme) => ({
  head: {
    display: "flex",
    padding: ".5rem 2rem ",
  },
  navBar: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  buttonsContainer: {
    marginLeft: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    minWidth: "7rem",
    marginLeft: "1rem",
  },
  bergerMenu: {
    backgroundColor: "red",
  },
  drawerLinks: {
    minWidth: "15em",
  },
  burgerIcon: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function Home() {
  const classes = useStyle();
  const history = useHistory();
  const [value, setValue] = useState(0);
  function handleChange(e, nextEvent) {
    setValue(nextEvent);
  }
  const [open, setOpen] = useState(false);
  return (
    <>
      <Paper color="primary" className={classes.head}>
        <Grid container>
          <Grid className={classes.navBar} item xs>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Home" />
              <Tab label="Jobs" disabled />
              <Tab label="Blogs" disabled />
              <Tab label="About" disabled />
            </Tabs>
          </Grid>
          <Grid item xs={12} md={3} className={classes.buttonsContainer}>
            {isLoggedIn() ? (
              <Button
                onClick={() => history.push("dashboard/search")}
                className={classes.btn}
                variant="outlined"
                color="secondary"
              >
                go to dashboard
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => history.push("/regester")}
                  className={classes.btn}
                  variant="outlined"
                  color="primary"
                >
                  regester
                </Button>
                <Button
                  onClick={() => history.push("/login")}
                  className={classes.btn}
                  variant="outlined"
                  color="secondary"
                >
                  log in
                </Button>
              </>
            )}
          </Grid>
        </Grid>
        <IconButton
          onClick={() => setOpen(true)}
          className={classes.burgerIcon}
        >
          <MenuIcon />
        </IconButton>
      </Paper>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <List className={classes.drawerLinks}>
          <ListItem>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText> Home </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText> Jobs </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <FileCopyIcon />
            </ListItemIcon>
            <ListItemText> Blogs </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText> About </ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default Home;
