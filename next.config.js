/** @type {import('next').NextConfig} */
let path = require("path")
const nextConfig = {
  reactStrictMode: true,
  sassOptions:path.join(__dirname,"styles")
}

module.exports = nextConfig
