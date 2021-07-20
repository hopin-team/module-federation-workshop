//import { useSharedState } from "nextjs2/ReactReactiveMap";
import { useSharedState } from "../../../components/CopyOfReactReactiveMap";
import { Link } from "react-router-dom";

export default function FeaturedSchedule() {
  // const [username] = useSharedState("username");
  const username = "@you";

  return (
    <>
      <h2>Reception, welcome {username}</h2>
      <h3>Schedule</h3>
      <p>
        <strong>Now! </strong>
        <Link to="/sessions/123">Session 123</Link>
      </p>
      <Link to="/">Go home</Link>
    </>
  );
}
