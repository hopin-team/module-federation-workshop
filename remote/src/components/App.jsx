import { useState, useEffect, memo } from "react";

export function useReactiveValue(reactiveValue, { initialValue } = {}) {
  const [value, setValue] = useState(
    typeof initialValue !== "function" && initialValue !== undefined
      ? initialValue
      : undefined
  );

  useEffect(() => {
    reactiveValue?.(initialValue).then(setValue);

    return reactiveValue?.listen(async (newValue) => setValue(await newValue));
  }, [reactiveValue]);

  return [value, setValue, reactiveValue];
}

const Component = ({ reactiveMapGet, appIndex, index }) => {
  const key = `${appIndex}:${index}`;
  const reactiveAppCompCount = reactiveMapGet?.(key);
  useReactiveValue(reactiveAppCompCount);
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  console.log(`🎯 app ${appIndex} component ${index} has been rendered`);

  return <div style={{ backgroundColor: `#${randomColor}`, flex: 1 }} />;
};

export default function App({ reactiveMapGet, appIndex }) {
  const reactiveCompCount = reactiveMapGet?.("compCount");
  const [compCount] = useReactiveValue(reactiveCompCount, {
    initialValue: () => 1,
  });

  const children = [];
  for (let i = 0; i < compCount; i++) {
    children.push(
      <Component
        index={i}
        key={i}
        reactiveMapGet={reactiveMapGet}
        appIndex={appIndex}
      />
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
      {children}
    </div>
  );
}
