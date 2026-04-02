import { createRequestHandler, writeReadableStreamToWritable } from "@remix-run/node";
import * as build from "../build/server/index.js";

const handler = createRequestHandler(build);

export default async function (req, res) {
  const host = req.headers["x-forwarded-host"] || req.headers["host"] || "localhost";
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const url = new URL(`${protocol}://${host}${req.url}`);

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) {
      for (const v of value) headers.append(key, v);
    } else if (value != null) {
      headers.set(key, value);
    }
  }

  const init = { method: req.method, headers };
  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = req;
    init.duplex = "half";
  }

  const request = new Request(url.href, init);
  const response = await handler(request);

  res.statusCode = response.status;
  res.statusMessage = response.statusText;
  for (const [key, value] of response.headers) {
    res.appendHeader(key, value);
  }

  if (response.body) {
    await writeReadableStreamToWritable(response.body, res);
  } else {
    res.end();
  }
}
