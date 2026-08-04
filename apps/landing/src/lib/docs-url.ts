// Resolves the facet docs site URL for the current environment.
// During `vite dev` we point at the local docs site (port 5173)
// so we can validate changes before they reach the deployed docs site.
const PROD_DOCS_URL = "https://docs.facet.arcevocirqle.com.ng";
const DEV_DOCS_URL = "http://localhost:5173";

export function getDocsUrl(): string {
  return import.meta.env.DEV ? DEV_DOCS_URL : PROD_DOCS_URL;
}
