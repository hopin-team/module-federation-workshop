import { createContext, useState, useEffect, useContext } from "react";
import { Router } from "react-router-dom";
import Schedule from "./Schedule";

export function useReactiveValue(reactiveValue) {
  const [value, setValue] = useState(reactiveValue?.());

  useEffect(() => {
    return reactiveValue?.listen((newValue) => {
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

export const useUsername = () => {
  return useContext(UsernameContext);
};

export default function App({ history, reactiveValues }) {
  //const username = useReactiveValue(reactiveValues?.username);

  return (
    <UsernameProvider reactiveUsername={reactiveValues.username}>
      <Router history={history}>
        {/* <Schedule username={username} /> */}
        <Schedule />
      </Router>
    </UsernameProvider>
  );
}
