import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.externals = [
      // keep any existing externals
      ...(config.externals || []),
      // skip bundling all of typeorm
      { typeorm: "commonjs typeorm" },
      // skip its optional drivers
      { mysql: "commonjs mysql" },
      { "@sap/hana-client": "commonjs @sap/hana-client" },
      { "react-native-sqlite-storage": "commonjs react-native-sqlite-storage" },
    ];
    // also suppress “require(expression)” warnings
    if (config.module) {
      config.module.exprContextCritical = false;
    }
    return config;
  },
};

export default nextConfig;

