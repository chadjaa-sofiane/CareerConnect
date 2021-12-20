import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "../cache";

function AuthRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isLoggedIn() ? (
          <Redirect to={{ pathname: "/", state: { from: location } }} />
        ) : (
          children
        )
      }
    />
  );
}

export default AuthRoute;
