import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import ApolloApp from "./ApolloProvider";
import "./index.css";

render(
  <Router>
    <ApolloApp />
  </Router>,
  document.getElementById("root")
);
