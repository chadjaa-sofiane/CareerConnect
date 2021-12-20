import { useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { userInfo } from "../../cache";
import { useForm } from "../../lib/hooks";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, withStyles } from "@material-ui/core";
import JobsNeededFiled from "../../components/postComponent/createPostComponent/JobsNeededFiled";
import { GET_ALL_STATES, GET_JOBS } from "../../graphql/queries";
import { CREATE_POST } from "../../graphql/mutations";

const useStyle = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    padding: "1rem",
  },
  textField: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  select: {
    width: "10rem",
  },
  JobNeededContainer: {
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    marginTop: "2rem",
  },
  workRange: {
    display: "flex",
    alignItems: "center",
  },
  submitField: {
    padding: ".5rem 1rem",
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const Title = withStyles(() => ({
  root: {
    textAlign: "center",
  },
}))(Typography);

function CreatePost() {
  const classes = useStyle();
  const history = useHistory();
  const { data: countrystates } = useQuery(GET_ALL_STATES);
  const [getJobs, { data: jobs }] = useLazyQuery(GET_JOBS);
  const [states, handleChange, setState] = useForm({
    title: "",
    body: "",
    state: "",
    jobSekeerType: "freelancer",
  });
  const [createPost] = useMutation(CREATE_POST, {
    update(_, { data: { createPost } }) {
      alert("create post successfuly");
      history.push("/dashboard/search");
    },
    variables: { inputs: states },
  });
  function addJob(job) {
    const jobsNeeded = states.jobsNeeded || [];
    const index = jobsNeeded.length || 0;
    setState({
      ...states,
      jobsNeeded: [...jobsNeeded, { index, ...job }],
    });
  }

  function updatePost(job) {
    let jobsNeeded = states.jobsNeeded.map((e) => {
      if (e.index === job.index) return job;
      return e;
    });
    setState({ ...states, jobsNeeded });
  }
  function deletePost(index) {
    const jobsNeeded = states.jobsNeeded.filter((e) => e.index !== index);
    setState({ ...states, jobsNeeded });
  }

  function createNewPost() {
    createPost();
  }
  const DefaultStates = useCallback(() => {
    getJobs({ variables: { jobField: userInfo().jobFiled } });
    setState((prevStates) => ({ ...prevStates, state: userInfo().state }));
  }, [
    getJobs, setState]);

  useEffect(() => {
    DefaultStates();
  }, [DefaultStates]);

  if (userInfo().userType !== "employer")
    return history.push("/dashboard/search");

  return (
    <>
      <Grid
        item
        xs={12}
        md={8}
        style={{ margin: "auto", marginBottom: "5rem" }}
      >
        <Paper variant="outlined">
          <form className={classes.root}>
            <Title variant="h3" color="primary">
              Create a new Post
            </Title>
            <br />
            <label className={classes.textField}>
              <Typography variant="h6" style={{ width: "10rem" }}>
                title :
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="enter the title"
                value={states.title}
                name="title"
                onChange={handleChange}
              />
            </label>
            <br />
            <br />
            <label className={classes.textField}>
              <Typography variant="h6" style={{ width: "10rem" }}>
                body :
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="enter the body"
                value={states.body}
                name="body"
                onChange={handleChange}
              />
            </label>
            <br />
            <br />
            <div style={{ display: "flex" }}>
              <Typography variant="h6" style={{ marginRight: "2rem" }}>
                state :
              </Typography>
              <Select
                className={classes.select}
                name="state"
                value={states.state || ""}
                onChange={(e) =>
                  setState((p) => ({ ...p, state: e.target.value }))
                }
              >
                {countrystates &&
                  countrystates?.getAllStates?.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
              </Select>
            </div>
            <br />
            <br />
            <div style={{ display: "flex" }}>
              <Typography variant="h6" style={{ marginRight: "2rem" }}>
                Job Sekeer Type Needed :
              </Typography>
              <Select
                className={classes.select}
                name="jobSekeerType"
                value={states.jobSekeerType}
                onChange={(e) =>
                  setState((p) => ({ ...p, jobSekeerType: e.target.value }))
                }
              >
                <MenuItem value="freelancer">freelancer</MenuItem>
                <MenuItem value="employee">employee</MenuItem>
              </Select>
            </div>
            <br />
            <br />
            {states?.jobsNeeded?.length && (
              <>
                <Typography
                  color="primary"
                  variant="h3"
                  style={{ margin: "auto" }}
                >
                  jobsNeeded
                </Typography>
                {states.jobsNeeded.map((j) => (
                  <JobsNeededFiled
                    key={j.index}
                    jobs={jobs.getJobsByJobFieldName}
                    jobStates={j}
                    isdisabled
                    deletePost={deletePost}
                    updatePost={updatePost}
                  />
                ))}
              </>
            )}
            <br />
            {jobs && (
              <JobsNeededFiled
                addNew={addJob}
                jobs={jobs.getJobsByJobFieldName}
              />
            )}
          </form>
          <div className={classes.submitField}>
            <Button onClick={createNewPost} color="primary" variant="contained">
              create new Post
            </Button>
          </div>
        </Paper>
      </Grid>
    </>
  );
}

export default CreatePost;
