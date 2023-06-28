import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },

  // env: (config) => ({
  //   ...config,
  //   DATABASE_URL: "file:./db.sqlite",

  //   // # @see https://next-auth.js.org/configuration/options#nextauth_url
  //   // NEXTAUTH_URL=http://localhost:3000

  //   // # You can generate the secret via 'openssl rand -base64 32' on Unix
  //   // # @see https://next-auth.js.org/configuration/options#secret
  //   // NEXTAUTH_SECRET=supersecret

  //   // # Preconfigured Discord OAuth provider, works out-of-the-box
  //   // # @see https://next-auth.js.org/providers/discord
  //   // DISCORD_CLIENT_ID=1092017753902293173
  //   // DISCORD_CLIENT_SECRET=97635829800e6fcf8b3d349cda8e5a982a0a746bfe3cebb38d4bd50be299cb88
  // }),
};
export default config;
