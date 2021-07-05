import { createContext, useContext, useState, useEffect } from "react";

const ReactiveMapContext = createContext();

export const validateContextProvider = (context, provider) => {
  if (!context) {
    throw new Error(`${provider} is not an ancestor of this component`);
  }
  return context;
};

export function ReactiveMapProvider({ children, reactiveMap }) {
  return (
    <ReactiveMapContext.Provider value={reactiveMap}>
      {children}
    </ReactiveMapContext.Provider>
  );
}

export function useReactiveKey(key) {
  return useReactiveMap().get(key);
}

export function useReactiveMap() {
  return validateContextProvider(
    useContext(ReactiveMapContext),
    "ReactiveMapContext"
  );
}

export function useReactiveValue(reactiveValue, { initialValue } = {}) {
  const [value, setValue] = useState(
    typeof initialValue !== "function" ? initialValue : undefined
  );

  useEffect(() => {
    reactiveValue?.(initialValue).then(setValue);

    return reactiveValue.listen(async (newValue) => setValue(await newValue));
  }, [reactiveValue]);

  return [value, setValue, reactiveValue];
}
