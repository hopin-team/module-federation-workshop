import { Switch, Route, Router, useRouteMatch } from "react-router-dom";
import Expo from "./Expo";
import ExpoList from "./ExpoList";

export default function App({ history, basename }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path={`${basename}/:id`}>
          <Expo />
        </Route>
        <Route path={`${basename}/`}>
          <ExpoList />
        </Route>
      </Switch>
    </Router>
  );
}
