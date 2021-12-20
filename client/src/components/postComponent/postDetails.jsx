import moment from "moment";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import { useParams } from "react-router-dom";
import { GET_ONE_POST } from "../../graphql/queries";
import { SEND_REQUEST } from "../../graphql/mutations";
import { withStyles } from "@material-ui/core/styles";
import EmployerCard from "./EmployerCard";
import PostDetailsCard from "./postDetailsCard";
import Button from "@material-ui/core/Button";
import { userInfo } from "../../cache";
import { makeStyles } from "@material-ui/core/styles";

const ERROR = withStyles(() => ({
  root: {
    textAlign: "center",
    margin: "auto",
  },
}))(Typography);

const useStyles = makeStyles(({ spacing, palette }) => ({
  userCard: {
    width: "100%",
    margin: "1em 0",
  },
  userAvatar: {
    backgroundColor: (props) =>
      props.random > 0.5 ? palette.primary.main : palette.secondary.main,
    width: spacing(7),
    height: spacing(7),
    cursor: "pointer",
  },
}));

function PostMoreInfo() {
  const [value, setValue] = useState(0);
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_ONE_POST, {
    variables: { id },
  });
  if (loading) return "loading ...";
  if (error)
    return (
      <ERROR variant="h2" color="error">
        ERROR 404 !!
      </ERROR>
    );
  const {
    title,
    body,
    state,
    createdAt,
    jobsNeeded,
    employer,
    close,
    requests,
  } = data.gePostById;
  return (
    <>
      <Grid item xs={12}>
        <PostAppRequestBar value={value} setValue={setValue} />
      </Grid>
      {value === 0 && (
        <>
          <Grid item xs>
            <PostDetailsCard
              title={title}
              state={state}
              craetedAt={createdAt}
              jobsNeeded={jobsNeeded}
            >
              {body}
            </PostDetailsCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <EmployerCard employer={employer} />
          </Grid>
        </>
      )}
      {value === 1 && (
        <>
          <Grid item xs>
            {requests.map(({ _id, ...data }, index) => (
              <UserRequestCard key={index} data={data} />
            ))}
            {!close && userInfo().userType === "jobSekeer" && (
              <CreatePostRequest id={id} />
            )}
            {requests.length === 0 && (
              <Typography
                style={{ textAlign: "center" }}
                color="secondary"
                variant="h5"
              >
                there are no requests
              </Typography>
            )}
          </Grid>
        </>
      )}
    </>
  );
}

const PostAppRequestBar = ({ value, setValue }) => {
  function handleChange(event, nextEvent) {
    setValue(nextEvent);
  }
  return (
    <Paper>
      <Tabs
        style={{ marginBottom: "1rem" }}
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="Post Application Request Bar "
      >
        <Tab label="About Post" />
        <Tab label="requests" />
      </Tabs>
    </Paper>
  );
};

const CreatePostRequest = ({ id }) => {
  const [body, setBody] = useState("");
  const [send, { loading }] = useMutation(SEND_REQUEST, {
    onCompleted(data) {
      const { success } = data.sendRequest;
      if (success) {
        alert("send post successfuly ");
      }
    },
    onError() {},
  });
  function submit() {
    send({
      variables: {
        inputs: {
          PostId: id,
          body,
        },
      },
    });
  }
  return (
    <Paper
      variant="outlined"
      style={{ padding: "1em", paddingBottom: "1.5em" }}
    >
      <Typography variant="h5" color="primary" style={{ margin: "auto" }}>
        send a post request
      </Typography>
      <br />
      <TextField
        variant="outlined"
        multiline
        fullWidth
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="enter first name"
        name="body"
      />
      <br />
      <br />
      <Button
        onClick={submit}
        variant="contained"
        disabled={loading}
        color="primary"
        style={{ float: "right" }}
      >
        Send
      </Button>
      <br />
    </Paper>
  );
};

const UserRequestCard = ({ data }) => {
  const { push } = useHistory();
  const classes = useStyles({ random: Math.random() });
  const { jobSekeer, body, createdAt } = data;
  const { firstName, lastName } = jobSekeer;
  const userName = `${firstName}_${lastName}`;
  return (
    <Card variant="outlined" className={classes.userCard}>
      <CardHeader
        title={`${firstName} ${lastName}`}
        avatar={
          <Avatar
            className={classes.userAvatar}
            onClick={() => push(`/dashboard/profile/${userName}`)}
          >
            {firstName.split("")[0]}
          </Avatar>
        }
        subheader={moment(createdAt).fromNow()}
      />
      <CardContent>
        <Typography variant="h6" color="textPrimary">
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostMoreInfo;
