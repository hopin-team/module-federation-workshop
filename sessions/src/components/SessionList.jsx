import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function SessionList() {
  const sessions = useSelector((state) => state.sessions);
  const username = useSelector((state) => state.viewer?.username);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!sessions.length) {
      fetch(`http://localhost:8889/api/sessions`)
        .then((response) => response.json())
        .then((payload) => dispatch({ type: "RECEIVE_SESSIONS", payload }));
    }
  }, [dispatch, sessions]);

  // useEffect(() => {
  //   if (!username) {
  //     fetch(`http://localhost:8889/api/viewer`)
  //       .then((response) => response.json())
  //       .then((payload) => dispatch({ type: "RECEIVE_VIEWER", payload }));
  //   }
  // }, [dispatch, username]);

  return (
    <>
      <h1>Session List for {username}</h1>
      <ul>
        {sessions.map((session) => (
          <li key={session.id}>
            <Link to={`/sessions/${session.id}`}>{session.name}</Link>
          </li>
        ))}
      </ul>

      <Link to="/sessions">All sessions</Link>
    </>
  );
}
