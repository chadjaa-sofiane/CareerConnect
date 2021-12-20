import "@fontsource/roboto";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Regester from "./pages/Regester";
import Container from "@material-ui/core/Container";
import DashboardRouter from "./pages/dashboard/Router";
import HomeRouter from "./pages/home/Router";
import AuthRoute from "./lib/AuthRoute";
import LogRoute from "./lib/LogRoute";
import Theme from "./lib/Theme";

function App() {
  return (
    <Theme>
      <Container maxWidth="xl">
        <Switch>
          <LogRoute path="/login">
            <Login />
          </LogRoute>
          <LogRoute path="/regester">
            <Regester />
          </LogRoute>
          <AuthRoute path="/dashboard">
            <DashboardRouter />
          </AuthRoute>
          <Route path="/" exact>
            <HomeRouter />
          </Route>
        </Switch>
      </Container>
    </Theme>
  );
}

export default App;
