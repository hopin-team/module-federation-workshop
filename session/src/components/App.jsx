import { Switch, Route, Router, Redirect } from "react-router-dom";
import Session from "./Session";

export default function App({ history }) {
  return (
    <Router history={history}>
      <Session />
    </Router>
  );
}
