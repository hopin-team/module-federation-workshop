import { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import mount from "reception/App";

export default function ReceptionApp() {
  const ref = useRef();
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current);
    return history.listen((e) => onParentNavigate(e.pathname));
  }, [ref.current]);

  return <div ref={ref} />;
}
