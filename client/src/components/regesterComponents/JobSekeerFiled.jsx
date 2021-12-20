import { useQuery } from "@apollo/client";
import { GET_JOB_FIELD } from "../../graphql/queries";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

const useStyle = makeStyles(() => ({
  textField: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    float: "right",
  },
}));

function JobSekeerFiled({ states, setState, handleChange }) {
  const classes = useStyle();
  const { data, loading } = useQuery(GET_JOB_FIELD, {
    variables: { jobField: states.jobFiled },
  });
  return (
    <>
      <Typography className={classes.textField} variant="h6" color="primary">
        job sekeer filed
      </Typography>
      <div className={classes.textField}>
        <Typography variant="h6" color="textPrimary">
          User Type :
        </Typography>
        <Select
          name="type"
          value={states.jobSekeer.type}
          onChange={(e) => handleChange(e, "jobSekeer")}
        >
          <MenuItem value="employee">employer</MenuItem>
          <MenuItem value="freelancer">freelancer</MenuItem>
        </Select>
      </div>
      <br />
      <br />
      {loading && "loading ...."}
      {!loading && (
        <>
          <div className={classes.textField}>
            <Typography variant="h6" color="textPrimary">
              job field :
            </Typography>
            <Select
              name="jobFiled"
              onChange={(e) =>
                setState((p) => ({ ...p, [e.target.name]: e.target.value }))
              }
              value={states.jobFiled}
            >
              {data &&
                data?.getAllJobsField?.map((field) => (
                  <MenuItem key={field} value={field}>
                    {field}
                  </MenuItem>
                ))}
            </Select>
          </div>
          <div className={classes.textField}>
            <Typography variant="h6" color="textPrimary">
              jobs
            </Typography>
            <Select
              onChange={(e) =>
                setState((p) => ({
                  ...p,
                  jobSekeer: { ...states["jobSekeer"], jobs: e.target.value },
                }))
              }
              value={states.jobSekeer.jobs || data.jobAccordingField[0]}
            >
              {data?.jobAccordingField?.map((field) => (
                <MenuItem key={field} value={field}>
                  {field}
                </MenuItem>
              ))}
            </Select>
          </div>
        </>
      )}
    </>
  );
}

export default JobSekeerFiled;
