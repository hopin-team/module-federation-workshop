import { createContext, useContext } from "react";
import { Router } from "react-router-dom";
import { useReactiveValue } from "nextjs/ReactReactiveMap";
import Schedule from "./Schedule";

const UsernameContext = createContext();

async function fetchInitialValue() {
  const response = await fetch(`http://localhost:8889/api/viewer`);
  const json = await response.json();
  return json.username;
}

const UsernameProvider = ({ reactiveUsername, children }) => {
  const [username] = useReactiveValue(reactiveUsername, { fetchInitialValue });

  return (
    <UsernameContext.Provider value={username}>
      {children}
    </UsernameContext.Provider>
  );
};

export const useUsername = () => {
  return useContext(UsernameContext);
};

export default function App({ history, reactiveMapGet }) {
  return (
    <UsernameProvider reactiveUsername={reactiveMapGet("username")}>
      <Router history={history}>
        <Schedule />
      </Router>
    </UsernameProvider>
  );
}
