import { BrowserRouter as Router } from "react-router-dom";
import Schedule from "./Schedule";

export default function App() {
  return (
    <>
      <Router>
        <h1>The Coolest Event Ever 🎊</h1>
        <Schedule />
      </Router>
    </>
  );
}
