import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "../cache";

const LogRoute = ({ children, ...rest }) => {
  console.log(children);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isLoggedIn() ? (
          children
        ) : (
          <Redirect to={{ pathname: "/", state: { from: location } }} />
        )
      }
    />
  );
};
export default LogRoute;
