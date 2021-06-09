import { Link } from "react-router-dom";

export default function ExpoList() {
  return (
    <>
      <h1>Expo List</h1>
      <ul>
        <li>
          <Link to="/expo/1">Expo 1</Link>
        </li>
      </ul>
      <hr />
      <Link to="/reception">Reception</Link>
    </>
  );
}
