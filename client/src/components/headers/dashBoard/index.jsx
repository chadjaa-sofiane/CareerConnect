import { ReactComponent as Logo } from "../../../logo.svg";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import { searchText } from "../../../cache";
import UserBar from "./UserBar";
import MenuIcon from "@material-ui/icons/Menu";
import NavigationBar from "./NavigationBar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import PhoneNav from "./phoneNav";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    justifyContent: "space-between",
  },
  burgerMenu: {
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  navBar: {
    type: "dark",
    width: "100%",
    background: theme.palette.primary.main,
  },
  userBarContainer: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
    marginLeft: "auto",
  },
  avatar: {
    marginLeft: "2rem",
  },
  icon: {
    color: theme.palette.common.white,
  },
}));

const SearchField = withStyles((theme) => ({
  root: {
    width: "100%",
    background: theme.palette.background.paper,
    padding: ".5rem",
    fontWeight: "bold",
  },
}))(Input);

function Header() {
  const classes = useStyles();
  const history = useHistory();
  const [searchTextState, setSearchState] = useState(" ");
  function submit(e) {
    e.preventDefault();
    history.push("/dashboard/search/posts");
    searchText(searchTextState);
  }
  const [open, setOpen] = useState(false);
  return (
    <div className={classes.root}>
      <Grid item xs={2} md={1}>
        <Logo style={{ width: "100%" }} />
      </Grid>
      <Grid item xs={10} sm={8}>
        <form noValidate autoComplete="off">
          <SearchField
            color="secondary"
            onChange={(e) => setSearchState(e.target.value)}
            placeholder="enter search text"
            inputProps={{
              endadornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          <button onClick={submit} style={{ display: "none" }}></button>
        </form>
      </Grid>
      <Grid item md={4}>
        <NavigationBar />
      </Grid>
      <Grid item md={4}>
        <UserBar />
      </Grid>
      <PhoneNav open={open} setOpen={setOpen} />
      <IconButton onClick={() => setOpen(true)} className={classes.burgerMenu}>
        <MenuIcon />
      </IconButton>
    </div>
  );
}

export default Header;
