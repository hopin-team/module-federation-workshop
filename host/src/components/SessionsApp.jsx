import { useRef, useEffect } from "react";
import mount from "sessions/App";

export default function SessionsApp() {
  const ref = useRef();

  useEffect(() => {
    mount(ref.current);
  }, [ref.current]);

  return <div ref={ref} />;
}
