import { Router } from "react-router-dom";
import SessionList from "./SessionList";

export default function App({ history }) {
  return (
    <Router history={history}>
      <SessionList />
    </Router>
  );
}
