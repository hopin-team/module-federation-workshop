import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

const ReactiveMapContext = createContext();
const ReactiveMapGetContext = createContext();

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

export function useReactiveMap() {
  return validateContextProvider(
    useContext(ReactiveMapContext),
    "ReactiveMapContext"
  );
}

export function useReadSharedState(key) {
  // TODO
}

export function useSharedState(key, { fetchInitialValue, ...restOptions }) {
  const reactiveMap = useContext(ReactiveMapContext) || restOptions.reactiveMap;
  if (!reactiveMap) {
    throw new Error(
      "No ReactiveMap found in the context nor it was passed as an argument"
    );
  }
  const [value, setValue] = useState();
  const item = reactiveMap.item(key, { fetchInitialValue });

  useEffect(() => {
    setValue(item.get());

    return item.listen(setValue);
  }, [item]);

  return [value, setValue, item.set];
}

// export function useReactiveValue(reactiveValue, { fetchInitialValue } = {}) {
//   const [value, setValue] = useState();

//   useEffect(() => {
//     reactiveValue?.(fetchInitialValue).then(setValue);

//     return reactiveValue.listen(async (newValue) => setValue(await newValue));
//   }, [reactiveValue]);

//   return [value, setValue];
// }
