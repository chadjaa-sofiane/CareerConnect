import Button from "@material-ui/core/Button";
import { gql, useQuery } from "@apollo/client";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles(() => ({
  textFiledsContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: "4rem",
  },
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

function LocationField({ states, handleChange, handleBack, handleNext }) {
  const classes = useStyle();
  const { data, loading } = useQuery(
    gql`
      query {
        getAllStates
      }
    `
  );
  if (loading) return "loading...";
  return (
    <>
      <form className={classes.textFiledsContainer}>
        <label className={classes.textField}>
          <Typography variant="h6" style={{ width: "10rem" }}>
            adress (*) :
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="enter your adress"
            name="adress"
            onChange={handleChange}
            value={states.adress}
          />
        </label>
        <br />
        <br />
        <div className={classes.textField}>
          <Typography variant="h6" color="textPrimary">
            State :
          </Typography>
          <Select name="state" value={states.state} onChange={handleChange}>
            {data &&
              data?.getAllStates?.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
          </Select>
        </div>
        <br /> <br />
      </form>
      <div style={{ padding: "0 3em" }}>
        <Button
          onClick={handleBack}
          disabled={true}
          color="secondary"
          variant="contained"
          size="large"
        >
          Back
        </Button>
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          onClick={handleNext}
          size="large"
        >
          next
        </Button>
      </div>
    </>
  );
}

export default LocationField;
