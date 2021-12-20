import { useState, useMemo } from "react";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Posts from "../../components/profile/Posts";
import Comments from "../../components/profile/Comments";
import Blogs from "../../components/profile/Blogs";
import About from "../../components/profile/AboutUser";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import { GET_USER_BY_USER_NAME } from "../../graphql/queries";
import SocialMediaIcon from "../../components/postComponent/SocialMediaIcon";

const useStyles = makeStyles((theme) => ({
  profileCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: ".5rem",
    textAlign: "center",
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  secondaryText: {
    width: "100%",
  },
  comments: {
    marginTop: "5rem",
    display: "flex",
    flexDirection: "column",
    padding: "2rem",
  },
  blogs: { padding: "2rem" },
}));

function Profile() {
  const classes = useStyles();
  const { userName } = useParams();
  let links = useMemo(() => ["blogs", "comments", "about"], []);
  const [value, setValue] = useState(0);
  function handleChange(e, nextEvent) {
    setValue(nextEvent);
  }
  const { data, loading, error } = useQuery(GET_USER_BY_USER_NAME, {
    variables: { userName },
  });
  if (loading) return "loading ...";
  if (error) return "Error 404";
  const {
    getUserByName: {
      firstName,
      lastName,
      state,
      userType,
      jobSekeer,
      profileImage,
      socialMedia,
    },
  } = data;
  if (userType === "employer") links = ["posts", ...links];
  if (data)
    return (
      <>
        <Grid item xs={12} sm={6} md={3}>
          <Paper square className={classes.profileCard}>
            <Avatar
              src={profileImage ? `/images/${profileImage}` : ""}
              className={classes.avatar}
            ></Avatar>
            <Typography color="primary" variant="h4">
              {` ${firstName} ${lastName}`}
            </Typography>
            <br />
            <Typography
              className={classes.secondaryText}
              color="textSecondary"
              variant="h6"
            >
              {userType}
            </Typography>
            <Typography
              className={classes.secondaryText}
              color="textSecondary"
              variant="h6"
            >
              {state}
            </Typography>
            {jobSekeer && (
              <>
                <Typography
                  className={classes.secondaryText}
                  color="textSecondary"
                  variant="h6"
                >
                  {jobSekeer?.type}
                </Typography>
                <Typography
                  className={classes.secondaryText}
                  color="textSecondary"
                  variant="h6"
                >
                  {jobSekeer?.jobs[0]}
                </Typography>
              </>
            )}
            {socialMedia?.map((socialMedia, link) => (
              <SocialMediaIcon
                key={link}
                socialMedia={socialMedia}
                link={link}
              />
            ))}
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper square className={classes.blogs}>
            <Paper square>
              <Tabs
                value={value}
                indicatorColor="secondary"
                textColor="secondary"
                onChange={handleChange}
                aria-label="profile Bar"
              >
                {links.map((l) => (
                  <Tab key={l} label={l} />
                ))}
              </Tabs>
            </Paper>
            <br />
            <br />
            {value === links.length - 4 && (
              <Posts _id={data.getUserByName._id} />
            )}
            {value === links.length - 3 && (
              <Blogs _id={data.getUserByName._id} />
            )}
            {value === links.length - 2 && (
              <Comments _id={data.getUserByName._id} />
            )}
            {value === links.length - 1 && <About />}
          </Paper>
        </Grid>
      </>
    );
}

export default Profile;
