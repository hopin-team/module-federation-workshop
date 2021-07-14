import { useSharedState } from "nextjs/ReactReactiveMap";

export default function App({ reactiveMap }) {
  const [username, setUsername, shareUsername] = useSharedState("username", {
    reactiveMap,
  });

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
          shareUsername(username);
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
