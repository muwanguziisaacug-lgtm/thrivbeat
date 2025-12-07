/** @type {import('next').NextConfig} */
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				port: "9000",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "pub-2c2c4d353e8c4f5a9eece4b696c679fb.r2.dev"
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com"
			}
		],
	},
	webpack: (config, { isServer }) => {
		if (isServer) {
			config.plugins = [...config.plugins, new PrismaPlugin()];
		}
		return config;
	}, // ← comma here
};

export default nextConfig;
