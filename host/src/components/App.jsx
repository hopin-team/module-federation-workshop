import { Route, BrowserRouter, Link } from "react-router-dom";
import mountReception from "reception/App";
import MountApp from "./MountApp";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/reception">Reception</Link>
      </nav>
      <Route path="/">
        <h1>Welcome to Hopin home page</h1>
      </Route>
      <MountApp mount={mountReception} />
    </BrowserRouter>
  );
}
