import { useHistory } from "react-router";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

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

function GetUsers({ users }) {
  return (
    <Grid container item xs={12} spacing={2}>
      {users.map(({ _id, ...data }) => (
        <UserCard key={_id} data={data} />
      ))}
    </Grid>
  );
}

const UserCard = ({ data }) => {
  const { push } = useHistory();
  const classes = useStyles({ random: Math.random() });
  const { firstName, lastName, profileImage, description } = data;
  const newdescription =
    description.length >= 55 ? `${description.slice(0, 55)} ...` : description;
  const userName = `${firstName}_${lastName}`;
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.userCard}>
        <CardHeader
          title={`${firstName} ${lastName}`}
          avatar={
            <Avatar
              onClick={() => push(`/dashboard/profile/${userName}`)}
              src={profileImage ? `/images/${profileImage}` : ""}
              className={classes.userAvatar}
            >
              {userName.split("")[0]}
            </Avatar>
          }
        />
        <CardContent>
          <Typography color="textPrimary" variant="h6">
            {newdescription}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default GetUsers;
