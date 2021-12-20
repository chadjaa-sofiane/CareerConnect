import { useQuery } from "@apollo/client";
import { GET_JOB_FIELD } from "../../graphql/queries";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
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

function EmployerFiled({ states, setState, handleChange }) {
  const classes = useStyle();
  const { data, loading } = useQuery(GET_JOB_FIELD, {
    variables: { jobField: states.jobFiled },
  });
  return (
    <>
      <div className={classes.textField}>
        <Typography variant="h6" color="textPrimary">
          Employer Type :
        </Typography>
        <Select
          name="employerType"
          value={states.employer.employerType}
          onChange={(e) =>
            setState({
              ...states,
              employer: { ...states["employer"], employerType: e.target.value },
            })
          }
        >
          <MenuItem value="freelancer_hired">freelancer hired</MenuItem>
          <MenuItem value="Proprietor">Proprietor</MenuItem>
          <MenuItem value="administrator">administrator</MenuItem>
          <MenuItem value="businessman">businessman</MenuItem>
        </Select>
      </div>
      <br />
      <br />

      {states.employer.employerType !== "freelancer_hired" && (
        <>
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
              <br />
              <br />
              <div>
                <Typography color="secondary" variant="h5">
                  organization :
                </Typography>
                <br />
                <br />
                <label className={classes.textField}>
                  <Typography variant="h6" style={{ width: "15rem" }}>
                    name (*) :
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="enter your organization name"
                    name="organizationName"
                    onChange={(e) => handleChange(e, "organization")}
                    value={states?.organization?.organizationName || ""}
                  />
                </label>
                <br />
                <label className={classes.textField}>
                  <Typography variant="h6" style={{ width: "15rem" }}>
                    description (*) :
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="enter description"
                    name="organizationDescription"
                    onChange={(e) => handleChange(e, "organization")}
                    value={states?.organization?.organizationDescription || ""}
                  />
                </label>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
export default EmployerFiled;
