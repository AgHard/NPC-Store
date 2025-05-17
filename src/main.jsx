// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import { AuthProvider } from "./context/AuthContext";
// //...
// import * as Sentry from "@sentry/react";
// import { BrowserRouter } from "react-router-dom";
// import { CartProvider } from "./context/CartContext.jsx";
// import { WishlistProvider } from "./context/WishlistContext.jsx";
// Sentry.init({
//   dsn: "https://d674932a77e6d9b9ced1190d70fd4691@o4506876178464768.ingest.us.sentry.io/4506876181151744",
//   integrations: [
//     Sentry.browserTracingIntegration(),
//     Sentry.metrics.metricsAggregatorIntegration(),
//     Sentry.reactRouterV6BrowserTracingIntegration({
//       useEffect: React.useEffect,
//     }),
//     Sentry.replayIntegration({
//       maskAllText: false,
//       blockAllMedia: false,
//     }),
//   ],
//   tracesSampleRate: 1.0,
//   tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
//   replaysSessionSampleRate: 0.1,
//   replaysOnErrorSampleRate: 1.0,
// });

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AuthProvider>
//         <CartProvider>
//           <WishlistProvider>
//             <App />
//           </WishlistProvider>
//         </CartProvider>
//       </AuthProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { CollectionProvider } from "./context/CollectionContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Default app tree
const AppTree = (
  <React.StrictMode>
    <BrowserRouter>
      <CollectionProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <App />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </CollectionProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Only enable Sentry in production
if (import.meta.env.MODE === "production") {
  window.addEventListener("load", () => {
    import("@sentry/react").then((Sentry) => {
      Sentry.init({
        dsn: "https://d674932a77e6d9b9ced1190d70fd4691@o4506876178464768.ingest.us.sentry.io/4506876181151744",
        integrations: [
          Sentry.browserTracingIntegration(),
          Sentry.metrics.metricsAggregatorIntegration(),
          Sentry.reactRouterV6BrowserTracingIntegration({
            useEffect: React.useEffect,
          }),
          Sentry.replayIntegration({
            maskAllText: false,
            blockAllMedia: false,
          }),
        ],
        tracesSampleRate: 1.0,
        tracePropagationTargets: [
          "localhost",
          /^https:\/\/yourserver\.io\/api/,
        ],
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
      });

      root.render(
        <Sentry.ErrorBoundary fallback={<p>حدث خطأ في التطبيق.</p>}>
          {AppTree}
        </Sentry.ErrorBoundary>
      );
    });
  });
} else {
  // Development mode (no Sentry)
  root.render(AppTree);
}
