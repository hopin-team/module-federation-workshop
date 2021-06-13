import { Link } from "react-router-dom";

export default function SessionList() {
  return (
    <>
      <h1>Session List </h1>
      <ul>
        <li>
          <Link to={`/sessions/1`}>Session 1</Link>
        </li>
      </ul>

      <Link to="/sessions">All sessions</Link>
    </>
  );
}
