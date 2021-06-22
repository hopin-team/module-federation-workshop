import { useState, useEffect } from "react";

export default function App() {
  const [username, setUsername] = useState("");

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
