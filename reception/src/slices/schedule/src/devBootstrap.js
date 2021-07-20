import ReactDOM from "react-dom";
import Slice from "./components";
import { Root } from "../../../root";

// TODO devBootstrap and index.js should not be here but inside webpack.slice.ts

ReactDOM.render(
  <Root>
    <Slice />
  </Root>,
  document.getElementById("root-profile-schedule-dev")
);
