import { createContext, useContext } from "react";
import { validateContextProvider } from "./ReactReactiveMap";

const ScopedMapContext = createContext();

export class ScopedMap {
  constructor() {
    this.scopes = {};
  }

  get = (scope) => {
    if (!this.scopes[scope]) {
      this.scopes[scope] = new Map();
    }
    return this.scopes[scope];
  };
}

export function ScopedMapProvider({ children, scopedMap }) {
  return (
    <ScopedMapContext.Provider value={scopedMap}>
      {children}
    </ScopedMapContext.Provider>
  );
}

export function useScopedMap() {
  return validateContextProvider(
    useContext(ScopedMapContext),
    "ScopedMapContext"
  );
}
