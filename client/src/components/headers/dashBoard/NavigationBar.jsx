import { useMemo } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ExploreIcon from "@material-ui/icons/Explore";
import HomeIcon from "@material-ui/icons/Home";
import { useTabValue } from "../../../lib/hooks";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  navBarContainer: {
    width: "20rem",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  navBar: {
    width: "100%",
    flexGrow: 1,
  },
}));

const NavigationBar = () => {
  const classes = useStyles();
  const allTabs = useMemo(() => ["home", "search"], []);
  const { handleChange, value } = useTabValue(allTabs, "/dashboard");
  return (
    <div className={classes.navBarContainer}>
      <Tabs
        centered
        value={value}
        variant="fullWidth"
        onChange={handleChange}
        className={classes.navBar}
      >
        <Tab color="textPrimary" icon={<HomeIcon />} disabled />
        <Tab color="textPrimary" icon={<ExploreIcon />} />
      </Tabs>
    </div>
  );
};

export default NavigationBar;
