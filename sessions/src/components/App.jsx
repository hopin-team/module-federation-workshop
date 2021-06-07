import { Router } from "react-router-dom";
import SessionList from "./SessionList";
import { Provider } from "react-redux";

export default function App({ history, store }) {
  return (
    <Provider store={store}>
      <Router history={history}>
        <SessionList />
      </Router>
    </Provider>
  );
}
