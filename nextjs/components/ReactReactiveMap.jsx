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

export function useReactiveKey(key) {
  return useReactiveMap().get(key);
}

// export function useReactiveMapGet() {
//   return useContext(ReactiveMapContext)?.get;
// }

export function useReactiveMap() {
  return validateContextProvider(
    useContext(ReactiveMapContext),
    "ReactiveMapContext"
  );
}

export function ReactiveMapGetProvider({ children, reactiveMapGet }) {
  return (
    <ReactiveMapGetContext.Provider value={reactiveMapGet}>
      {children}
    </ReactiveMapGetContext.Provider>
  );
}

export function useReadSharedState(key) {
  // TODO
}

export function useSharedState(key, { fetchInitialValue, ...restOptions }) {
  const reactiveMapGet =
    useContext(ReactiveMapGetContext) || restOptions.reactiveMapGet;
  const [value, setValue] = useState();
  const refCleanup = useRef();
  const refReactiveValue = useRef();

  const shareState = useCallback(() => {
    refReactiveValue.current?.();
  }, [refReactiveValue.current]);

  useEffect(() => {
    reactiveMapGet(key, { fetchInitialValue }).then((reactiveValue) => {
      setValue(reactiveValue());
      refReactiveValue.current = reactiveValue;
      refCleanup.current = reactiveValue.listen(setValue);
    });

    return () => {
      refCleanup.current?.();
    };
  }, [refCleanup.current, refReactiveValue.current, reactiveMapGet]);

  return [value, setValue, shareState];
}

export function useReactiveValue(reactiveValue, { fetchInitialValue } = {}) {
  const [value, setValue] = useState();

  useEffect(() => {
    reactiveValue?.(fetchInitialValue).then(setValue);

    return reactiveValue.listen(async (newValue) => setValue(await newValue));
  }, [reactiveValue]);

  return [value, setValue];
}
