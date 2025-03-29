module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['openweathermap.org'],
  },
  experimental: {
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } }
    ]
  }
}
