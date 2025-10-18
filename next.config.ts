import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/Dynamic_Data_Table_Manager',
  assetPrefix: '/Dynamic_Data_Table_Manager/',
};

export default nextConfig;
