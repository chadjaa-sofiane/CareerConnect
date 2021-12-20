import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { CREAT_BLOG } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { userInfo } from "../../cache";

const userStyles = makeStyles({
  root: {
    padding: "1em",
  },
  imagesField: {
    width: "100%",
  },
  image: {
    width: "100%",
    height: "20em",
  },
});

function CreateBlog() {
  const { push } = useHistory();
  const userName = `${userInfo().firstName}_${userInfo().lastName}`;
  const [src, setSrc] = useState("");
  const classes = userStyles();
  const [states, setStates] = useState({});
  const [createBlogMutation, { loading }] = useMutation(CREAT_BLOG, {
    onCompleted() {
      alert("blog has created successfuly ");
      push(`/dashboard/profile/${userName}`);
    },
    update(cache, { data }) {
      const cacheId = cache.identify(data.deleteBlog);
      cache.modify({
        fields: {
          getBlogsById: (existingBlogs = [], { toReference }) => {
            return [...existingBlogs, toReference(cacheId)];
          },
        },
      });
    },
  });
  function creatBlog() {
    if (!states.Image) return;
    createBlogMutation({
      variables: { inputs: states },
    });
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setStates((p) => ({ ...p, [name]: value }));
  }
  function handleImage(e) {
    const Image = e.target.files[0];
    setStates((p) => ({ ...p, Image }));
    readFile(Image);
  }
  function readFile(file) {
    var reader = new FileReader();
    reader.onload = function () {
      var dataURL = reader.result;
      setSrc(dataURL);
    };
    reader.readAsDataURL(file);
  }
  console.log(states);
  return (
    <Grid item xs={12} sm={8} md={6} style={{ margin: "3em auto" }}>
      <Paper className={classes.root}>
        <div className={classes.imagesField}>
          {src && <img className={classes.image} src={src} alt="blog" />}
        </div>
        <input type="file" id="blog_image" hidden onChange={handleImage} />
        <label
          accept="image/*"
          htmlFor="blog_image"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            variant="contained"
            color="primary"
            component="span"
            endIcon={<AddPhotoAlternateIcon />}
          >
            add Image
          </Button>
        </label>
        <br />
        <br />
        <div>
          <Typography variant="h6" color="primary">
            Title :
          </Typography>
          <TextField
            fullWidth
            type="text"
            name="title"
            onChange={handleChange}
          />
        </div>
        <br />
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <TextField
            fullWidth
            multiline
            type="text"
            name="body"
            onChange={handleChange}
          />
          <br />
          <br />
          <Button
            onClick={creatBlog}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            submit
          </Button>
        </div>
      </Paper>
    </Grid>
  );
}

export default CreateBlog;
