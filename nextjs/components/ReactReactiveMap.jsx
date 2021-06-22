import { createContext, useContext, useState } from "react";
import { ReactiveMap } from "./ReactiveMap";

const ReactiveMapContext = createContext();

export default function ReactiveMapProvider({
  children,
  reactiveMap = new ReactiveMap(),
}) {
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
    reactiveValue.listen((newValue) => {
      setValue(newValue);
    });
  }, [reactiveValue]);

  return value;
}

function validateContext(context) {
  if (!context)
    throw new Error("ReactiveMapContext is not an ancestor of this component");

  return context;
}

// const ShellValuesContext = createContext();
// const ShellShareValueContext = createContext();

// export default function MFShellDataLayer({ children }) {
//   const [values, setValue] = useState({});
//   const shareValue = useCallback(function (key, value) {
//     setValue((values) => ({ ...values, [key]: value }));
//   }, []);

//   return (
//     <ShellShareValueContext.Provider value={{ shareValue }}>
//       <ShellValuesContext.Provider value={values}>
//         {children}
//       </ShellValuesContext.Provider>
//     </ShellShareValueContext.Provider>
//   );
// }

// export function useShellShare() {
//   return validateContext(useContext(ShellShareValueContext));
// }

// export function useShellValues(keys) {
//   if (!keys || !keys.length) {
//     return {};
//   }

//   const values = validateContext(useContext(ShellValuesContext));

//   return keys.reduce((acc, key) => {
//     acc[key] = values[key];

//     return acc;
//   }, {});
// }

// function validateContext(context) {
//   if (!context)
//     throw new Error("MFDataLayer is not an ancestor of this component");

//   return context;
// }
