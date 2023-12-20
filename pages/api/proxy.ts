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

const PROXY_HOST = "https://generativelanguage.googleapis.com";


export default async function handleRequest(req: Request & { nextUrl?: URL }) {

  const url = req.nextUrl || new URL(req.url);

  url.host = PROXY_HOST;
  return await fetch(url, request)

}