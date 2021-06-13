import { Switch, Route, Router } from "react-router-dom";
import Session from "./Session";
import SessionList from "./SessionList";

export default function App({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/sessions/:id">
          <Session />
        </Route>
        <Route path="/sessions">
          <SessionList />
        </Route>
      </Switch>
    </Router>
  );
}
