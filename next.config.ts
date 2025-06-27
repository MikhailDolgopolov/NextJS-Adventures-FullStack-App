import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    // Prevent Webpack from trying to bundle optional TypeORM drivers
    config.externals = config.externals || [];

    config.externals.push({
      'react-native-sqlite-storage': 'commonjs react-native-sqlite-storage',
      '@sap/hana-client': 'commonjs @sap/hana-client',
      'mysql': 'commonjs mysql',
    });

    return config;
  },
};

export default nextConfig;

