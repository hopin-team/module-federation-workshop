import { createContext, useContext, useState, useCallback } from "react";

const ShellValuesContext = createContext();
const ShellShareValueContext = createContext();

export default function MFShellDataLayer({ children }) {
  const [values, setValue] = useState({});
  const shareValue = useCallback(function (key, value) {
    setValue((values) => ({ ...values, [key]: value }));
  }, []);

  return (
    <ShellShareValueContext.Provider value={{ shareValue }}>
      <ShellValuesContext.Provider value={values}>
        {children}
      </ShellValuesContext.Provider>
    </ShellShareValueContext.Provider>
  );
}

export function useShellShare() {
  return validateContext(useContext(ShellShareValueContext));
}

export function useShellValues(keys) {
  if (!keys || !keys.length) {
    return {};
  }

  const values = validateContext(useContext(ShellValuesContext));

  return keys.reduce((acc, key) => {
    acc[key] = values[key];

    return acc;
  }, {});
}

function validateContext(context) {
  if (!context)
    throw new Error("MFDataLayer is not an ancestor of this component");

  return context;
}
