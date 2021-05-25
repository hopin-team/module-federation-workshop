import { Router } from "react-router-dom";
import Schedule from "./Schedule";

export default function App({ history }) {
  return (
    <Router history={history}>
      <Schedule />
    </Router>
  );
}
