import { Link } from "react-router-dom";

export default function SessionList() {
  return (
    <>
      <h1>Session List</h1>
      <ul>
        <li>
          <Link to="/sessions/123">Session 123</Link>
        </li>
      </ul>
    </>
  );
}
