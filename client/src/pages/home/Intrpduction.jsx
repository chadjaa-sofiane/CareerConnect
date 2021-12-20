import { makeStyles, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router";
import { isLoggedIn } from "../../cache";

const useStyles = makeStyles({
  root: {
    width: "100%",
    minHeight: "60vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    maxWidth: "15em",
    textAlign: "center",
  },
  btnGroupe: {
    marginTop: "2em",
  },
  btn: {
    margin: "0 1em",
    minWidth: "10em",
  },
});

function Intrpduction() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <Typography className={classes.description} color="primary" variant="h3">
        welcome is soft folio here we help you to find a job
      </Typography>
      <div className={classes.btnGroupe}>
        {isLoggedIn() ? (
          <Button
            onClick={() => history.push("dashboard/search")}
            className={classes.btn}
            variant="outlined"
            color="secondary"
            size="large"
          >
            go to dashboard
          </Button>
        ) : (
          <>
            <Button
              onClick={() => history.push("/regester")}
              className={classes.btn}
              variant="outlined"
              color="primary"
            >
              regester
            </Button>
            <Button
              onClick={() => history.push("/login")}
              className={classes.btn}
              variant="outlined"
              color="secondary"
            >
              log in
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Intrpduction;
