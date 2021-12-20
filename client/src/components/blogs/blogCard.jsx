import moment from "moment";
import { useState } from "react";
import {
  Grid,
  Avatar,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router";
import { DELETE_BLOG } from "../../graphql/mutations";
import { userInfo } from "../../cache";

const userStyle = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    cursor: "pointer",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

function BlogCard({ data }) {
  const { push } = useHistory();
  const classes = userStyle();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { _id, createdAt, user, body, title, imageUrl } = data;
  const { _id: userId, firstName, lastName, profileImage } = user;
  const userName = `${firstName}_${lastName}`;
  return (
    <Grid item xs={12} sm={8}>
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
          action={
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          }
          subheader={moment(createdAt).fromNow()}
        />
        {imageUrl && (
          <CardMedia
            className={classes.media}
            alt="blog"
            image={`/images/${imageUrl}`}
          />
        )}
        <BlogSetting
          userId={userId}
          anchorEl={anchorEl}
          handleClose={handleClose}
          blogId={_id}
        />
        <CardContent>
          <Typography variant="h5" color="primary">
            {body}
          </Typography>
          <Typography variant="h6" color="textPrimary">
            {title}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

const BlogSetting = ({ userId, anchorEl = null, handleClose, blogId }) => {
  const { _id } = userInfo();
  const [deleteBlogMuttaion, { loading2 }] = useMutation(DELETE_BLOG, {
    variables: {
      blogId,
    },
    update(cache) {
      cache.modify({
        fields: {
          getBlogsById: (existingBlogs) => {
            existingBlogs.filter((blog) => blog._id !== blogId);
          },
        },
      });
      handleClose();
    },
  });
  const deleteBlog = async () => {
    const r = window.confirm(
      "are you sure do you want to delete this post !!!"
    );
    handleClose();
    if (!r) return;
    await deleteBlogMuttaion();
  };
  const isme = _id === userId;
  return (
    <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose}>
      {isme && (
        <MenuItem disabled={loading2} onClick={deleteBlog}>
          delete post
        </MenuItem>
      )}
      <MenuItem> share your blog </MenuItem>
    </Menu>
  );
};

export default BlogCard;
