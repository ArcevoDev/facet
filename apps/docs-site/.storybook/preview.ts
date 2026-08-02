import type {} from "./env.d.ts";
import "../src/app.css";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true, // handled by tokens.css theme variables
    },
    viewport: {
      defaultViewport: "responsive",
    },
  },

  decorators: [
    withThemeByDataAttribute({
      themes: {
        dark: "dark",
        light: "light",
      },
      defaultTheme: "dark",
      attributeName: "data-theme",
      parentSelector: "html",
    }),
  ],
};

export default preview;
