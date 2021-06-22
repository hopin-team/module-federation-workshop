import { Link } from "react-router-dom";
import { useUsername } from "./App";

export default function Schedule() {
  const username = useUsername();

  return (
    <>
      <h2>Reception, welcome {username}</h2>
      <h3>Schedule</h3>

      <strong>Now! </strong>
      <Link to="/sessions/123">Session 123</Link>
      <hr />
      <Link to="/">Go home</Link>
    </>
  );
}
