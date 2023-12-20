const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        "has": [
          {
            "type": "query",
            "key": "key",
          }
        ],
        destination: '/api'
      }
    ]
  }
}

module.exports = nextConfig