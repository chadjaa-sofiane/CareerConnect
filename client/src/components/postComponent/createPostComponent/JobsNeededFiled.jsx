import { useState, useMemo, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Update";
import { useForm } from "../../../lib/hooks";
import { Button, makeStyles } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import { fade } from "@material-ui/core/styles/colorManipulator";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    padding: "2rem",
  },
  textField: {
    width: "100%",
    display: "flex",
    alingItems: "center",
  },
  label: {
    width: "6em",
  },
  textInput: {
    flex: 1,
    margin: "0 1rem",
    padding: "0 .2rem",
    background: "none",
    outline: "none",
    border: "none",
    "&::placeholder": {
      color: theme.palette.secondary.light,
    },
  },
  numberInput: {
    width: "6rem",
    textAlign: "right",
    marginLeft: "1rem",
  },
  select: {
    margin: "0 1rem",
  },
  JobNeededContainer: {
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    marginTop: "2rem",
    backgroundColor: ({ isdisabled }) =>
      isdisabled
        ? fade(theme.palette.secondary.main, 0.05)
        : fade(theme.palette.primary.main, 0.05),
  },
  btns: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const initialState = {
  job: "",
  workHours: 0,
  salaryRange: { currency: "da", amount: 0 },
};

const JobsNeededFiled = ({
  addNew = null,
  deletePost = null,
  updatePost = null,
  jobs,
  isdisabled = false,
  jobStates = { ...initialState, job: jobs[0] || "" },
}) => {
  const classes = useStyle({ isdisabled });
  const oldState = useMemo(() => jobStates, [jobStates]);
  const [disabled, toggleDisabled] = useState(isdisabled);
  const [states, handleChange, setJobNeededState] = useForm(jobStates);
  function handleTime(e) {
    const { name, value } = e.target;
    const time = parseInt(value.split(":")[0]);
    const workTimeRange = states?.workTimeRange || {};
    setJobNeededState((p) => ({
      ...p,
      workTimeRange: { ...workTimeRange, [name]: time },
    }));
  }
  function handleSalary(e) {
    const { name, value } = e.target;
    const inputValue = name === "currency" ? value : parseInt(value);
    setJobNeededState((p) => ({
      ...p,
      salaryRange: { ...p["salaryRange"], [name]: inputValue },
    }));
  }
  function unDisabled() {
    toggleDisabled(false);
  }
  function update() {
    updatePost(states);
    toggleDisabled(true);
  }
  function cancelUpdate() {
    setJobNeededState(oldState);
    toggleDisabled(true);
  }
  useEffect(() => toggleDisabled(isdisabled), [isdisabled]);
  return (
    <Paper
      square
      variant="elevation"
      elevation={1}
      className={classes.JobNeededContainer}
    >
      <Typography component="div" variant="h5" className={classes.textField}>
        <span className={classes.label}>description :</span>
        <input
          type="text"
          disabled={disabled}
          className={classes.textInput}
          name="description"
          value={states.description || ""}
          onChange={handleChange}
          placeholder="enter the description here"
        />
      </Typography>
      <br />
      <Typography component="div" variant="h5" className={classes.textField}>
        <span className={classes.label}>job :</span>
        <Select
          disabled={disabled}
          value={jobs.indexOf(states.job) >= 0 ? states.job : ""}
          onChange={(e) =>
            setJobNeededState((p) => ({ ...p, job: e.target.value }))
          }
        >
          {jobs &&
            jobs?.map((j, index) => (
              <MenuItem key={index} value={j}>
                {j}
              </MenuItem>
            ))}
        </Select>
        <input
          type="text"
          value={jobs.indexOf(states.job) >= 0 ? "" : states.job}
          disabled={disabled}
          className={classes.textInput}
          name="job"
          onChange={handleChange}
          placeholder="other"
        />
      </Typography>
      <br />
      <Typography component="div" variant="h5" className={classes.textField}>
        <span className={classes.label}> work from :</span>
        <div>
          <Input
            disabled={disabled}
            type="time"
            name="start"
            defaultValue={`${states?.workTimeRange?.start}:00` || ""}
            onChange={handleTime}
            className={classes.textInput}
          />
          to :
          <Input
            disabled={disabled}
            type="time"
            name="finish"
            defaultValue={`${states?.workTimeRange?.finish}:00` || ""}
            onChange={handleTime}
            className={classes.textInput}
          />
        </div>
      </Typography>
      <br />
      <Typography component="div" variant="h5" className={classes.textField}>
        <span className={classes.label}>work hours :</span>
        <Input
          type="number"
          disabled={disabled}
          value={states.workHours || "0"}
          onChange={(e) =>
            setJobNeededState((p) => ({
              ...p,
              workHours: parseInt(e.target.value),
            }))
          }
          className={classes.numberInput}
          inputProps={{ min: "0" }}
        />
      </Typography>
      <br />
      <Typography component="div" variant="h5" className={classes.textField}>
        <span className={classes.label}>number :</span>
        <Input
          type="number"
          disabled={disabled}
          className={classes.numberInput}
          value={states.number || "1"}
          onChange={(e) =>
            setJobNeededState((p) => ({
              ...p,
              number: parseInt(e.target.value),
            }))
          }
          inputProps={{ min: "0" }}
        />
      </Typography>
      <br />
      <br />
      <Typography component="div" variant="h5" className={classes.textField}>
        <span className={classes.label}>salary:</span>
        <Input
          type="number"
          className={classes.numberInput}
          disabled={disabled}
          name="amount"
          value={states.salaryRange.amount || 0}
          onChange={handleSalary}
          inputProps={{ min: "0", step: "100" }}
        />
        <Select
          disabled={disabled}
          name="currency"
          onChange={handleSalary}
          className={classes.select}
          value={states.salaryRange.currency}
        >
          <MenuItem value="$">$</MenuItem>
          <MenuItem value="€">€</MenuItem>
          <MenuItem value="da">da</MenuItem>
        </Select>
      </Typography>
      <br />
      {addNew && (
        <Button
          color="secondary"
          variant="contained"
          onClick={() => addNew(states)}
          style={{ marginLeft: "auto" }}
        >
          add
        </Button>
      )}
      <div className={classes.btns}>
        {deletePost && updatePost && disabled && (
          <>
            <IconButton onClick={unDisabled} color="secondary" fontSize="large">
              <UpdateIcon />
            </IconButton>
            <IconButton
              onClick={() => deletePost(states.index)}
              color="secondary"
              fontSize="large"
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
        {deletePost && updatePost && !disabled && (
          <>
            <Button color="primary" onClick={update}>
              accept
            </Button>
            <Button color="secondary" onClick={cancelUpdate}>
              cancel
            </Button>
          </>
        )}
      </div>
    </Paper>
  );
};
export default JobsNeededFiled;
