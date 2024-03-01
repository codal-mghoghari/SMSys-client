/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "dummyjson.com/",
                port: '',
                pathname: "/image/*"
            }
        ]
    }
};

export default nextConfig;
