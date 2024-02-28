import type { NextRequest } from 'next/server'
import qs from 'qs'

export const config = {
  runtime: "edge", // this is a pre-requisite
  // https://vercel.com/docs/concepts/edge-network/regions
  // regions supported by Google PaLM API
  // regions: [
  //   "cle1",
  //   "iad1",
  //   "pdx1",
  //   "sfo1",
  //   "sin1",
  //   'hnd1',
  //   'icn1',
  //   'kix1',
  //   'syd1',
  //   'bom1',
  // ],
};

const PROXY_HOST = "generativelanguage.googleapis.com";


export default async function handler(req: NextRequest) {
  const url = new URL(req.url)
  url.host = PROXY_HOST
  const query = qs.parse(url.search.replace('?', ''))
  delete query.path
  if (url.port !== "443") {
    url.protocol = "https:"
    url.port = "443"
  }
  url.search = '?' + qs.stringify(query)

  const headers = new Headers(req.headers);
  headers.set('host', url.host);

  const keysToDelete: string[] = [];
  headers.forEach((_, key: string) => {
    // console.log("key", key);
    if (key.toLowerCase().startsWith('x-')) {
      keysToDelete.push(key);
    }
  });

  keysToDelete.forEach((key: string) => {
    headers.delete(key);
  });
  // console.log(url.toString())
  return fetch(
    url,
    {
      method: req.method,
      headers: headers,
      body: req.body,
      signal: req.signal,
    }
  )
}