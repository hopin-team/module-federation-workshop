import { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import mount from "reception/App";

export default function ReceptionApp() {
  const ref = useRef();
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      onNavigate: (pathname) => {
        const currentPathname = history.location.pathname;
        if (currentPathname !== pathname) history.push(pathname);
      },
    });
    return history.listen((e) => onParentNavigate(e.pathname));
  }, [ref.current]);

  return <div ref={ref} />;
}
