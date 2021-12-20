import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles(() => ({
  userFiledsContainer: {
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

const UserForm = ({
  states,
  setState,
  errors,
  handleChange,
  handleBack,
  submit,
  loading,
}) => {
  const classes = useStyle();
  return (
    <>
      <form className={classes.userFiledsContainer}>
        <label className={classes.textField}>
          <Typography style={{ width: "10rem" }}>first name :</Typography>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="enter first name"
            value={states.firstName}
            name="firstName"
            onChange={handleChange}
            helperText={
              <Typography component="span" color="error">
                {errors?.firstName && errors?.firstName.isLength}
              </Typography>
            }
            error={errors?.firstName ? true : false}
          />
        </label>
        <br />
        <br />
        <label className={classes.textField}>
          <Typography style={{ width: "10rem" }}>last name :</Typography>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="enter last name"
            value={states.lastName}
            name="lastName"
            onChange={handleChange}
            helperText={
              <Typography component="span" color="error">
                {errors?.lastName && errors?.lastName.isLength}
              </Typography>
            }
            error={errors?.lastName ? true : false}
          />
        </label>
        <br />
        <br />
        <label className={classes.textField}>
          <Typography style={{ width: "10rem" }}>email :</Typography>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="enter your email"
            value={states.email}
            name="email"
            onChange={handleChange}
            helperText={
              <Typography component="span" color="error">
                {errors?.email?.isEmail && errors?.email?.isEmail}
                {errors?.email === 1 && "email already exist"}
              </Typography>
            }
            error={errors?.email ? true : false}
          />
        </label>
        <br />
        <br />
        <label className={classes.textField}>
          <Typography style={{ width: "10rem" }}>password :</Typography>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="enter your password"
            value={states.password}
            name="password"
            type="password"
            onChange={handleChange}
            helperText={
              <Typography component="span" color="error">
                {errors?.password && errors?.password.isLength}
              </Typography>
            }
            error={errors?.password ? true : false}
          />
        </label>
        <br />
        <br />
        <label className={classes.textField}>
          <Typography style={{ width: "10rem" }}>description :</Typography>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="enter your description"
            value={states.description}
            name="description"
            onChange={handleChange}
          />
        </label>
        <br />
        <div style={{ width: "100% " }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={states.gender}
              onChange={(e) =>
                setState((p) => ({ ...p, gender: e.target.value }))
              }
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="personale"
                control={<Radio />}
                label="personale"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <br /> <br />
        <label className={classes.textField}>
          <Typography variant="h6" style={{ width: "10rem" }}>
            borth Date :
          </Typography>
          <TextField
            type="date"
            name="borthDate"
            value={states.borthDate}
            className={classes.textField}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            helperText={
              <Typography component="span" color="error">
                {errors?.borthDate && "inValid Date"}
              </Typography>
            }
            error={errors?.borthDate ? true : false}
          />
        </label>
        <br /> <br />
        <Typography variant="h6" color="secondary">
          phone :
        </Typography>
        <label className={classes.textField}>
          <Typography variant="h6" style={{ width: "10rem" }}>
            number :
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="enter your phone number"
            value={states.phone.number}
            type="tel"
            name="number"
            onChange={(e) => handleChange(e, "phone")}
            helperText={
              <Typography component="span" color="error">
                {errors["phone.number"] === 1 && "number already exist"}
              </Typography>
            }
            error={errors["phone.number"] === 1 ? true : false}
          />
        </label>
        <Typography variant="h6" color="textSecondary">
          would you phone be visible to people :
          <Checkbox
            checked={states.phone.visible}
            name="visible"
            onChange={(e) => handleChange(e, "phone")}
          />
        </Typography>
        {errors?.userName && (
          <Typography variant="h6" color="secondary">
            {errors.userName}
          </Typography>
        )}
      </form>
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
          onClick={submit}
          size="large"
        >
          finish
        </Button>
      </div>
    </>
  );
};

export default UserForm;
