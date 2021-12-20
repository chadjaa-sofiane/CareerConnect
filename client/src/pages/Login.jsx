import { useState } from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { useForm, useLogAuth } from "../lib/hooks";
import { Button, makeStyles, withStyles } from "@material-ui/core";
import { LOG_IN } from "../graphql/mutations";

const Title = withStyles(() => ({
  root: {
    textAlign: "center",
  },
}))(Typography);

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: "5em",
    padding:"1em"
  },
  loginFiledsContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "1em auto",
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
  Link:{
    color:theme.palette.primary.light,
    fontWeight:"600"
  }
}));

function Login() {
  const classes = useStyle();
  const [states, handlechange] = useForm({
    provider: "regular",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { submit, loading } = useLogAuth(LOG_IN, states, setErrors);
  return (
    <>
      <Grid item xs={12} sm={6} style={{ margin: "auto" }}>
        <Paper square className={classes.root} variant="outlined" elevation={7}>
          <Title variant="h5" color="primary">
            Log In Page
          </Title>
          <form className={classes.loginFiledsContainer}>
            <label className={classes.textField}>
              <Typography style={{ width: "7rem" }}>email :</Typography>
              <TextField
                variant="outlined"
                fullWidth
                name="email"
                value={states.email}
                onChange={handlechange}
                placeholder="enter your email"
                helperText={
                  <Typography component="span" color="error">
                    {errors?.email?.isEmail && errors?.email?.isEmail}
                    {typeof errors?.email === "string" && errors?.email}
                  </Typography>
                }
                error={errors?.email ? true : false}
              />
            </label>
            <br /> <br />
            <label className={classes.textField}>
              <Typography style={{ width: "7rem" }}>password :</Typography>
              <TextField
                variant="outlined"
                fullWidth
                type="password"
                name="password"
                value={states.password}
                onChange={handlechange}
                placeholder="enter your email"
                helperText={
                  <Typography component="span" color="error">
                    {errors?.password && errors?.password.isLength}
                    {typeof errors?.password === "string" && errors?.password}
                  </Typography>
                }
                error={errors?.password ? true : false}
              />
            </label>
          </form>
          <Button
            variant="outlined"
            color="primary"
            disabled={loading}
            style={{ float: "right" }}
            onClick={submit}
          >
            log in
          </Button>
          <br />
          <br />
          <br />
          <Typography variant="h7" color="textPrimary">
            if you don't have an account,<Link className={classes.Link} to="/regester"> sign up here!! </Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
}

export default Login;
