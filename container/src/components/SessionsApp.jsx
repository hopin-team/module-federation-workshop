import { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import mount from "sessions/App";

export default function SessionsApp() {
  const ref = useRef();
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate, umount } = mount(ref.current, {
      onNavigate: (pathname) => {
        const currentPathname = history.location.pathname;
        if (currentPathname !== pathname) history.push(pathname);
      },
    });

    const unlisten = history.listen((e) => onParentNavigate(e.pathname));

    return () => {
      unlisten();
      umount();
    };
  }, [ref.current]);

  return <div ref={ref} />;
}
