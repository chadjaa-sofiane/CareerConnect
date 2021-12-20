import { useMemo, useState } from "react";
import { useForm, useLogAuth } from "../lib/hooks";
import { REGESTER } from "../graphql/mutations";
import Typography from "@material-ui/core/Typography";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core";
import StepConnector from "@material-ui/core/StepConnector";
import ColorlibStepIcon from "../components/regesterComponents/ColorlibStepIcon";
import UserForm from "../components/regesterComponents/UserForm";
import LocationField from "../components/regesterComponents/LocationField";
import AboutUserField from "../components/regesterComponents/AboutUserField";
import EmployerFiled from "../components/regesterComponents/EmployerFiled";
import JobSekeerFiled from "../components/regesterComponents/JobSekeerFiled";
import UserTypeField from "../components/regesterComponents/UserTypeField";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useStyle = makeStyles(() => ({
  root: {
    margin: "5rem 0",
    padding: "1rem",
  },
}));

const Title = withStyles(() => ({
  root: {
    textAlign: "center",
  },
}))(Typography);

function getSteps() {
  return ["Location Filed", "useType ", "About User", "Create a user"];
}

const initialState = {
  provider: "regular",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  description: "",
  borthDate: "",
  gender: "male",
  phone: {
    number: "",
    visible: false,
  },
  state: "Oran",
  adress: "",
  userType: "employer",
  jobFiled: "Architecture_engineering",
};

function Regester() {
  const classes = useStyle();
  const getInitialState = useMemo(() => initialState, []);
  const [userData, setUserData, setState] = useForm(getInitialState);
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({});
  const steps = useMemo(() => getSteps(), []);
  const { submit } = useLogAuth(REGESTER, userData, setErrors);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <Grid item xs={12} sm={8} style={{ margin: "auto" }}>
      <Paper className={classes.root} variant="outlined">
        <Title variant="h5" color="primary">
          Regester Page
        </Title>
        <Stepper
          activeStep={activeStep}
          connector={<ColorlibConnector />}
          alternativeLabel
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <br />
        {activeStep === 0 && (
          <LocationField
            states={userData}
            handleChange={setUserData}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        )}
        {activeStep === 1 && (
          <UserTypeField
            states={userData}
            setState={setState}
            handleChange={setUserData}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        )}
        {activeStep === 2 && (
          <AboutUserField
            states={userData}
            setState={setState}
            handleChange={setUserData}
            handleBack={handleBack}
            handleNext={handleNext}
          >
            {userData.userType === "employer" ? (
              <EmployerFiled
                states={userData}
                setState={setState}
                handleChange={setUserData}
              />
            ) : (
              <JobSekeerFiled
                states={userData}
                setState={setState}
                handleChange={setUserData}
              />
            )}
          </AboutUserField>
        )}
        {activeStep === 3 && (
          <UserForm
            states={userData}
            setState={setState}
            errors={errors}
            handleChange={setUserData}
            handleBack={handleBack}
            handleNext={handleNext}
            submit={submit}
          />
        )}
      </Paper>
    </Grid>
  );
}

export default Regester;
