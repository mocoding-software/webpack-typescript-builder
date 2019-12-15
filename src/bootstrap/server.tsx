import * as React from "react";
import { renderToString } from "react-dom/server";

// @ts-ignore
import App from "injected-app-module";

function serverRenderer() {
  return (req: any, res: any, next: any) => {
    res.status(200).send(
      `<!doctype html>
  <html>
  <head>
      <title>Test</title>
  </head>
  <body>
      <div id="app">${renderToString(React.createElement(App))}</div>
      <script src="/vendors.js"></script>
      <script src="/index.js"></script>
  </body>
  </html>
`
    );
  };
}

export default serverRenderer; 
