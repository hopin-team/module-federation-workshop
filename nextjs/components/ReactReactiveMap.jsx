import { createContext, useContext, useState } from "react";

const ReactiveMapContext = createContext();

export function ReactiveMapProvider({ children, reactiveMap }) {
  return (
    <ReactiveMapContext.Provider value={reactiveMap}>
      {children}
    </ReactiveMapContext.Provider>
  );
}

export function useReactiveMap(keys = []) {
  const reactiveMap = useContext(ReactiveMapContext);
  if (!reactiveMap) {
    throw new Error("ReactiveMapProvider is not an ancestor of this component");
  }

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
