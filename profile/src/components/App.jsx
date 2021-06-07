import { useState } from "react";

export default function App({
  username: defaultUsername = "",
  dispatchUsername = () => {},
}) {
  const [username, setUsername] = useState(defaultUsername);

  return (
    <form
      style={{ display: "inline" }}
      onSubmit={(e) => {
        e.preventDefault();
        dispatchUsername(username);
      }}
    >
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
}
