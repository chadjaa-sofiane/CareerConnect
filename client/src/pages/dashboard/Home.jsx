import { useHistory } from "react-router";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { userInfo } from "../../cache";


function Home() {
  const history = useHistory();
  const userType = userInfo().userType;
  return (
    <>
      <Grid xs={4}>
        <Paper>
          <List>
            <ListItem>posts</ListItem>
            <ListItem>blogs</ListItem>
          </List>
        </Paper>
      </Grid>
      {userType && (
        <Grid xs style={{ marginLeft:"1rem" }}>
          <Paper>
            <Typography color="primary">create new post</Typography>
            <Button
              onClick={() => history.push("/dashboard/post/createPost")}
              style={{ margin: "auto" }}
              variant="outlined"
            >
              create new Post
            </Button>
          </Paper>
        </Grid>
      )}
    </>
  );
}

export default Home;
