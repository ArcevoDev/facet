import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@arcevo/facet-components";
import { DocsLayout } from "./components/DocsLayout.js";
import { OverviewPage } from "./pages/OverviewPage.js";
import { GettingStartedPage } from "./pages/GettingStartedPage.js";
import { ThemingPage } from "./pages/ThemingPage.js";
import { TokensPage } from "./pages/TokensPage.js";
import { AuthPage } from "./pages/AuthPage.js";
import { LayoutPage } from "./pages/LayoutPage.js";
import { ArcIdPage } from "./pages/ArcIdPage.js";
import { ComponentsPage } from "./pages/ComponentsPage.js";
import { ComponentPage } from "./pages/ComponentPage.js";
import { IconPage } from "./pages/IconPage.js";
import { ThemePage } from "./pages/ThemePage.js";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <BrowserRouter>
        <Routes>
          <Route element={<DocsLayout />}>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/getting-started" element={<GettingStartedPage />} />
            <Route path="/theming" element={<ThemingPage />} />
            <Route path="/tokens" element={<TokensPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/layout" element={<LayoutPage />} />
            <Route path="/arc-id" element={<ArcIdPage />} />
            <Route path="/components" element={<ComponentsPage />} />
            <Route path="/components/:slug" element={<ComponentPage />} />
            <Route path="/foundations/icon" element={<IconPage />} />
            <Route path="/foundations/theme" element={<ThemePage />} />
            <Route path="*" element={<OverviewPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
