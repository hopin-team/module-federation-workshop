import { createContext, useContext, useState } from "react";

const ReactiveMapContext = createContext();

export default function ReactiveMapProvider({ children, reactiveMap }) {
  return (
    <ReactiveMapContext.Provider value={reactiveMap}>
      {children}
    </ReactiveMapContext.Provider>
  );
}

export function useReactiveMap(keys = []) {
  const reactiveMap = validateContext(useContext(ReactiveMapContext));

  let reactiveValues = keys.reduce((acc, key) => {
    acc[key] = reactiveMap.get(key);

    return acc;
  }, {});

  return { reactiveValues, reactiveSet: reactiveMap.set };
}

export function useReactiveValue(reactiveValue) {
  const [value, setValue] = useState(reactiveValue());

  useEffect(() => {
    return reactiveValue.listen((newValue) => {
      setValue(newValue);
    });
  }, [reactiveValue]);

  return value;
}

function validateContext(context) {
  if (!context)
    throw new Error("ReactiveMapProvider is not an ancestor of this component");

  return context;
}
