import { createContext, useContext, useState, useCallback } from "react";

const MFStateContext = createContext();
const MFShareStateContext = createContext();

export default function MFProvider({ children }) {
  const [state, setState] = useState({});
  const shareState = useCallback(function (data) {
    setState((state) => ({ ...state, ...data }));
  }, []);

  return (
    <MFShareStateContext.Provider value={{ shareState }}>
      <MFStateContext.Provider value={{ state }}>
        {children}
      </MFStateContext.Provider>
    </MFShareStateContext.Provider>
  );
}

export function useMFShareState() {
  return validateContext(useContext(MFShareStateContext));
}

export function useMFState() {
  return validateContext(useContext(MFStateContext));
}

function validateContext(context) {
  if (!context)
    throw new Error("MFProvider is not an ancestor of this component");

  return context;
}
