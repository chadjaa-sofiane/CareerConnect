import { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useTabValue } from "../lib/hooks";

const useStyle = makeStyles((theme) => ({
  root: {
    marginBottom: "1rem",
    padding: "1rem 1rem 0 1rem",
  },
}));

function SearchBar() {
  const classes = useStyle();
  const links = useMemo(() => ["Posts", "Employers", "JobSekeers"], []);
  const { value, handleChange } = useTabValue(links, "/dashboard/search");
  return (
    <Grid item xs={12}>
      <Paper variant="outlined" className={classes.root}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="search bar"
        >
          <Tab label="posts" />
          <Tab label="employers" />
          <Tab label="jobSekeers" />
        </Tabs>
      </Paper>
    </Grid>
  );
}

export default SearchBar;
