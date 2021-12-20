import { useHistory } from "react-router";
import { useQuery } from "@apollo/client";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import GetAllPosts from "../../containers/getAllPosts";
import { GET_POSTS_BY_USER_ID } from "../../graphql/queries";
import { makeStyles } from "@material-ui/core";
import { userInfo } from "../../cache";

const useStyle = makeStyles(() => ({
  post: {
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    padding: ".5rem",
  },
}));

function Posts({ _id }) {
  const { _id: myId } = userInfo();
  const classes = useStyle();
  const history = useHistory();
  const { data, loading, error } = useQuery(GET_POSTS_BY_USER_ID, {
    variables: { id: _id },
  });
  const itIsMe = myId === _id;
  if (loading) return "loading...";
  if (error) return "error!";
  return (
    <>
      {itIsMe && (
        <Paper variant="outlined" className={classes.post}>
          <Typography color="primary" variant="h6">
            ِCreate an new post
          </Typography>
          <Button
            onClick={() => history.push("/dashboard/createPost")}
            className={classes.btn}
            variant="contained"
            color="primary"
          >
            create new
          </Button>
        </Paper>
      )}
      <br />
      {data && <GetAllPosts data={data} loading={loading} error={error} />}
    </>
  );
}

export default Posts;
