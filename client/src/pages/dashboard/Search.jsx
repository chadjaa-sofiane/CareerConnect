import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import Posts from "../../components/postComponent/postsField";
import Employers from "../../components/employers";
import JobSekeers from "../../components/jobSekeer";
import SearchBar from "../../components/searchBar";

function Search() {
  const { path } = useRouteMatch();
  return (
    <>
      <Redirect from={`${path}`} exact to={`${path}/Posts`} />
      <Switch>
        <Route path={`${path}`}>
          <SearchBar />
          <Switch>
            <Route path={`${path}/Posts`} exact>
              <Posts />
            </Route>
            <Route path={`${path}/Employers`}>
              <Employers />
            </Route>
            <Route path={`${path}/JobSekeers`}>
              <JobSekeers />
            </Route>
          </Switch>
        </Route>
      </Switch>
    </>
  );
}

export default Search;
