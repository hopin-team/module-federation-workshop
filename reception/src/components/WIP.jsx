import { Link, Switch, Route } from "react-router-dom";

export default function Schedule() {
  return (
    <Switch>
      <Route path="/reception">
        <h2>Reception</h2>
        <p>We'll publish the schedule of this event shortly.</p>
        <p>
          Meanwhile you can visit the <Link to="/">home page</Link>.
        </p>
      </Route>
    </Switch>
  );
}
