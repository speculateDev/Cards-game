import { Configuration } from "webpack";

const config: Configuration = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
};

export default config;
