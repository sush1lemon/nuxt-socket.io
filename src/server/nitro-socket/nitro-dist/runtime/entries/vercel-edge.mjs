import "#internal/nitro/virtual/polyfill";
import { requestHasBody, useRequestBody } from "#internal/nitro/utils";
import { nitroApp } from "#internal/nitro/app";
export default async function handleEvent(request, event) {
  const url = new URL(request.url);
  let body;
  if (requestHasBody(request)) {
    body = await useRequestBody(request);
  }
  const r = await nitroApp.localCall({
    event,
    url: url.pathname + url.search,
    host: url.hostname,
    protocol: url.protocol,
    headers: Object.fromEntries(request.headers.entries()),
    method: request.method,
    body
  });
  return new Response(r.body, {
    // @ts-ignore TODO: Should be HeadersInit instead of string[][]
    headers: normalizeOutgoingHeaders(r.headers),
    status: r.status,
    statusText: r.statusText
  });
}
function normalizeOutgoingHeaders(headers) {
  return Object.entries(headers).map(([k, v]) => [
    k,
    Array.isArray(v) ? v.join(",") : v
  ]);
}
