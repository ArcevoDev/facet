// Resolves the facet-story (component gallery) URL for the current environment.
// During `vite dev` we point at the local Storybook instance (port 6006)
// so we can validate changes before they reach the deployed story site.
const PROD_DOCS_URL = "https://story.facet.arcevocirqle.com.ng";
const DEV_DOCS_URL = "http://localhost:6006";

export function getDocsUrl(): string {
  return import.meta.env.DEV ? DEV_DOCS_URL : PROD_DOCS_URL;
}
