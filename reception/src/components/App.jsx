import { createContext, useState, useEffect } from "react";
import { Router } from "react-router-dom";
import Schedule from "./Schedule";

export function useReactiveValue(reactiveValue) {
  const [value, setValue] = useState(reactiveValue?.());

  useEffect(() => {
    reactiveValue?.listen((newValue) => {
      setValue(newValue);
    });
  }, [reactiveValue]);

  return value;
}

const UsernameContext = createContext();

const UsernameProvider = ({ reactiveUsername, children }) => {
  const username = useReactiveValue(reactiveUsername);

  return (
    <UsernameContext.Provider value={username}>
      {children}
    </UsernameContext.Provider>
  );
};

export default function App({ history, reactiveValues }) {
  const username = useReactiveValue(reactiveValues?.username);

  return (
    // <UsernameProvider reactiveUsername={reactiveValues.username}>
    <Router history={history}>
      <Schedule username={username} />
    </Router>
    // </UsernameProvider>
  );
}
