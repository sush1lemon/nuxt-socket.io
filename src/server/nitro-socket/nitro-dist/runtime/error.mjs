import { setResponseStatus } from "h3";
import { normalizeError, isJsonRequest } from "./utils.mjs";
const isDev = process.env.NODE_ENV === "development";
export default (function(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const showDetails = isDev && statusCode !== 404;
  const errorObject = {
    url: event.node.req.url || "",
    statusCode,
    statusMessage,
    message,
    stack: showDetails ? stack.map((i) => i.text) : void 0
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nitro]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]"
    ].filter(Boolean).join(" ");
    console.error(
      tags,
      error.message + "\n" + stack.map((l) => "  " + l.text).join("  \n")
    );
  }
  setResponseStatus(event, statusCode, statusMessage);
  if (isJsonRequest(event)) {
    event.node.res.setHeader("Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
  } else {
    event.node.res.setHeader("Content-Type", "text/html");
    event.node.res.end(renderHTMLError(errorObject));
  }
});
function renderHTMLError(error) {
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Request Error";
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${statusCode} ${statusMessage}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico/css/pico.min.css">
  </head>
  <body>
    <main class="container">
      <dialog open>
        <article>
          <header>
            <h2>${statusCode} ${statusMessage}</h2>
          </header>
          <code>
            ${error.message}<br><br>
            ${"\n" + (error.stack || []).map((i) => `&nbsp;&nbsp;${i}`).join("<br>")}
          </code>
          <footer>
            <a href="/" onclick="event.preventDefault();history.back();">Go Back</a>
          </footer>
        </article>
      </dialog>
    </main>
  </body>
</html>
`;
}
