import Grid from "@material-ui/core/Grid";
import { Switch, Route } from "react-router-dom";
import HomeHeader from "../../components/HomeHeader";
import Intrpduction from "./Intrpduction";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
    minHeight: "100vh",
  },
});

function Router() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <HomeHeader />
      <Switch>
        <Grid container>
          <Route path="/" exact>
            <Intrpduction />
          </Route>
        </Grid>
      </Switch>
    </div>
  );
}

export default Router;
