import { createRoot } from "react-dom/client";
import App from "./App";
import { RoutesProvider } from "./Context/RoutesContext";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <RoutesProvider>
    <App />
  </RoutesProvider>
);

serviceWorkerRegistration.register();
