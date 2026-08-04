import * as React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@arcevo/facet-components";
import { LandingLayout } from "@arcevo/facet-layout";
import { Nav } from "./components/Nav.js";
import { HeroSection } from "./components/HeroSection.js";
import { PackagesSection } from "./components/PackagesSection.js";
import { FeaturesSection } from "./components/FeaturesSection.js";
import { DemoSection } from "./components/DemoSection.js";
import { InstallSection } from "./components/InstallSection.js";
import { CTASection } from "./components/CTASection.js";
import { Footer } from "./components/Footer.js";
import { FeedbackPage } from "./components/FeedbackPage.js";

function HomePage() {
  return (
    <LandingLayout nav={<Nav />} hero={<HeroSection />} footer={<Footer />}>
      <PackagesSection />
      <FeaturesSection />
      <DemoSection />
      <InstallSection />
      <CTASection />
    </LandingLayout>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/feedback" element={<FeedbackPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}
