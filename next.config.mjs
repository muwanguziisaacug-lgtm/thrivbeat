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
				hostname: "pub-786fcb02063e4bf1b8047fabfdf13b0a.r2.dev"
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
