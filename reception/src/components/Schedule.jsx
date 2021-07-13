import { useSharedState } from "nextjs/ReactReactiveMap";
import { Link } from "react-router-dom";

async function fetchInitialValue() {
  const response = await fetch(`http://localhost:8889/api/viewer`);
  const json = await response.json();
  return json.username;
}

export default function Schedule() {
  const [username] = useSharedState("username", { fetchInitialValue });

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
