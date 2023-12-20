import type { NextRequest } from 'next/server'

export const config = {
  runtime: "edge", // this is a pre-requisite
  // https://vercel.com/docs/concepts/edge-network/regions
  // Only US regions supported by Google PaLM API
  regions: [
    "cle1",
    "iad1",
    "pdx1",
    "sfo1",
    "sin1",
  ],
};

const PROXY_HOST = "generativelanguage.googleapis.com";


export default async function handler(req: NextRequest) {
  const url = new URL(req.url)
  url.host = PROXY_HOST
  url.pathname = url.pathname.replace(/^\/api/, '')
  return fetch(
    url.toString(),
    {
      method: req.method,
      headers: req.headers,
      body: req.body,
      signal: req.signal,
    }
  )
}