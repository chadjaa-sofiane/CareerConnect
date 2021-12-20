import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { userInfo } from "../../cache";
import { useMutation } from "@apollo/client";
import { CHANGE_PROFILE } from "../../graphql/mutations";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "1em",
  },
  avatar_field: {
    display: "flex",
    textAlign: "center",
    flexDirection: "column",
  },
  avatar: {
    width: theme.spacing(32),
    height: theme.spacing(32),
    margin: "auto",
  },
  infoField: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "1em",
  },
}));

function UserSetting() {
  const {
    profileImage,
    firstName,
    lastName,
    jobFiled,
    state,
    userType,
    description,
  } = userInfo();
  const classes = useStyles();
  const [changeProfileImageMutation, { loading }] = useMutation(
    CHANGE_PROFILE,
    {
      update(cache, data) {
        cache.modify({
          fields: {
            getMyInfo: (_, exisingInfo) => {
              exisingInfo.profileImage = data.ChangeProfile;
              return profileImage;
            },
          },
        });
        alert("update profile successfuly !!");
      },
    }
  );
  async function changeProfileImage(e) {
    const file = await e.target.files[0];
    if (!file) return;

    await changeProfileImageMutation({
      variables: {
        file,
      },
    });
  }
  return (
    <Paper className={classes.root} variant="outlined">
      <Grid container justifyContent="center">
        <Grid className={classes.avatar_field} item xs={10} sm={4}>
          <Avatar
            src={profileImage && `/images/${profileImage}`}
            className={classes.avatar}
          ></Avatar>
          <br />
          <input
            onChange={changeProfileImage}
            accept="image/*"
            type="file"
            hidden
            id="Image"
          />
          <label htmlFor="Image">
            <Button
              disabled={loading}
              variant="contained"
              component="span"
              color="primary"
            >
              change you profile image
            </Button>
          </label>
        </Grid>
        <br />
        <br />
        <br />
        {/*         <Grid style={{ marginTop: "5em" }} item xs={12}>
          <Typography variant="h6" color="primary">
            description
          </Typography>
          <TextField defaultValue={""} />
        </Grid> */}
        <br />
        <Grid item xs={12}>
          <Paper
            style={{ padding: "1em", marginTop: "2em" }}
            variant="outlined"
          >
            <div className={classes.infoField}>
              <Typography color="primary" variant="h6">
                jobFiled :
              </Typography>

              <Typography
                style={{ marginLeft: ".5em" }}
                color="textPrimary"
                variant="h6"
              >
                {jobFiled}
              </Typography>
            </div>
            <div className={classes.infoField}>
              <Typography color="primary" variant="h6">
                first name :
              </Typography>

              <Typography
                style={{ marginLeft: ".5em" }}
                color="textPrimary"
                variant="h6"
              >
                {firstName}
              </Typography>
            </div>
            <div className={classes.infoField}>
              <Typography color="primary" variant="h6">
                last name :
              </Typography>

              <Typography
                style={{ marginLeft: ".5em" }}
                color="textPrimary"
                variant="h6"
              >
                {lastName}
              </Typography>
            </div>
            <div className={classes.infoField}>
              <Typography color="primary" variant="h6">
                state :
              </Typography>

              <Typography
                style={{ marginLeft: ".5em" }}
                color="textPrimary"
                variant="h6"
              >
                {state}
              </Typography>
            </div>
            <div className={classes.infoField}>
              <Typography color="primary" variant="h6">
                user type :
              </Typography>

              <Typography
                style={{ marginLeft: ".5em" }}
                color="textPrimary"
                variant="h6"
              >
                {userType}
              </Typography>
            </div>
            <div className={classes.infoField}>
              <Typography color="primary" variant="h6">
              description :
              </Typography>

              <Typography
                style={{ marginLeft: ".5em" }}
                color="textPrimary"
                variant="h6"
              >
                {description}
              </Typography>
            </div>
          </Paper>
        </Grid>
        <br />
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            style={{ marginTop: "5em" }}
            color="primary"
            variant="contained"
            endIcon={<ExitToAppIcon />}
          >
            logout
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default UserSetting;
