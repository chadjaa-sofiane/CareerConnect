import { Switch, Route } from "react-router-dom";
import Search from "./Search";
import Profile from "./Profile";
import Home from "./Home";
import UserSetting from "./userSetting";
import DashBoardHeader from "../../components/headers/dashBoard";
import PostDetails from "../../components/postComponent/postDetails";
import CreatePost from "./CreatePost";
import Grid from "@material-ui/core/Grid";
import { useToken, useGetMyInfo } from "../../lib/hooks";
import { userInfo } from "../../cache";
import { makeStyles } from "@material-ui/core/styles";
import CreateBlog from "./CreateBlog";

const useStyle = makeStyles({
  root: {
    paddingTop: "1rem",
  },
});

function RouterApp() {
  const classes = useStyle();
  const loading1 = useToken();
  const loading2 = useGetMyInfo();
  if (loading1 || loading2 || !userInfo()) return "loading...";
  return (
    <>
      <DashBoardHeader />
      <Grid container spacing={1} className={classes.root}>
        <Switch>
          <Route path="/dashboard/home">
            <Home />
          </Route>
          <Route path="/dashboard/search">
            <Search />
          </Route>
          <Route path="/dashboard/profile/setting">
            <UserSetting />
          </Route>
          <Route path="/dashboard/profile/:userName">
            <Profile />
          </Route>
          <Route path="/dashboard/createPost">
            <CreatePost />
          </Route>
          <Route path="/dashboard/CreateBlog">
            <CreateBlog />
          </Route>
          <Route path="/dashboard/post/:id">
            <PostDetails />
          </Route>
        </Switch>
      </Grid>
    </>
  );
}

export default RouterApp;
