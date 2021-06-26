import { createContext, useContext, useState, useEffect } from "react";

const ReactiveMapContext = createContext();

export function ReactiveMapProvider({ children, reactiveMap }) {
  return (
    <ReactiveMapContext.Provider value={reactiveMap}>
      {children}
    </ReactiveMapContext.Provider>
  );
}

export function useReactiveKeys(keys = []) {
  const reactiveMap = useContext(ReactiveMapContext);
  if (!reactiveMap) {
    throw new Error("ReactiveMapProvider is not an ancestor of this component");
  }

  let reactiveValues = keys.reduce((acc, key) => {
    acc[key] = reactiveMap.get(key);

    return acc;
  }, {});

  return reactiveValues;
}

export function useReactiveValue(reactiveValue, resolver) {
  const [value, setValue] = useState();

  useEffect(() => {
    reactiveValue?.(resolver).then(setValue);

    return reactiveValue.listen(async (newValue) => {
      setValue(await newValue);
    });
  }, [reactiveValue]);

  return [value, setValue];
}
