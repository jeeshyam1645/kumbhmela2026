import { renderToString } from "react-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { Router } from "wouter";
import App from "./App";

export function render(url: string) {
  const helmetContext: { helmet?: HelmetServerState | null } = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <Router ssrPath={url}>
        <App />
      </Router>
    </HelmetProvider>,
  );
  const helmet = helmetContext.helmet;
  const head = [
    helmet?.title.toString() ?? "",
    helmet?.meta.toString() ?? "",
    helmet?.link.toString() ?? "",
    helmet?.script.toString() ?? "",
  ].join("\n");
  return { html, head };
}
