import moment from "moment";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TypoGraphy from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import { userInfo } from "../../cache";
import { TOGGLE_POST_STATUS, DELETE_POST } from "../../graphql/mutations";

const PostCard = withStyles(() => ({
  root: {
    marginBottom: "1rem",
  },
}))(Card);

function Post({
  data: { _id, title, createdAt, jobsNeeded, close, employer },
  children,
}) {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <PostCard>
      <CardHeader
        title={
          <TypoGraphy color="primary" variant="h5">
            {title}
          </TypoGraphy>
        }
        action={
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
        subheader={moment(createdAt).fromNow()}
      />
      <PostSetting
        employerId={employer._id}
        anchorEl={anchorEl}
        close={close}
        handleClose={handleClose}
        postId={_id}
      />
      <CardContent>
        <TypoGraphy>{children}</TypoGraphy>
      </CardContent>
      <CardActions>
        <div
          style={{
            padding: ".5rem 1rem",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {jobsNeeded?.map(({ job }, index) => (
            <TypoGraphy
              key={index}
              style={{ marginRight: "1rem" }}
              color="secondary"
            >
              {job}
            </TypoGraphy>
          ))}
        </div>
        <Button
          style={{ marginLeft: "auto" }}
          color="primary"
          onClick={() => history.push(`/dashboard/post/${_id}`)}
        >
          Learn More
        </Button>
      </CardActions>
    </PostCard>
  );
}

const PostSetting = ({
  employerId,
  anchorEl = null,
  close = false,
  handleClose,
  postId,
}) => {
  const { _id } = userInfo();
  const [toggleClose, { loading1 }] = useMutation(TOGGLE_POST_STATUS, {
    variables: { postId },
    update(cache) {
      cache.modify({
        fields: {
          getAllPosts: (existingPosts) => {
            existingPosts.map((post) => {
              if (post._id === postId) post.close = !post.close;
              return post;
            });
          },
        },
      });
      handleClose();
    },
  });
  const [deletePostMuttaion, { loading2 }] = useMutation(DELETE_POST, {
    variables: {
      postId,
    },
    update(cache) {
      cache.modify({
        fields: {
          getAllPosts: (existingPosts) => {
            existingPosts.filter((post) => post._id !== postId);
          },
        },
      });
      handleClose();
    },
  });
  const deletePost = async () => {
    const r = window.confirm(
      "are you sure do you want to delete this post !!!"
    );
    handleClose();
    if (!r) return;
    await deletePostMuttaion();
  };
  const isme = _id === employerId;
  return (
    <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose}>
      {isme && (
        <MenuItem disabled={loading1} onClick={toggleClose}>
          {close ? "close" : "open"} the post
        </MenuItem>
      )}
      {isme && (
        <MenuItem disabled={loading2} onClick={deletePost}>
          delete post
        </MenuItem>
      )}
    </Menu>
  );
};

export default Post;
