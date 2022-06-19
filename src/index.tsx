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

// serviceWorkerRegistration.register();
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
          .then(reg => {
              console.log('Registration succeeded. Scope is ' + reg.scope);
          })
          .catch(registrationError => {
              console.log('SW registration failed: ', registrationError);
          });
  });
}