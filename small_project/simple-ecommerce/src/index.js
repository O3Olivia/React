import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { LogContextProvider } from "./store/log-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LogContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </LogContextProvider>
);
