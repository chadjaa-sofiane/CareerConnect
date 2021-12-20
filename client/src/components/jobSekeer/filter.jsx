import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery, gql } from "@apollo/client";

const useStyles = makeStyles({
  root: {
    width: "100%",
    padding: "1em",
  },
});

function Filter({ filter, setFilter }) {
  const classes = useStyles();
  const { data, loading, error } = useQuery(
    gql`
      query {
        getAllJobsField
      }
    `
  );
  if (loading) return "loading...";
  if (error) return "error";
  return (
    <Paper
      className={classes.root}
      variant="outlined"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <Select
        value={filter.jobSekeerType}
        onChange={(e) =>
          setFilter((p) => ({ ...p, jobSekeerType: e.target.value }))
        }
      >
        <MenuItem value="freelancer"> freelancer </MenuItem>
        <MenuItem value="employee"> employee </MenuItem>
      </Select>
      <Select
        defaultValue={filter.jobFiled || data.getAllJobsField[0]}
        onChange={(e) => setFilter((p) => ({ ...p, jobFiled: e.target.value }))}
      >
        {data.getAllJobsField?.map((f) => (
          <MenuItem key={f} value={f}>
            {f}
          </MenuItem>
        ))}
      </Select>
    </Paper>
  );
}

export default Filter;
