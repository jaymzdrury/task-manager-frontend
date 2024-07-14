import { withSentryConfig } from "@sentry/nextjs";
import withNextIntl from "next-intl/plugin";
import { sentryExtensions, tunnel } from "./lib/sentry.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: function (config, { webpack }) {
    config.module.rules.push({
      test: /\.m?js$/,
      type: "javascript/auto",
      resolve: { fullySpecified: false },
    });
    config.plugins.push(new webpack.DefinePlugin(sentryExtensions));
    return config;
  },
  experimental: {
    optimizePackageImports: [
      "@radix-ui/react-avatar",
      "@radix-ui/react-select",
      "@radix-ui/react-toast",
      "lucide-react",
      "tailwindcss",
    ],
    webpackBuildWorker: false,
  },
};

const sentrySettings = {
  silent: true,
  org: "james-drury",
  project: "javascript-nextjs",
};

const sentryConfig = {
  widenClientFileUpload: true,
  tunnelRoute: tunnel(),
  hideSourceMaps: false,
  disableLogger: true,
  transpileClientSDK: true,
};

const nextIntl = withNextIntl("./i18n.ts")(nextConfig);

export default withSentryConfig(nextIntl, {
  ...sentrySettings,
  ...sentryConfig,
});
