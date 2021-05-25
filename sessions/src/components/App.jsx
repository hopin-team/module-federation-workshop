import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import Session from "./Session";
import SessionList from "./SessionList";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/sessions/:id">
          <Session />
        </Route>
        <Route path="/sessions">
          <SessionList />
        </Route>
        <Route>
          <Redirect to="/sessions" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
