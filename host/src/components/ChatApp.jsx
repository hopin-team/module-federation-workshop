import { useRef, useEffect } from "react";
import mount from "chat/App";

export default function ChatApp() {
  const ref = useRef();

  useEffect(() => {
    mount(ref.current);
  }, [ref.current]);

  return <div ref={ref} />;
}
