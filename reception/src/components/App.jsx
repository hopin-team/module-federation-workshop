import { Router } from "react-router-dom";
import WIP from "./WIP";

export default function App({ history }) {
  return (
    <Router history={history}>
      <WIP />
    </Router>
  );
}
