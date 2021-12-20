import moment from "moment";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { GET_COMMENTS_BY_USER_ID } from "../../graphql/queries";
import { makeStyles } from "@material-ui/styles";
import { useMutation, useQuery } from "@apollo/client";
import { Button, TextField } from "@material-ui/core";
import { SEND_COMMENT } from "../../graphql/mutations";
import { userInfo } from "../../cache";

const useStyle = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    cursor: "pointer",
  },
  createCommentField: {
    padding: "1em",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
}));

const Comments = ({ _id }) => {
  const { _id: myId } = userInfo();
  const { data, loading, error } = useQuery(GET_COMMENTS_BY_USER_ID, {
    variables: { id: _id },
  });
  const itIsMe = myId === _id;
  if (error) return "error";
  if (loading) return "loading...";
  return (
    <>
      {data.getCommentsByUserId.length === 0 && (
        <Typography variant="h6" color="secondary" style={{ textAlign:"center" }}>
          there are no comments
        </Typography>
      )}
      {data.getCommentsByUserId.map((c) => (
        <CommentCard data={c} key={c._id} />
      ))}
      {!itIsMe && <CreateComment user={_id} />}
    </>
  );
};

const CommentCard = ({ data }) => {
  const { push } = useHistory();
  const classes = useStyle();
  const { body, createdAt, commentOwner } = data;
  const { firstName, lastName, profileImage } = commentOwner;
  const userName = `${firstName}_${lastName}`;
  return (
    <Grid item xs={12}>
      <Card style={{ marginBottom: "1em" }}>
        <CardHeader
          avatar={
            <Avatar
              className={classes.avatar}
              onClick={() => push(`/dashboard/profile/${userName}`)}
              src={profileImage ? `/images/${profileImage}` : ""}
            >
              {firstName.split("")[0]}
            </Avatar>
          }
          title={
            <Typography color="primary">
              {`${firstName} ${lastName}`}
            </Typography>
          }
          subheader={moment(createdAt).fromNow()}
        />
        <CardContent>
          <Typography variant="h5" color="primary">
            {body}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

const CreateComment = ({ user }) => {
  const [body, setBody] = useState("");
  const classes = useStyle();
  const [sendCommentMutation, { loading }] = useMutation(SEND_COMMENT, {
    variables: { user, body },
    update(cache, { data }) {
      const cacheId = cache.identify(data.sendComment);
      cache.modify({
        fields: {
          getCommentsByUserId: (existingComments = [], { toReference }) => {
            return [...existingComments, toReference(cacheId)];
          },
        },
      });
    },
  });
  function sendComment() {
    if (!body) return alert("comment body most not be empty !!");
    sendCommentMutation();
  }
  return (
    <Grid item xs={12}>
      <Paper className={classes.createCommentField}>
        <Typography style={{ width: "100%" }} variant="h6" color="primary">
          create a comment
        </Typography>
        <br />
        <TextField
          fullWidth
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <br />
        <Button
          onClick={sendComment}
          disabled={loading}
          variant="outlined"
          color="secondary"
        >
          send
        </Button>
      </Paper>
    </Grid>
  );
};

export default Comments;
