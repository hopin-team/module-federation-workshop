import { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import mount from "chat/App";

export default function ChatApp() {
  const ref = useRef();
  const history = useHistory();

  useEffect(() => {
    const { unmount } = mount(ref.current);

    return () => {
      unmount();
    };
  }, [ref.current]);

  return <div ref={ref} />;
}
