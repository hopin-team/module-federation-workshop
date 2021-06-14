import { Link } from "react-router-dom";
import ChatApp from "./ChatApp";

export default function Session() {
  return (
    <>
      <h1>Session 123</h1>
      <p>
        <Link to="/sessions">Session list</Link> / Session 123
      </p>
      <ChatApp />
      <video
        loop
        controls
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}
