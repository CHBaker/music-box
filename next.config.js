/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    webpack(config, _) {
        config.devtool = 'eval-source-map'
        return config
    },
}

module.exports = nextConfig
