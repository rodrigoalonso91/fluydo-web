import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: '31.97.91.146',
				port: '8056',
				pathname: '/assets/**'
			}
		]
	}
};

export default nextConfig;
