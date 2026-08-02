import type { StorybookConfig } from "@storybook/react-vite";
import { createRequire } from "node:module";
import tailwindcss from "@tailwindcss/vite";

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)", "../src/**/*.mdx"],
  addons: ["@storybook/addon-themes", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    // Vite 8 ships vite:oxc for TS transforms + improved resolution, but it
    // chokes on .mdx files (no tsconfig mapping for virtual MDX pipeline).
    // @storybook/react-vite provides @vitejs/plugin-react as fallback, so
    // stripping vite:oxc loses nothing and fixes .mdx builds.
    if (config.plugins) {
      config.plugins = config.plugins.filter(
        (p) => !(p && "name" in p && p.name === "vite:oxc"),
      );
    }
    // In Storybook 10, @storybook/blocks is bundled inside @storybook/addon-docs
    // rather than being a standalone package. Alias it so rolldown can resolve it.
    const blocksPath = require.resolve("@storybook/addon-docs/blocks");
    config.resolve = {
      ...config.resolve,
      alias: [
        ...(Array.isArray(config.resolve?.alias)
          ? config.resolve.alias
          : config.resolve?.alias
            ? [config.resolve.alias]
            : []),
        { find: "@storybook/blocks", replacement: blocksPath },
      ],
    };
    // Tailwind v4: Storybook ignores apps/docs-site/vite.config.ts so we need
    // @tailwindcss/vite here so @import "tailwindcss" in app.css works.
    config.plugins = [...(config.plugins ?? []), tailwindcss()];

    config.build = {
      ...config.build,
      chunkSizeWarningLimit: 1200,
    };

    return config;
  },
};

export default config;
