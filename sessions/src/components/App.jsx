import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Session from "./Session";
import SessionList from "./SessionList";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:id">
          <Session />
        </Route>
        <Route path="/">
          <SessionList />
        </Route>
        <Route path="*">
          <h1>Not found</h1>
        </Route>
      </Switch>
    </Router>
  );
}
