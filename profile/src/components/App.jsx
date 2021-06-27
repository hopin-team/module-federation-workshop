import { useReactiveValue } from "nextjs/ReactReactiveMap";

async function fetchInitialValue() {
  const response = await fetch(`http://localhost:8889/api/viewer`);
  const json = await response.json();
  return json.username;
}

export default function App({ reactiveMapGet }) {
  const [username, setUsername] = useReactiveValue(reactiveMapGet("username"), {
    fetchInitialValue,
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
          reactiveMapGet("username")(username);
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
