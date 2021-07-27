import { Link } from "react-router-dom";

// 🔥 TODO enable ModuleScopePlugin in src/nanos/schedule (basically in each nano)
// import THIS_SHOULD_ERROR from "../sponsors/src/index";
// import THIS_SHOULD_ERROR from "../../micro/App";

export default function FeaturedSchedule() {
  return (
    <>
      <h2>Reception, welcome!</h2>
      <h3>Schedule</h3>
      <p>
        <strong>Now! </strong>
        <Link to="/sessions/123">Session 123</Link>
      </p>
      <Link to="/">Go home</Link>
    </>
  );
}
