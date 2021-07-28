import Schedule from "receptionSchedule/Index";
import Sponsors from "receptionSponsors/Index";
import { Router } from "react-router-dom";
// 🔥 importing nanos directly is forbidden
//import THIS_SHOULD_ERROR from "../../nanos/schedule/src/index";

export default function App({ history }) {
  return (
    <Router history={history}>
      <Schedule />
      <Sponsors />
    </Router>
  );
}
