import { useState, useEffect } from "react";

export default function App({ shareValue, username: initialStateUsername }) {
  const [username, setUsername] = useState(initialStateUsername);

  useEffect(() => {
    if (username === undefined) {
      fetch(`http://localhost:8889/api/viewer`)
        .then((response) => response.json())
        .then((data) => setUsername(data.username));
    }
  }, [username]);

  return (
    <form
      style={{ display: "inline" }}
      onSubmit={(e) => {
        e.preventDefault();
        fetch(`http://localhost:8889/api/viewer`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        }).then(() => {
          // ❌ make sure you don't share a state change unless it has changed.
          // E.g. it now submits the form even the username is the same. It rerenders the MF that use username on the first rerender
          shareValue("username", username);
        });
      }}
    >
      <input
        type="text"
        name="username"
        value={username || ""}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
}
