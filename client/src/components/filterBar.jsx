import { useQuery } from "@apollo/client";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/divider";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { GET_ALL_STATES } from "../graphql/queries";

function FilterBar({ filter, setFilter }) {
  const { data, loading } = useQuery(GET_ALL_STATES);
  function handleChange(e) {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  }
  function handleWorkHours(e) {
    const { value } = e.target;
    const jobsNeeded = filter.jobsNeeded || {};
    delete jobsNeeded?.workHoursLessThan;
    delete jobsNeeded?.workHoursMoreThan;
    switch (value) {
      case "1":
        setFilter({
          ...filter,
          jobsNeeded: { ...jobsNeeded, workHoursLessThan: 4 },
        });
        break;
      case "2":
        setFilter({
          ...filter,
          jobsNeeded: {
            ...jobsNeeded,
            workHoursLessThan: 8,
            workHoursMoreThan: 4,
          },
        });
        break;
      case "3":
        setFilter({
          ...filter,
          jobsNeeded: { ...jobsNeeded, workHoursMoreThan: 8 },
        });
        break;
      case "4":
        setFilter({
          ...filter,
          jobsNeeded,
        });
        break;
      default:
        return;
    }
  }
  function handleWorkTime(e) {
    const { value } = e.target;
    const jobsNeeded = filter.jobsNeeded || {};
    delete jobsNeeded?.workTimeRange;
    switch (value) {
      case "1":
        setFilter({
          ...filter,
          jobsNeeded: { ...jobsNeeded, workTimeRange: { finish: 8 } },
        });
        break;
      case "2":
        setFilter({
          ...filter,
          jobsNeeded: {
            ...jobsNeeded,
            workTimeRange: { start: 8, finish: 16 },
          },
        });
        break;
      case "3":
        setFilter({
          ...filter,
          jobsNeeded: { ...jobsNeeded, workTimeRange: { start: 16 } },
        });
        break;
      case "4":
        setFilter({
          ...filter,
          jobsNeeded,
        });
        break;
      default:
        return;
    }
  }
  if (loading) return "loading ....";
  return (
    <Grid item xs={12} sm={4} md={3}>
      <Paper variant="outlined" elevation={10}>
        <List
          aria-labelledby="filter-bar"
          component="nav"
          subheader={
            <Typography
              style={{ textAlign: "center" }}
              color="secondary"
              component="div"
              variant="h4"
            >
              Filter
            </Typography>
          }
        >
          <ListItem component="div">
            <ListItemText primary="State :" color="primary" />
            <Select name="state" value={filter.state} onChange={handleChange}>
              {data &&
                data?.getAllStates?.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
            </Select>
          </ListItem>
          <Divider component="li" />
          <ListItem component="div">
            <ListItemText primary="JobSekeer Type :" />
          </ListItem>
          <ListItem>
            <RadioGroup
              style={{ flexDirection: "row" }}
              name="jobSekeerType"
              aria-label="gender"
              onChange={handleChange}
            >
              <FormControlLabel
                value="employee"
                control={<Radio />}
                label="employee"
              />
              <FormControlLabel
                value="freelancer"
                control={<Radio />}
                label="freelancer"
              />
            </RadioGroup>
          </ListItem>
          <Divider component="li" />
          <ListItem component="div">
            <ListItemText primary="work howrs :" />
          </ListItem>
          <ListItem>
            <RadioGroup
              style={{ flexDirection: "row" }}
              aria-label="work hour"
              onChange={handleWorkHours}
              defaultValue="4"
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="less than 4h"
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="between 4h and 8h"
              />
              <FormControlLabel
                value="3"
                control={<Radio />}
                label="more than 8h"
              />
              <FormControlLabel value="4" control={<Radio />} label="Any" />
            </RadioGroup>
          </ListItem>
          <Divider component="li" />
          <ListItem component="div">
            <ListItemText primary="work time :" />
          </ListItem>
          <ListItem>
            <RadioGroup
              style={{ flexDirection: "row" }}
              aria-label="work Time"
              onChange={handleWorkTime}
              defaultValue="4"
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="00:00 - 08:00"
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="08:00 - 16:00"
              />
              <FormControlLabel
                value="3"
                control={<Radio />}
                label="16:00 - 00:00"
              />
              <FormControlLabel value="4" control={<Radio />} label="Any" />
            </RadioGroup>
          </ListItem>
        </List>
      </Paper>
    </Grid>
  );
}

export default FilterBar;
