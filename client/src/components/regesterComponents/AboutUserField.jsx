import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles(() => ({
  textFiledsContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: "2rem",
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

function AboutUserField({ children, handleBack, handleNext }) {
  const classes = useStyle();
  return (
    <>
      <form className={classes.textFiledsContainer}>{children}</form>
      <br/>
      <br/>
      <div style={{ padding: "0 1.5em" }}>
        <Button
          onClick={handleBack}
          disabled={false}
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
          onClick={() => {
            handleNext();
          }}
          size="large"
        >
          next
        </Button>
      </div>
    </>
  );
}

export default AboutUserField;
