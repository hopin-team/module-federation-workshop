import "regenerator-runtime";
import { useState, useEffect } from "react";
import { ReactiveMap } from "./ReactiveMap";
import RemoteApp from "./RemoteApp";
import { useReactiveValue } from "./ReactReactiveMap";

const reactiveMap = new ReactiveMap();

function formatMemory(bytes) {
  if (!bytes) return "";
  const MB = 1048576;
  return `${Math.round(((bytes / MB) * 100) / 100)} MB`;
}

function formatTime(number) {
  return `0${number}`.slice(-2);
}

const styles = {
  header: {
    column: { display: "flex", flexDirection: "column", paddingRight: "20px" },
  },
};

function random(min, max) {
  // This random function includes the lower bound, but excludes the upper bound.
  return Math.floor(Math.random() * (max - min)) + min;
}

export default function App() {
  const [memory, setMemory] = useState({});
  const [appCount, setAppCount] = useState(1);
  const [showApps, setShowApps] = useState(true);
  const [rerenderPercentage, setRerenderPercentage] = useState(0);
  const [compCount, setCompCount, reactiveCompCount] = useReactiveValue(
    reactiveMap.get("compCount"),
    { initialValue: 1 }
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (window.performance?.memory) {
        setMemory(window.performance.memory);
      }
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (!showApps) {
      setShowApps(true);
    }
  }, [showApps]);

  async function rerenderComponents() {
    if (rerenderPercentage === 0) {
      return;
    }

    const max = 100;
    const percentage = Array(max)
      .fill(0)
      .map((_, i) => (i < rerenderPercentage ? 1 : 0));
    for (let i = 0; i < appCount; i++) {
      for (let j = 0; j < compCount; j++) {
        const randomValue = random(0, max);
        const perValue = percentage[randomValue];

        if (perValue === 1) {
          const key = `${i}:${j}`;
          const reactiveValue = reactiveMap.get(key);
          const value = await reactiveValue();
          const newValue = (value || 0) + 1;
          reactiveValue(newValue);
        }
      }
    }
  }

  const children = [];
  for (let i = 0; i < appCount; i++) {
    children.push(
      <RemoteApp key={i} reactiveMapGet={reactiveMap.get} appIndex={i} />
    );
  }

  const now = new Date();

  return (
    <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
      <div
        style={{
          backgroundColor: "white",
        }}
      >
        <div style={{ display: "flex", padding: "20px" }}>
          <div>
            <div style={{ display: "flex" }}>
              <span style={styles.header.column}>
                Memory (JS Heap Size):
                <strong>{formatMemory(memory.usedJSHeapSize)}</strong>
              </span>
              <span style={styles.header.column}>
                Number of apps{" "}
                <input
                  onChange={(e) => setAppCount(e.target.value)}
                  value={appCount}
                />
              </span>
              <span style={styles.header.column}>
                Number of components{" "}
                <input
                  onChange={({ target: { value } }) => {
                    setCompCount(value);
                    reactiveCompCount(value);
                  }}
                  value={compCount}
                />
              </span>

              <div style={styles.header.column}>
                % of components to render{" "}
                <div>
                  <select
                    onChange={(e) => {
                      setRerenderPercentage(e.target.value);
                    }}
                    value={rerenderPercentage}
                  >
                    {Array(101)
                      .fill()
                      .map((num, i) => (
                        <option value={i} key={i}>
                          {i} %
                        </option>
                      ))}
                  </select>
                  <button onClick={rerenderComponents}>Rerender</button>
                </div>
              </div>
              <span style={styles.header.column}>
                Unmount and mount again
                <button
                  disable={(!showApps).toString()}
                  onClick={() => setShowApps(false)}
                >
                  Remount
                </button>
              </span>
            </div>
          </div>
          <h1 style={{ margin: "0 0 0 auto" }}>
            {formatTime(now.getHours())}:{formatTime(now.getMinutes())}:
            {formatTime(now.getSeconds())}
          </h1>
        </div>
      </div>
      {showApps ? children : "..."}
    </div>
  );
}
